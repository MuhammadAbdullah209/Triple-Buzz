export default function ShippingAddressModal({ open, onClose, address, onConfirm, onEditAddress }) {
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
        <h3 className="text-lg font-bold text-ink">Shipping Method</h3>
        <div className="mt-4 flex flex-col gap-3">
          <button
            type="button"
            onClick={() => {
              onConfirm(null)
              onClose()
            }}
            className="rounded-md border border-neutral-200 px-4 py-3 text-left text-sm font-semibold text-ink transition hover:border-brand-gold hover:bg-amber-50"
          >
            Pickup at store
          </button>

          {address ? (
            <button
              type="button"
              onClick={() => {
                onConfirm(address)
                onClose()
              }}
              className="rounded-md border border-neutral-200 px-4 py-3 text-left text-sm font-semibold text-ink transition hover:border-brand-gold hover:bg-amber-50"
            >
              Ship to {address.line1}
            </button>
          ) : (
            <button
              type="button"
              onClick={() => {
                onClose()
                onEditAddress()
              }}
              className="rounded-md border border-dashed border-neutral-300 px-4 py-3 text-left text-sm font-semibold text-neutral-500 transition hover:border-brand-gold hover:text-ink"
            >
              + Add a shipping address
            </button>
          )}
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
