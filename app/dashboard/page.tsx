'use client'

import CompanyData from '@/components/usercomponents/CompanyData'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { Fragment } from 'react'
import { DataContextProvider } from '@/context/DataContext'
import { useUser, RedirectToSignIn   } from '@clerk/nextjs'


import classes from './Dashboard.module.css'



const Dashboard = () => {
    const { user } = useUser();
if(!user){
    return <RedirectToSignIn />
} else {
    return <Fragment>
        <Header />
        <br/>
        <div style={{minHeight:"600px"}} className={classes.gridContainer}>

                <h3>Welcome {user.firstName}</h3>
                <hr/>
                
                <CompanyData />
              
        </div>
        <Footer/>
    </Fragment>
}


}

export default Dashboard;