
import CompanyData from '@/components/CompanyData'
import EmployeeData from '@/components/EmployeeData'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { Fragment } from 'react'
import { DataContextProvider } from '@/context/DataContext'
import classes from '../dashboard/Dashboard.module.css'



const Employees = () => {



    return <Fragment>
        <Header />
        <br/>
        <div style={{minHeight:"600px"}} className={classes.gridContainer}>

                <h3>This is the Employees page</h3>
                
                
                <EmployeeData />
                
        </div>
        <Footer/>
    </Fragment>
}

export default Employees;