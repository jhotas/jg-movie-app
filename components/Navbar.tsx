import NavbarItem from "./NavbarItem"
import MobileMenu from "./MobileMenu"
import AccountMenu from "./AccountMenu"

import { useCallback, useEffect, useState } from "react"
import { BsChevronDown, BsSearch, BsBellFill } from 'react-icons/bs'

const TOP_OFFSET = 66

const Navbar = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const [showAccountMenu, setShowAccountMenu] = useState(false)
  const [showBackground, setShowBackground] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= TOP_OFFSET) {
        setShowBackground(true)
      } else {
        setShowBackground(true)
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const toggleMobileMenu = useCallback(() => {
    setShowMobileMenu((current) => !current)
  }, [])
  
  const toggleAccountMenu = useCallback(() => {
    setShowAccountMenu((current) => !current)
  }, [])

  return (
    <nav className="w-full px-12 fixed z-40">
      <div
        className={`
          px-4
          md:px-16
          py-6
          flex
          flex-row
          items-center
          transition
          duration-500
          ${showBackground ? 'bg-zinc-900 bg-opacity-90' : ''}

        `}
      >
        <img className="h-8 lg:h-12" src="/images/logo.png" alt="Logo" />
        <div 
          className="
            flex-row
            lg:ml-72
            ml-8
            gap-20
            hidden
            lg:flex
          "
        >
          <NavbarItem label="Início" />
          <NavbarItem label="Séries" />
          <NavbarItem label="Filmes" />
          <NavbarItem label="Minha Lista" />
        </div>
        <div onClick={toggleMobileMenu} className="lg:hidden flex flex-row items-center gap-2 ml-8 cursor-pointer relative">
          <p className="text-white text-sm">Browse</p>
          <BsChevronDown className={`text-white transition ${showMobileMenu ? 'rotate-180' : 'rotate-0'}`} />
          <MobileMenu visible={showMobileMenu} />
        </div>
        <div className="flex flex-row ml-auto gap-7 items-center">
          <div className="text-gray-200 hover:text-gray-300 cursor-pointer transition">
            <BsSearch size={24} />
          </div>
          <div className="text-gray-200 hover:text-gray-300 cursor-pointer transition">
            <BsBellFill size={24} />
          </div>
          <div className="flex flex-row items-center gap-2 cursor-pointer relative">
            <div onClick={toggleAccountMenu} className="w-6 h-6 lg:w-10 lg:h-10 rounded-md overflow-hidden hover:border-2 border-primary-500">
              <img src="/images/miles.jpg" />
            </div>
            <BsChevronDown onClick={toggleAccountMenu} className={`text-white transition ${showAccountMenu ? 'rotate-180' : 'rotate-0'}`} />
            <AccountMenu visible={showAccountMenu} />
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar