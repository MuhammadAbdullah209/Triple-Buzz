function IconCard({ children, bg = '#fff', border = true, wide = false, mono = false }) {
  return (
    <div
      className={`grid h-5 shrink-0 place-items-center rounded ${wide ? 'w-12' : 'w-7'} ${
        mono ? 'border border-white/25 bg-white/5' : border ? 'border border-black/10' : ''
      }`}
      style={mono ? undefined : { background: bg }}
    >
      {children}
    </div>
  )
}

export function MastercardIcon({ mono }) {
  return (
    <IconCard mono={mono}>
      <svg viewBox="0 0 40 24" className="h-3 w-5">
        <circle cx="16" cy="12" r="9" fill={mono ? 'none' : '#EB001B'} stroke={mono ? '#fff' : 'none'} strokeWidth={mono ? 1.5 : 0} opacity={mono ? 0.85 : 1} />
        <circle cx="26" cy="12" r="9" fill={mono ? 'none' : '#F79E1B'} stroke={mono ? '#fff' : 'none'} strokeWidth={mono ? 1.5 : 0} opacity={mono ? 0.55 : 1} />
        {!mono && <path d="M21 5.5a9 9 0 0 1 0 13 9 9 0 0 1 0-13Z" fill="#FF5F00" />}
      </svg>
    </IconCard>
  )
}

export function VisaIcon({ mono }) {
  return (
    <IconCard mono={mono}>
      <span className={`text-[7px] font-black italic tracking-tighter ${mono ? 'text-white/85' : 'text-[#1A1F71]'}`}>
        VISA
      </span>
    </IconCard>
  )
}

export function DiscoverIcon({ mono }) {
  return (
    <IconCard mono={mono} bg="#f2f1ec">
      <span className={`text-[4px] font-extrabold tracking-tight ${mono ? 'text-white/85' : 'text-[#1a1a17]'}`}>
        DISC<span className={mono ? 'text-white/85' : 'text-[#FF6600]'}>●</span>VER
      </span>
    </IconCard>
  )
}

export function AmexIcon({ mono }) {
  return (
    <IconCard mono={mono} bg="#006FCF" border={!mono}>
      <span className={`text-[5px] font-bold tracking-tight ${mono ? 'text-white/85' : 'text-white'}`}>
        AMEX
      </span>
    </IconCard>
  )
}

export function PayPalIcon({ mono }) {
  return (
    <IconCard mono={mono}>
      <span className="text-[7px] font-black italic tracking-tighter">
        <span className={mono ? 'text-white/85' : 'text-[#003087]'}>Pay</span>
        <span className={mono ? 'text-white/55' : 'text-[#009cde]'}>Pal</span>
      </span>
    </IconCard>
  )
}

function StripeIcon({ mono }) {
  return (
    <IconCard mono={mono} bg="#635BFF" border={!mono}>
      <span className={`text-[7px] font-bold italic ${mono ? 'text-white/85' : 'text-white'}`}>stripe</span>
    </IconCard>
  )
}

function GooglePayIcon({ mono }) {
  return (
    <IconCard mono={mono} wide>
      {mono ? (
        <span className="text-[6px] font-semibold tracking-tight text-white/85">Google Pay</span>
      ) : (
        <span className="text-[6px] font-semibold tracking-tight text-[#3c4043]">
          <span className="text-[#4285F4]">G</span>
          <span className="text-[#EA4335]">o</span>
          <span className="text-[#FBBC05]">o</span>
          <span className="text-[#4285F4]">g</span>
          <span className="text-[#34A853]">l</span>
          <span className="text-[#EA4335]">e</span> Pay
        </span>
      )}
    </IconCard>
  )
}

function ApplePayIcon({ mono }) {
  return (
    <IconCard mono={mono} bg="#000" border={!mono}>
      <svg viewBox="0 0 165 105" className="h-3 w-6">
        <path
          fill={mono ? 'rgba(255,255,255,0.85)' : '#fff'}
          d="M34 13.6c-2.2 2.6-5.7 4.6-9.2 4.3-.4-3.5 1.3-7.2 3.3-9.5C30.3 5.7 34.1 3.8 37.2 3.6c.4 3.6-1 7.2-3.2 10zM37.6 19c-5.1-.3-9.5 2.9-11.9 2.9-2.5 0-6.2-2.8-10.3-2.7-5.3.1-10.2 3.1-12.9 7.8-5.5 9.6-1.4 23.8 3.9 31.6 2.6 3.8 5.7 8 9.8 7.9 3.9-.2 5.4-2.5 10.1-2.5 4.8 0 6.1 2.5 10.3 2.4 4.3-.1 7-3.9 9.6-7.7 3-4.4 4.2-8.6 4.3-8.8-.1-.1-8.2-3.2-8.3-12.6-.1-7.9 6.4-11.6 6.7-11.8-3.7-5.4-9.4-6-11.3-6.5z"
        />
        <text
          x="70"
          y="70"
          fontFamily="Helvetica, Arial, sans-serif"
          fontSize="42"
          fontWeight="600"
          fill={mono ? 'rgba(255,255,255,0.85)' : '#fff'}
        >
          Pay
        </text>
      </svg>
    </IconCard>
  )
}

export function AuthorizeNetIcon({ mono }) {
  return (
    <IconCard mono={mono} bg="#00558C" border={!mono} wide>
      <span className={`text-[5px] font-bold tracking-tight ${mono ? 'text-white/85' : 'text-white'}`}>
        Authorize.Net
      </span>
    </IconCard>
  )
}

export default function PaymentIcons({ mono = false }) {
  return (
    <div className="flex flex-nowrap items-center justify-center gap-1">
      <MastercardIcon mono={mono} />
      <VisaIcon mono={mono} />
      <DiscoverIcon mono={mono} />
      <PayPalIcon mono={mono} />
      <StripeIcon mono={mono} />
      <GooglePayIcon mono={mono} />
      <ApplePayIcon mono={mono} />
      <AuthorizeNetIcon mono={mono} />
    </div>
  )
}
