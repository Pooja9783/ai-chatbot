import { Trash2 } from "lucide-react";

function Sidebar({ conversations, activeConversationId, onNewChat, onSelectConversation, deleteConversation }) {



    return (
        <aside className="w-64 min-h-screen border-r border-slate-800 bg-slate-950 p-4">

            <button
                onClick={onNewChat}
                className="w-full mb-4 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-lg"
            >
                + New Chat
            </button>

            <div className="space-y-1"
            >
                {conversations.map((conversation) => (
                    <div
                        key={conversation._id}
                        className={`group flex items-center gap-2 rounded-lg transition ${activeConversationId === conversation._id
                            ? "bg-slate-800 text-white"
                            : "text-slate-400 hover:bg-slate-900 hover:text-white"
                            }`}
                    >
                        <button
                            onClick={() => onSelectConversation(conversation._id)}
                            className="flex-1 min-w-0 text-left px-3 py-3 text-sm truncate"
                        >
                            {conversation.title}
                        </button>

                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                deleteConversation(conversation._id)
                            }}
                            className="opacity-0 group-hover:opacity-100 p-2 mr-1 rounded-md hover:bg-red-500/10 hover:text-red-400 transition"
                            aria-label="Delete conversation"
                        >
                            <Trash2 size={16} />
                        </button>
                    </div>


                ))}


            </div>

        </aside>
    );
}

export default Sidebar;