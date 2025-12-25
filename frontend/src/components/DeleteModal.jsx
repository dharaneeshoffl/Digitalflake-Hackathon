import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

export default function DeleteModal({ title = "Delete", onCancel, onConfirm }) {
  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white w-[340px] rounded-lg p-6 text-center shadow-lg">
        <ExclamationTriangleIcon className="w-10 h-10 text-red-500 mx-auto mb-3" />
        <h3 className="font-semibold mb-2">{title}</h3>
        <p className="text-sm text-gray-500 mb-6">
          Are you sure you want to delete?
        </p>

        <div className="flex justify-center gap-4">
          <button onClick={onCancel} className="px-4 py-2 border rounded">
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-primary text-white rounded"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
