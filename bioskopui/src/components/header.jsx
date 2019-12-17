import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {FaCartArrowDown} from 'react-icons/fa'


const Header = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/">BioskopAmbyar</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto"  navbar>
            {props.roleUser==='admin'?
            
            <NavItem className='jancoknav'>
              <NavLink href="/admin/">Manage Admin</NavLink>
              <NavLink href="/managestudio/">Manage Studio</NavLink>
            </NavItem>
            :
            null
            }

              {props.roleUser==='user'?
              
              <NavItem className='jancoknav'>
                <NavLink href="/history/">history</NavLink>
              <NavLink href="/cart/"><FaCartArrowDown/>: {props.carts}</NavLink>
            </NavItem>
            
              :
              null
              }
            {props.namauser===''?
            
             
                <NavItem className='jancoknav'> 
              <NavLink href="/register/">Register</NavLink>
    
                <NavLink href="/login">Login</NavLink>
              </NavItem>
            
            
            :
            null
            }
            {
              props.namauser===''?
              null
              :
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                {props.namauser}
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem href='/setting'>
                  Setting
                </DropdownItem>
                <DropdownItem href='/' onClick={()=>onSignOutClick()}>
                  Logout
                </DropdownItem>
                <DropdownItem divider />
              </DropdownMenu>
            </UncontrolledDropdown>
            }
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}

const onSignOutClick=()=>{
  localStorage.clear()
  window.location.reload()
}

const MapstateToprops=(state)=>{
  return{
    namauser:state.Auth.username,
    roleUser:state.Auth.role,
    carts:state.Auth.cart
  }
}

export default connect (MapstateToprops) (Header);