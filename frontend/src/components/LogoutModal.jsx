import { ExclamationTriangleIcon } from "@heroicons/react/24/solid";

export default function LogoutModal({ onCancel, onConfirm }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white w-[360px] rounded-lg p-6 text-center shadow-lg">
      
        <div className="flex justify-center mb-3">
          <ExclamationTriangleIcon className="w-10 h-10 text-red-500" />
        </div>

      
        <h3 className="font-semibold text-lg mb-1">Log Out</h3>

        
        <p className="text-sm text-gray-500 mb-6">
          Are you sure you want to log out?
        </p>

      
        <div className="flex justify-center gap-4">
          <button
            type="button"
            onClick={onCancel}
            className="px-5 py-2 border rounded-md text-sm hover:bg-gray-100 transition"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onConfirm}
            className="px-5 py-2 bg-primary text-white rounded-md text-sm hover:bg-primaryDark transition"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
