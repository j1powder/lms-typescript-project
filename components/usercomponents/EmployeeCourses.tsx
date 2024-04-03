'use client'

import { Fragment, useState, useEffect, useRef } from "react";
import { projectFirestore } from '../../FirebaseConfig';
import { query, where, orderBy, doc, updateDoc, setDoc, getDocs, collection} from 'firebase/firestore'
import { DataContext, DataContextProvider, useDataContext } from '@/context/DataContext';
import { useEmployeeContext } from "@/context/EmployeeContext";
import { Card } from 'primereact/card'  
import { DataTable } from "primereact/datatable";
import { Column } from 'primereact/column'
import { Button } from 'primereact/button'

import { ProgressBar } from "primereact/progressbar";
import { useLocalStorage } from "@/helper-function/HelperFunctions";
import Link from "next/link";
import { useRouter } from "next/navigation";
import classes from './CompanyData.module.css'



const EmployeeCourses = () => {
 const [courseProgress, setCourseProgress] = useState<any>(null);
 const [loading, setLoading] = useState<Boolean>(true);
 const {updateRowData, selection} = useDataContext();
 const { updateEmployeeData, empSelection} = useEmployeeContext();
 const employee = useLocalStorage("EmployeeName")
 const thisCourse:any = useRef();
 const router = useRouter();

    useEffect(()=>{
        let results:object[]=[];
        const fetchData = async () => {
        const collectionRef = collection(projectFirestore, "course-progress")
        const q = query(collectionRef, where("Employee_Name", "==", `${employee}`))
        const querySnapshot = await getDocs(q);

       //const querySnapshot = await getDocs(collection(projectFirestore, "course-progress"));
        querySnapshot.docs.map((doc) => {
          // doc.data() is never undefined for query doc snapshots
          return results.push({id: doc.id, ...doc.data()});
        });
       
        setCourseProgress(results);
        setLoading(false);
      }
      
        fetchData()
      
      
        },[employee])  

    // if(courseProgress){
    //     courseProgress.map((courses:any)=>{
    //         if(courses.Employee_Name === selection.Name){
    //             return console.log(courses)
    //         }
    //     })
    // }
    // if(courseProgress){
    //     console.log(
    //         Object.entries(courseProgress[0]).map((item:any)=>{
    //             return item[0];
    //         }))
    // }
 

    let percentage = 50;


     if(loading){
        return   <Card >
        <Link href="/employees"> <Button>Back</Button></Link>
        <h3>Loading data...</h3>
        </Card>
     } else if(!loading && !courseProgress[0]){
        return <Card >
        <Link href="/employees"> <Button>Back</Button></Link>
        <h3>There is currently no course data for this user</h3>
        </Card>
     } else {
        return <Fragment>
            <h4>Course Data will go here</h4>
            <Card >
            <Link href="/employees"> <Button>Back</Button></Link>
          <h5>Company Data Component</h5>
          
          
       <br/>

            <ul>
                {courseProgress && courseProgress[0] && Object.entries(courseProgress[0]).map((item:any)=>{
                    if(item[0] !== "Employee_Name" && item[0] !== "Percent_Complete" && item[0] !== "id") {
                        return <Fragment key={item[0]}>
                          {/* <Link href="/employees/courses/course-detail" style={{textDecoration: "none", color:"black"}}> */}
                              
                              <li key={item[0]} style={{listStyle:"none"}} className={classes.courseCard} >
                             <div style={{padding:"1rem"}}>
                                <span className={classes.courseTitle} onClick={(e)=> {console.log(e.target.innerHTML); localStorage.setItem("CourseName", e.target.innerHTML); router.push('/employees/courses/course-detail');}}>{item[0].replace(/_/g, ' ')}</span>
                                <span style={{float:"right"}}>{item[1]}</span><br/><br/>
                                <span style={{padding: "2rem 0rem"}}>
                                    
                                <ProgressBar value={item[1] === "Pass" ? 100 : 0} />
                                </span>
                                </div>
                            </li>
                            {/* </Link> */}
                            </Fragment>
                    }
                    
                })}
            </ul>
            </Card>
                <br/>
        </Fragment>
     }

}


export default EmployeeCourses;