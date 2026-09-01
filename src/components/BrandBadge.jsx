import { Link } from 'react-router-dom'
import Logo from './Logo'

export default function BrandBadge() {
  return (
    <div className="border-b border-neutral-200 bg-white py-6">
      <div className="container-x flex justify-center">
        <Link to="/">
          <Logo />
        </Link>
      </div>
    </div>
  )
}
