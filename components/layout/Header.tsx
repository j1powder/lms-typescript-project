'use client'


import { Fragment } from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Image from 'next/image'
import logo from '../../public/logo.png'
import { Menubar } from 'primereact/menubar';
import { useRouter } from 'next/navigation'

import classes from './Header.module.css'


const Header:React.FC = () => {
 const router = useRouter();
  const items = [
    {
        label: 'Home',
        icon: 'pi pi-home',
        command: () => router.push('/')
    },
    {
        label: 'Contact Us',
        icon: 'pi pi-star'
    },
    {
        label: 'Course Builder',
        
    },
    {
        label: 'Sign In',
        icon: 'pi pi-envelope',
        command: ()=> router.push('/dashboard')
    }
];

const start = <Image className={classes.logo} src={logo} alt="Construction Banner" />



    return <Fragment>
      <Menubar model={items} start={start}/>
    </Fragment>
}

export default Header;