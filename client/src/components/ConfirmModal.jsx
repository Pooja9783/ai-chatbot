import { Trash2 } from "lucide-react";

function ConfirmModal({ onConfirm, onCancel }) {
    return (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-4">

            <div className="w-full max-w-sm bg-[#151516] border border-[#303033] rounded-xl p-6 shadow-2xl">

                {/* Icon */}
                <div className="w-10 h-10 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-5">
                    <Trash2 size={18} className="text-red-400" />
                </div>

                {/* Content */}
                <h2 className="text-lg font-semibold text-white">
                    Delete conversation?
                </h2>

                <p className="text-sm text-[#85858B] mt-2 leading-relaxed">
                    This conversation will be permanently deleted. This action
                    cannot be undone.
                </p>

                {/* Actions */}
                <div className="flex justify-end gap-3 mt-7">

                    <button
                        onClick={onCancel}
                        className="px-4 py-2 text-sm font-medium text-[#A1A1A6] hover:text-white bg-[#202023] hover:bg-[#29292B] border border-[#303033] rounded-lg transition"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={onConfirm}
                        className="px-4 py-2 text-sm font-medium bg-red-500 hover:bg-red-400 text-white rounded-lg transition"
                    >
                        Delete
                    </button>

                </div>

            </div>
        </div>
    );
}

export default ConfirmModal;