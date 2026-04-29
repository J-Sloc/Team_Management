"use client";

type DeleteConfirmationPanelProps = {
  itemLabel: string;
  isPending?: boolean;
  onCancel: () => void;
  onConfirm: () => void;
};

export default function DeleteConfirmationPanel({
  itemLabel,
  isPending = false,
  onCancel,
  onConfirm,
}: DeleteConfirmationPanelProps) {
  return (
    <div className="rounded-lg border border-rose-200 bg-rose-50 p-4">
      <p className="text-sm text-rose-900">
        Delete <span className="font-semibold">{itemLabel}</span>? This action cannot be undone.
      </p>
      <div className="mt-3 flex gap-3">
        <button
          type="button"
          onClick={onConfirm}
          disabled={isPending}
          className="rounded-md bg-rose-600 px-4 py-2 text-sm font-medium text-white hover:bg-rose-700 disabled:opacity-50"
        >
          {isPending ? "Deleting..." : "Confirm Delete"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          disabled={isPending}
          className="rounded-md border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 disabled:opacity-50"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
