'use client'

import { Fragment, useState, useEffect, useRef } from "react";
import { projectFirestore } from '../../FirebaseConfig';
import { query, where, orderBy, doc, updateDoc, setDoc, getDocs, collection} from 'firebase/firestore'
import { DataContext, DataContextProvider, useDataContext } from '@/context/DataContext';
import { useEmployeeContext } from "@/context/EmployeeContext";
import { Card } from 'primereact/card'  
import { DataTable } from "primereact/datatable";
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';

import { Column } from 'primereact/column'
import { Button } from 'primereact/button'
import { InputText } from "primereact/inputtext";
import { ProgressBar } from "primereact/progressbar";
import { useLocalStorage } from "@/helper-function/HelperFunctions";
import Link from "next/link";
import { useRouter } from "next/navigation";
import classes from './CompanyData.module.css'



const EmployeeCourses = () => {
 const [courseProgress, setCourseProgress] = useState<any>(null);
 const [loading, setLoading] = useState<Boolean>(true);
 const [searchValue, setSearchValue] = useState<String>("");
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

       querySnapshot.docs.map((doc) => {
          // doc.data() is never undefined for query doc snapshots
          return results.push({id: doc.id, ...doc.data()});
        });
       
        setCourseProgress(results);
        setLoading(false);
      }
      
        fetchData()
      
      
        },[employee])  

    

    const r = /\d+/;

    const valueTemplate = (value:any) => {
      return (
          <Fragment>
              <b></b>
          </Fragment>
      );
  };
  
console.log(courseProgress)

useEffect(()=>{
if(courseProgress){
    courseProgress.map((courseDoc:any)=>{
        return localStorage.setItem('courseId', courseDoc.id)
    })
}
},[courseProgress])



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
          
          <div>
          <p>Course Search</p>
          <InputText type="text" value={searchValue} onChange={(e) => {setSearchValue(e.target.value.toLowerCase()); console.log(searchValue)}} placeholder="enter course name" />
          </div>

         

          
          
       <br/>

            <ul>
                {courseProgress && courseProgress[0] && Object.entries(courseProgress[0]).sort().map((item:any)=>{
                    if(item[0] !== "Employee_Name" && item[0] !== "Percent_Complete" && item[0] !== "id") {
                        return <Fragment key={item[0]}>
                          {/* <Link href="/employees/courses/course-detail" style={{textDecoration: "none", color:"black"}}> */}
                              {item[0].replace(/_/g, ' ').toLowerCase().includes(searchValue) ?

                              
                              <li 
                                key={item[0]} style={{listStyle:"none"}} 
                                className={classes.courseCard} 
                                onClick={()=>{console.log(item[0].replace(/_/g, ' '), item[1]);
                                              localStorage.setItem('sectionNumber', item[1]); }} 
                                >
                                <div style={{padding:"1rem"}}>
                                <span 
                                className={classes.courseTitle} 
                                onClick={(e)=> {
                                                //console.log(e.target.innerHTML); 
                                                localStorage.setItem("CourseName", e.target.innerHTML); 
                                                router.push('/employees/courses/course-detail');
                                                }}>
                                    {item[0].replace(/_/g, ' ')}
                                </span>
                                <span style={{float:"right"}}>Progress: {item[1]}</span><br/><br/>
                                <span style={{padding: "2rem 0rem"}}>
                                    
                                <ProgressBar color={item[1] === "Pass" ? "#00ab00" : item[1].match(r) ? "#ee9f27" : 0} value={item[1] === "Pass" ? 100 : item[1].match(r) ? 50 : 0} displayValueTemplate={valueTemplate} />
                                </span>
                                </div>
                            </li>
                            :   null   }

                            
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