import logo from '../assets/images/logo.png'

export default function Logo({ className = 'h-14' }) {
  return (
    <img
      src={logo}
      alt="Triple Buzz Smoke & Vape"
      className={`w-auto select-none object-contain ${className}`}
    />
  )
}
