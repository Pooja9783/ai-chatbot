import { Trash2 } from "lucide-react";

function Sidebar({
    conversations,
    activeConversationId,
    onNewChat,
    onSelectConversation,
    deleteConversation,
}) {
    return (
        <aside className="w-60 h-screen shrink-0 border-r border-[#29292B] bg-[#151516] p-4 flex flex-col">

            {/* New Chat */}
            <button
                onClick={onNewChat}
                className="
                    w-full
                    mb-6
                    px-4
                    py-2.5
                    bg-[#F97360]
                    hover:bg-[#FB806E]
                    text-[#171717]
                    font-medium
                    text-sm
                    rounded-lg
                    transition
                "
            >
                + New Chat
            </button>

            {/* Section title */}
            <p className="text-[11px] font-medium uppercase tracking-wider text-[#5F5F64] mb-3 px-2">
                Conversations
            </p>

            {/* Conversations */}
            <div className="flex-1 min-h-0 overflow-y-auto space-y-1 pr-1">
                {conversations.map((conversation) => (
                    <div
                        key={conversation._id}
                        className={`group flex items-center rounded-lg transition ${
                            activeConversationId === conversation._id
                                ? "bg-[#202023] text-white"
                                : "text-[#85858B] hover:bg-[#1D1D1F] hover:text-white"
                        }`}
                    >
                        <button
                            onClick={() =>
                                onSelectConversation(conversation._id)
                            }
                            className="flex-1 min-w-0 text-left px-3 py-2.5 text-sm truncate"
                        >
                            {conversation.title}
                        </button>

                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                deleteConversation(conversation._id);
                            }}
                            className="
                                opacity-0
                                group-hover:opacity-100
                                p-2
                                mr-1
                                rounded-md
                                text-[#6F6F75]
                                hover:bg-red-500/10
                                hover:text-red-400
                                transition
                            "
                            aria-label="Delete conversation"
                        >
                            <Trash2 size={15} />
                        </button>
                    </div>
                ))}
            </div>
        </aside>
    );
}

export default Sidebar;