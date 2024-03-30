'use client'

import { Fragment, useEffect, useState } from "react";
import { projectFirestore } from "@/FirebaseConfig";
import { getDocs, collection } from "firebase/firestore";
import { Card } from 'primereact/card'
import { Button } from 'primereact/button'
import Link from "next/link";

import classes from './Courses.module.css'


const CourseComponent = () => {
    const [courseData, setCourseData] = useState<any>()
    const [loading, setLoading] = useState<Boolean>(true)
    
    

    useEffect(()=>{
        let results:object[]=[];
        const fetchData = async () => {
        const querySnapshot = await getDocs(collection(projectFirestore, "newcourses", "Benzene", "Sections"));
        //const q = query(querySnapshot, orderBy('Name'))
      
        querySnapshot.docs.map((doc) => {
          // doc.data() is never undefined for query doc snapshots
          return results.push({id: doc.id, ...doc.data()});
        });
       
        setCourseData(results);
        setLoading(false);
      }
      
        fetchData()
      
      
        },[]) 

        console.log(courseData)

        if(loading){
          return <h3>Loading data...</h3>
        } else if(!loading && !courseData[0] ) {
          return <h3>Failed to retrieve any data for this course</h3>
        } else { 
          return <Fragment>
        <Card>
        <Link href='/employees/courses'><Button>Back</Button></Link>
        <h3>Course Component</h3>
        <ul>
          {courseData && courseData.map((section:any)=>{
            return  <li key={section.id} className={classes.courseCard}>
                    <div >
                        <span>{section.id}</span>
                        <span></span>
                    </div>
                  </li>
          })}

        </ul>
        

        </Card>
    </Fragment>
        }
}


export default CourseComponent;