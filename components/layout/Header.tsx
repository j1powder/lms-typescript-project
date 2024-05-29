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
        
        command: () => router.push('/')
    },
    {
        label: 'Contact Us',
        
    },
    {
        label: "Course List",
        command: () => router.push('/courseslist')
    },
    {
        label: 'Course Builder',
        command: () => router.push('/coursebuilder')
        
    },
    {
        label: 'Sign In',
        command: ()=> router.push('/dashboard')
    }
];

const start = <Image className={classes.logo} src={logo} alt="Construction Banner" />



    return <Fragment>
        <ul className={classes.menuList}>
        <li>Home</li>
        <li>Course list</li>
        <li>Course Builder</li>
        <li>Sign In</li>
        </ul>
    </Fragment>
}

export default Header;