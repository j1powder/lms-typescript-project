'use client'

import { Fragment, useEffect, useState } from "react";
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column'
import { Rating } from 'primereact/rating';
import { Tag } from 'primereact/tag';
import { projectFirestore } from "@/FirebaseConfig";
import { getDocs, collection } from "firebase/firestore";
import Image from "next/image";
import placeholderImage from '../public/JJSmallLogo.jpg'
import { Dialog } from "primereact/dialog";

import classes from '../usercomponents/CompanyData.module.css'


const CurrentCourses = () => {
 const [currentCourses, setCurrentCourses] = useState<any>();
 const [loading, setLoading] = useState<Boolean>(true);
 const [selectedCourse, setSelectedCourse] = useState<any>();
 const [courseData, setCourseData] = useState<any>();
 const [visible, setVisible] = useState<any>();
 

    useEffect(()=>{
        let results:object[]=[];
        const fetchData = async () => {
        const querySnapshot = await getDocs(collection(projectFirestore, "newcourses"));
        //const q = query(querySnapshot, orderBy('Name'))
      
        querySnapshot.docs.map((doc) => {
          // doc.data() is never undefined for query doc snapshots
          return results.push({id: doc.id, ...doc.data()});
        });
       
        setCurrentCourses(results);
        setLoading(false);
      }
      fetchData()
        },[])  

        let courseName:String = "";
        if(selectedCourse && selectedCourse.id){
            console.log(selectedCourse.id)
            courseName = selectedCourse.id;
        }
       

        useEffect(()=>{
            let results:object[]=[];
            const fetchData = async () => {
            const querySnapshot = await getDocs(collection(projectFirestore, "newcourses", `${courseName}`, "Sections"));
            //const q = query(querySnapshot, orderBy('Name'))
          
            querySnapshot.docs.map((doc) => {
              // doc.data() is never undefined for query doc snapshots
              return results.push({id: doc.id, ...doc.data()});
            });
           
            setCourseData(results);
            setLoading(false);
          }
          if(selectedCourse){
            fetchData()
          }
          
            },[selectedCourse]) 

    
    if(courseData ){
        console.log(courseData)
    }


     if(loading){
        return <h3>Loading data...</h3>
     }   else if (!loading && !currentCourses) {
        return <h3>Unable to retrieve data, please try again later</h3>
     } else {
    return <Fragment>
        <div className="card">
            <h3>Hello there</h3>
            <DataTable value={currentCourses} selectionMode="single" selection={selectedCourse}
        onSelectionChange={(e) => {setSelectedCourse(e.value); setVisible(true)}}>
                <Column field="id" header="Course Title" filter sortable></Column>
            </DataTable>

        </div>
        
        <Dialog header={courseName} visible={visible} style={{ width: '50vw' }} onHide={() => setVisible(false)}>
            <ul>

            {courseData && courseData.map((course:any)=>{
                return <li key={course.id}>{course.id}</li>
            })}
            </ul>
        </Dialog>


    </Fragment>
     }
}

export default CurrentCourses;