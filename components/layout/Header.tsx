'use client'


import { Fragment } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';

import Image from 'next/image'
import logo from '../../public/logo.png'
import { Button } from 'primereact/button'
import { Menubar } from 'primereact/menubar';
import { useRouter } from 'next/navigation'
import { ClerkProvider, SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import {dark} from "@clerk/themes";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

import Link from 'next/link'


import classes from './Header.module.css'


const Header:React.FC = () => {
 const router = useRouter();


const start = <Image className={classes.logo} src={logo} alt="Construction Banner" />



    return <Fragment>

<Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
      
    
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
        <Navbar.Brand href="/dashboard"> <Image className={classes.logo} src={logo} alt="Construction Banner" /> </Navbar.Brand>
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <SignedIn>
            <Nav.Link href="/dashboard">Dashboard</Nav.Link>
            <Nav.Link href="/courseslist">All Courses</Nav.Link>
            <Nav.Link href="coursebuilder">Build New Course</Nav.Link>
            </SignedIn>
{/*             <NavDropdown title="Link" id="navbarScrollingDropdown">
              <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action4">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action5">
                Something else here
              </NavDropdown.Item>
            </NavDropdown> */}

          </Nav>
          <SignedOut>

            <SignInButton>
                <Nav.Link>Sign In</Nav.Link>
            </SignInButton>
            </SignedOut>
            <SignedIn>

                <UserButton/>
            </SignedIn>
        </Navbar.Collapse>
      </Container>
    </Navbar>




   {/*      <nav className={classes.navBar}>
        <Image className={classes.logo} src={logo} alt="Construction Banner" />
        <ul className={classes.menuList}>
        
        

        <SignedOut>
        <Link href="/"><li>Home</li></Link>
        <SignInButton > 
            <li>Sign In</li>
        </SignInButton>
        </SignedOut>

        <SignedIn>
        <Link href="/dashboard"><li>Dashboard</li></Link>
        <Link href="/courseslist"><li>Course list</li></Link>
        <Link href="coursebuilder"><li>Course Builder</li></Link>
        <UserButton afterSignOutUrl='/'/>
      </SignedIn> 

        </ul>
        </nav>*/}
    </Fragment>
}

export default Header;