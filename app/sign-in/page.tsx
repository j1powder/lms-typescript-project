import React,{Fragment} from 'react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { SignIn } from '@clerk/nextjs'

const SignInPage = () => {
  return (
    <Fragment>
    <Header />
    <div style={{margin: " 2rem auto", display: "block", width: "50%"}}>
    <SignIn routing="hash" forceRedirectUrl="/dashboard" />
    </div>
    <Footer />
    </Fragment>
  )
}

export default SignInPage