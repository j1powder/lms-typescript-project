'use client'

import { Fragment, useEffect, useState } from "react";
import { projectFirestore } from "@/FirebaseConfig";
import { getDocs, collection } from "firebase/firestore";
import { Card } from 'primereact/card'
import { Button } from 'primereact/button'
import Link from "next/link";
import ReactPlayer from "react-player";
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Dialog } from 'primereact/dialog'
import { Sidebar } from 'primereact/sidebar';


import classes from './Courses.module.css'


const CourseComponent = () => {
    const [courseData, setCourseData] = useState<any>()
    const [loading, setLoading] = useState<Boolean>(true)
    const [showSectionDetails, setShowSectionDetails] = useState<Boolean>(false);
    const [selectedSection, setSelectedSection] = useState<any>()
    const [sectionVisible, setSectionVisible] = useState<any>(false)
    
    

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
        console.log(selectedSection)

        if(loading){
          return <h3>Loading data...</h3>
        } else if(!loading && !courseData[0] ) {
          return <h3>Failed to retrieve any data for this course</h3>
        } else { 
          return <Fragment>
        <Card>
        <Link href='/employees/courses'><Button>Back</Button></Link>
        <h3>Course Component</h3>
        <DataTable value={courseData} selectionMode="single" selection={selectedSection}
        onSelectionChange={(e) => {setSelectedSection(e.value); setSectionVisible(true)}} >
          <Column field="id" header="Section" sortable filter />
        </DataTable>
        <Sidebar header="Header" visible={sectionVisible}  onHide={() => setSectionVisible(false)} fullScreen>
        {selectedSection && selectedSection.video && <>
        <ReactPlayer
                                        key={selectedSection.id}
                                        onReady={() => { console.log("this is the onReady function")}}
                                        url={selectedSection.video && selectedSection.video}
                                        controls
                                        onEnded={() => {console.log("this is the onEnded function")}}
                                    />
                        <span>{selectedSection.question1.questionText}</span><br/>
                        {selectedSection.question1.answerOptions && selectedSection.question1.answerOptions.map((answer:any)=>{
                          return <div><span>{answer}</span><br/></div>
                        })}
      </>  }
        </Sidebar>
        
        
        
        {/* <ul>
          {courseData && courseData.map((section:any)=>{
            return  <li key={section.id} className={classes.courseCard} onClick={() => setShowSectionDetails(true)}>
                    <div >
                        <span>{section.id}</span><br/>
                        
                        {showSectionDetails && <>
                          <ReactPlayer
                                        key={section.id}
                                        onReady={() => { console.log("this is the onReady function")}}
                                        url={section.video}
                                        controls
                                        onEnded={() => {console.log("this is the onEnded function")}}
                                    />
                        <span>{section.question1.questionText}</span><br/>
                        {section.question1.answerOptions && section.question1.answerOptions.map((answer:any)=>{
                          return <div><span>{answer}</span><br/></div>
                        })}
                        
                        </>}
                        

                    </div>
                  </li>
          })}

        </ul> */}
        

        </Card>
    </Fragment>
        }
}


export default CourseComponent;