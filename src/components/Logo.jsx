import logo from '../assets/images/logo.png'

export default function Logo({ className = '' }) {
  return (
    <img
      src={logo}
      alt="Triple Buzz Smoke & Vape"
      className={`h-14 w-auto select-none object-contain ${className}`}
    />
  )
}
