'use client'

import React,{ Fragment, useState } from 'react'
import { InputText } from "primereact/inputtext"
import { useUser } from '@clerk/nextjs'
import { Button } from 'primereact/button'
import { useRouter } from 'next/navigation'
import { projectFirestore } from '@/FirebaseConfig'
import {doc, addDoc, setDoc} from 'firebase/firestore'

import classes from './CompanyData.module.css'

const UpdateProfile = () => {
  const { user } = useUser();
  const router = useRouter()
  const [nickName, setNickName] = useState<string>("");

  if(user){
    console.log(user.id)
  }
  const createUserDoc = async (e:any) => {
    e.preventDefault(); 
    const docRef = doc(projectFirestore, "usersCollection", `${user.id}`)
    await setDoc(docRef,{
        firstName: user?.firstName,
        lastName: user?.lastName,
        primaryEmail: user?.primaryEmailAddress.emailAddress,
        nickName
    })
    router.push('/dashboard')
  }


  
 if(!user){
    return <h2>....Loading</h2>
 }

  if(user){
    return (
        <Fragment>
    <form className={classes.updateProfile}>
        <label>User ID</label>
        <InputText placeholder={user.id} value={user.id} />
        <label>First Name</label>
        <InputText placeholder={user.firstName} value={user.firstName} />
        <label>Last Name</label>
        <InputText placeholder={user.lastName} value={user.lastName}/>
        <label>Email</label>
        <InputText placeholder={user.primaryEmailAddress} value={user.primaryEmailAddress} />
        <label>Nick Name(optional)</label>
        <InputText onChange={(e)=> setNickName(e.target.value)}/>
        <br/><br/>
        <Button
        onClick={createUserDoc}>Confirm</Button>
    </form>
    </Fragment>    
      )
  }

}

export default UpdateProfile