import React, { useState } from 'react'

// Layout Components
import Navbar from '@/layouts/Navbar'
import Sidebar from '@/layouts/Sidebar'
import Footer from '@/layouts/Footer'
import { Outlet } from 'react-router-dom'

const AuthLayout = ({ children }) => {
    console.log(children)
    const [theme, setTheme] = useState('light')
    const [isMobile, setIsMobile] = useState(false)

    const toggleMenuCallback = () => {
        console.log('toggleMenuCallback')
    }

  return (
    <div id="layout-wrapper">
        <Navbar toggleMenuCallback={toggleMenuCallback} />
        <Sidebar theme={theme} isMobile={isMobile} />
        <div className="main-content">
            <Outlet />
            <Footer />
        </div>
    </div>
  )
}

export default AuthLayout