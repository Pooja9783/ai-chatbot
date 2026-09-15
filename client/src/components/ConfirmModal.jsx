function ConfirmModal({ onConfirm, onCancel }) {
    return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 w-full max-w-sm">
                <h2 className="text-lg font-semibold text-white">
                    Delete conversation?
                </h2>

                <p className="text-sm text-slate-400 mt-2">
                    This conversation will be permanently deleted.
                </p>

                <div className="flex justify-end gap-3 mt-6">
                    <button
                        onClick={onCancel}
                        className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={onConfirm}
                        className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-500"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ConfirmModal;