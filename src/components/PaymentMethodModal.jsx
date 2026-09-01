const OPTIONS = [
  { id: 'pickup', label: 'Pay at pickup (card or cash)' },
  { id: 'card', label: 'Credit / Debit Card' },
  { id: 'cash', label: 'Cash' },
]

export default function PaymentMethodModal({ open, onClose, onConfirm }) {
  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-black/50 p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-sm rounded-xl bg-white p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-lg font-bold text-ink">Payment Method</h3>
        <div className="mt-4 flex flex-col gap-3">
          {OPTIONS.map((opt) => (
            <button
              key={opt.id}
              type="button"
              onClick={() => {
                onConfirm(opt)
                onClose()
              }}
              className="rounded-md border border-neutral-200 px-4 py-3 text-left text-sm font-semibold text-ink transition hover:border-brand-gold hover:bg-amber-50"
            >
              {opt.label}
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={onClose}
          className="mt-5 w-full text-center text-xs font-semibold text-neutral-400 hover:text-ink"
        >
          Cancel
        </button>
      </div>
    </div>
  )
}
