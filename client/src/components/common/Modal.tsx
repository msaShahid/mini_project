export interface ModalProps {
    isOpen: boolean;
    title: string;
    onClose: () => void;
    onConfirm: () => void | Promise<void>;
    confirmText?: string;
    cancelText?: string;
    disabled?: boolean;
    children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({
    isOpen,
    title,
    onClose,
    onConfirm,
    confirmText = "Confirm",
    cancelText = "Cancel",
    disabled = false,
    children,
}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-10 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">

                <h2 className="text-xl font-semibold mb-4">{title}</h2>

                <div className="mb-6">
                    {children}
                </div>

                <div className="flex justify-end space-x-3">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
                    >
                        {cancelText}
                    </button>
                    <button
                        onClick={onConfirm}
                        disabled={disabled}
                        className={`px-4 py-2 rounded text-white ${disabled ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
                            }`}
                    >
                        {confirmText}
                    </button>
                </div>

            </div>
        </div>
    );
};
