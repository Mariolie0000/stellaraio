import React, { useState } from 'react'
import {Navbar, NavbarBrand, NavbarToggler, Collapse, Nav, NavItem, NavLink} from 'reactstrap'
import Logo from '../../assets/imgs/Logo.png'
import Buttons from '../Generals/Buttons'

function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const toggle = () =>{
    setIsOpen(!isOpen)
  }

  return (
    <div className='page-navbar'>
      <Navbar expand="md">
          <NavbarBrand href="/">
            <div className="d-flex align-items-center">
              {<img src={Logo} width={"50px"} alt="logo" />}
              <p className='brand-name mb-0'>Stellar AIO</p>
            </div>
          </NavbarBrand>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="m-auto z-index-1" navbar>
              <NavItem>
                <NavLink href="/">Home</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="#features">Features</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="#sites">Sites</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="#faq">FAQ</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="#blog">Blog</NavLink>
              </NavItem>
            </Nav>
            <Buttons width={"14rem"} text={"Dashboard"}/>
          </Collapse>
        </Navbar>
    </div>
  )
}

export default Header