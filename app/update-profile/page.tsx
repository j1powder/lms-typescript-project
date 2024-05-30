import React,{Fragment} from 'react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import UpdateProfile from '@/components/usercomponents/UpdateProfile'



const UpdateProfilePage = () => {
  return (
    <Fragment>
        {/* <Header /> */}
        <h2>Please confirm your information before proceeding to the dashboard</h2>
        <UpdateProfile />
        <Footer />
    </Fragment>
  )
}

export default UpdateProfilePage