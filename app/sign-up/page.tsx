import React, {Fragment} from 'react'
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { SignUp,  } from '@clerk/nextjs';

const SignUpPage = () => {
  return (
    <Fragment>
    <Header />
    <div style={{margin: " 2rem auto", display: "block", width: "50%"}}>
        
        <SignUp routing="hash" forceRedirectUrl="/update-profile" />
    
    </div>
    <Footer />
    </Fragment>
  )
}

export default SignUpPage;