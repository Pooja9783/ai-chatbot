import { useState, useEffect } from "react";
import PresetQuestions from "./PresetQuestions";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";
import { useAuth } from "../context/AuthContext";
import Header from "./Header";
import Sidebar from "./Sidebar";
import ConfirmModal from "./ConfirmModal";
import "./styles/mainChat.css"

const PRESET_QUESTIONS = [
    "Explain React hooks",
    "What is RAG?",
    "How does Node.js event loop work?",
    "Explain system design basics",
];

function MainChat() {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [activeConversationId, setActiveConversationId] = useState(null);
    const [conversations, setConversations] = useState([]);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [conversationToDelete, setConversationToDelete] = useState(null);

    const { logout, user } = useAuth();

    useEffect(() => {
        const fetchConversations = async () => {
            try {
                const token = localStorage.getItem("token");

                const response = await fetch(
                    "https://chatbot-ai-api-owhv.onrender.com/api/conversations",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                if (!response.ok) {
                    throw new Error(`HTTP error: ${response.status}`);
                }

                const data = await response.json();
                setConversations(data.conversations);
            } catch (error) {
                console.error("Failed to fetch conversations:", error);
            }
        };

        fetchConversations();
    }, []);

    const createConversation = async (title) => {
        const token = localStorage.getItem("token");

        const response = await fetch(
            "https://chatbot-ai-api-owhv.onrender.com/api/conversations",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ title }),
            }
        );

        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }

        const data = await response.json();
        const newConversation = data.userConversation;

        setActiveConversationId(newConversation._id);

        setConversations((prev) => [
            newConversation,
            ...prev,
        ]);

        return newConversation._id;
    };

    const sendMessage = async (textToSend) => {
        if (!textToSend.trim() || loading) return;

        const updatedMessages = [
            ...messages,
            {
                role: "user",
                content: textToSend,
            },
        ];

        setMessages(updatedMessages);
        setLoading(true);

        try {
            const token = localStorage.getItem("token");

            let conversationId = activeConversationId;

            if (!conversationId) {
                conversationId = await createConversation(textToSend);
            }

            const response = await fetch(
                "https://chatbot-ai-api-owhv.onrender.com/api/chat",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        conversationId,
                        messages: updatedMessages,
                    }),
                }
            );

            if (!response.ok) {
                throw new Error(`HTTP error: ${response.status}`);
            }


            const reader = response.body.getReader();
            const decoder = new TextDecoder();

            let buffer = "";
            let assistantAnswer = "";


            setMessages([
                ...updatedMessages,
                {
                    role: "assistant",
                    content: "",
                },
            ]);

            while (true) {
                const { done, value } = await reader.read();

                if (done) {
                    buffer += decoder.decode();
                    break;
                }

                buffer += decoder.decode(value, { stream: true });

                const events = buffer.split("\n\n");

                // Keep the incomplete event for the next chunk
                buffer = events.pop();

                for (const event of events) {
                    const line = event.trim();

                    if (!line.startsWith("data:")) continue;

                    const data = line.slice(5).trim();

                    if (!data) continue;

                    const parsed = JSON.parse(data);

                    if (parsed.content) {
                        assistantAnswer += parsed.content;

                        setMessages((prev) => {
                            const updated = [...prev];

                            updated[updated.length - 1] = {
                                role: "assistant",
                                content: assistantAnswer,
                            };

                            return updated;
                        });
                    }

                    if (parsed.done) {
                        console.log("Streaming completed");
                    }
                }
            }
        } catch (err) {
            console.error("Chat API Error:", err);
            setMessages(messages);
        } finally {
            setLoading(false);
        }
    };

    const loadConversation = async (conversationId) => {
        try {
            const token = localStorage.getItem("token");

            const response = await fetch(
                `https://chatbot-ai-api-owhv.onrender.com/api/conversations/${conversationId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (!response.ok) {
                throw new Error(`HTTP error: ${response.status}`);
            }

            const data = await response.json();

            setMessages(data.conversation.messages);
            setActiveConversationId(conversationId);
        } catch (error) {
            console.error("Failed to load conversation:", error);
        }
    };

    const deleteConversation = async (conversationId) => {
        try {
            const token = localStorage.getItem("token");

            const response = await fetch(
                `https://chatbot-ai-api-owhv.onrender.com/api/conversations/${conversationId}`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (!response.ok) {
                throw new Error(`HTTP error: ${response.status}`);
            }

            setConversations((prev) =>
                prev.filter(
                    (conversation) =>
                        conversation._id !== conversationId
                )
            );

            if (activeConversationId === conversationId) {
                setMessages([]);
                setActiveConversationId(null);
            }
        } catch (error) {
            console.error("Failed to delete conversation:", error);
        }
    };

    const handleDeleteClick = (conversationId) => {
        setConversationToDelete(conversationId);
        setShowDeleteModal(true);
    };

    return (
        <div className="h-screen overflow-hidden bg-[#0F0F10] text-white flex">

            {/* Sidebar */}
            <Sidebar
                conversations={conversations}
                activeConversationId={activeConversationId}
                onNewChat={() => {
                    setMessages([]);
                    setActiveConversationId(null);
                }}
                onSelectConversation={loadConversation}
                deleteConversation={handleDeleteClick}
            />

            {/* Chat */}
            <main className="flex-1 min-w-0 h-screen flex flex-col">

                {/* Minimal top bar */}
                <header className="h-14 shrink-0 flex items-center justify-between px-6 border-b border-[#29292B]">

                    <div>
                        <h1 className="text-sm font-medium text-[#D4D4D8]">
                            AI Knowledge Assistant
                        </h1>
                    </div>

                    <button
                        onClick={logout}
                        className="text-xs text-[#77777C] hover:text-white transition"
                    >
                        {user?.username || user?.email}
                        <span className="mx-2 text-[#3A3A3D]">·</span>
                        Sign out
                    </button>

                </header>

                {/* Messages */}
                <div className="flex-1 min-h-0 overflow-y-auto">

                    <div className="max-w-3xl mx-auto px-6 py-10">

                        {messages.length === 0 ? (
                            <div className="pt-16">
                                <h2 className="text-3xl font-semibold tracking-tight text-white">
                                    How can I help you?
                                </h2>

                                <p className="mt-2 text-sm text-[#77777C]">
                                    Ask about software engineering, AI, or system design.
                                </p>

                                <div className="mt-8">
                                    <PresetQuestions
                                        questions={PRESET_QUESTIONS}
                                        onSelectQuestion={sendMessage}
                                    />
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-10">
                                {messages.map((msg, index) => (
                                    <ChatMessage
                                        key={index}
                                        message={msg}
                                    />
                                ))}
                            </div>
                        )}

                        {loading && (
                            <div className="mt-8 flex items-center gap-3">
                                <div className="w-2 h-2 rounded-full bg-[#F97360] animate-pulse" />

                                <span className="text-sm text-[#77777C]">
                                    Thinking...
                                </span>
                            </div>
                        )}

                    </div>

                </div>

                {/* Input */}
                <div className="shrink-0 px-6 pb-5">
                    <div className="max-w-3xl mx-auto">
                        <ChatInput
                            onSendMessage={sendMessage}
                            loading={loading}
                        />
                    </div>
                </div>

            </main>

            {/* Delete Modal */}
            {showDeleteModal && (
                <ConfirmModal
                    onCancel={() => {
                        setShowDeleteModal(false);
                        setConversationToDelete(null);
                    }}
                    onConfirm={async () => {
                        await deleteConversation(conversationToDelete);
                        setShowDeleteModal(false);
                        setConversationToDelete(null);
                    }}
                />
            )}

        </div>
    );
}

export default MainChat;