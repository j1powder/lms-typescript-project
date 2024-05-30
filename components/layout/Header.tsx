'use client'


import { Fragment } from 'react'

import Image from 'next/image'
import logo from '../../public/logo.png'
import { Button } from 'primereact/button'
import { Menubar } from 'primereact/menubar';
import { useRouter } from 'next/navigation'
import { ClerkProvider, SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import {dark} from "@clerk/themes";

import Link from 'next/link'


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
        <nav className={classes.navBar}>
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
        </nav>
    </Fragment>
}

export default Header;