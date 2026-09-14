function Sidebar({ conversations, activeConversationId, onNewChat, onSelectConversation }) {
    return (
        <aside className="w-64 min-h-screen border-r border-slate-800 bg-slate-950 p-4">
            
            <button
                onClick={onNewChat}
                className="w-full mb-4 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-lg"
            >
                + New Chat
            </button>

            <div className="space-y-1">
                {conversations.map((conversation) => (
                    <button
                        key={conversation._id}
                        onClick={() => onSelectConversation(conversation._id)}
                        className={`w-full text-left px-3 py-2 rounded-lg text-sm truncate ${
                            activeConversationId === conversation._id
                                ? "bg-slate-800 text-white"
                                : "text-slate-400 hover:bg-slate-900 hover:text-white"
                        }`}
                    >
                        {conversation.title}
                    </button>
                ))}
            </div>

        </aside>
    );
}

export default Sidebar;