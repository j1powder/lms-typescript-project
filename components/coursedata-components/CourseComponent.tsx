'use client'

import { Fragment, useEffect, useState, useRef } from "react";
import { projectFirestore } from "@/FirebaseConfig";
import { getDocs, collection, query, orderBy } from "firebase/firestore";
import { Card } from 'primereact/card'
import { Button } from 'primereact/button'
import Link from "next/link";
import ReactPlayer from "react-player";
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Dialog } from 'primereact/dialog'
import { Sidebar } from 'primereact/sidebar';
import { RadioButton } from "primereact/radiobutton";


import classes from './Courses.module.css'


const CourseComponent = () => {
    const [courseData, setCourseData] = useState<any>()
    const [loading, setLoading] = useState<Boolean>(true)
    const [showSectionDetails, setShowSectionDetails] = useState<Boolean>(false);
    const [selectedSection, setSelectedSection] = useState<any>()
    const [sectionVisible, setSectionVisible] = useState<any>(false)
    const [finalVisible, setFinalVisible] = useState<any>(false)
    const [selectedAnswer1, setSelectedAnswer1] = useState<any>()
    const [selectedAnswer2, setSelectedAnswer2] = useState<any>()
    const [selectedAnswer3, setSelectedAnswer3] = useState<any>()
    const [selectedAnswer4, setSelectedAnswer4] = useState<any>()
    const [disabledStatus, setDisabledStatus] = useState<any>(true)  
    const formRef = useRef();

    useEffect(()=>{
        let results:object[]=[];
        const fetchData = async () => {
        const collectionRef = collection(projectFirestore, "newcourses", "Arc Flash", "Sections")
        const q = query(collectionRef, orderBy("orderNumber"))
        const querySnapshot = await getDocs(q);
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

        const sectionSubmitHandler = (e:any) => {
          e.preventDefault();

        }

        const disabledHandler = () => {
          let question1 = false;
          let question2 = false;
          let question3 = false;
          let question4 = false;
          if(selectedSection){
            if(selectedAnswer1 !== undefined && selectedAnswer1 === selectedSection.question1.isCorrect || 
              selectedSection.question1 === "" || 
              selectedSection.question1 === null
               ) {
                question1 = true;
               }
            if(selectedAnswer2 !== undefined && selectedAnswer2 === selectedSection.question2.isCorrect ||
               selectedSection.question2 === "" ||
               selectedSection.question2 === null) {
                question2 = true;
               }

          }
          if(question1 === true && question2 === true){
            setDisabledStatus(false);
          } else {
            setDisabledStatus(true);
          }
          console.log("function ran")
          return disabledStatus
        }
        //console.log(courseData)
        //console.log(selectedSection)
        // if(selectedSection && selectedSection.question1){
        //   console.log(selectedAnswer1, selectedSection.question1.isCorrect)
        // }

     

        

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
        <Sidebar header={selectedSection && selectedSection.id ? selectedSection.id : "Welcome"} visible={sectionVisible}  onHide={() => setSectionVisible(false)} fullScreen>
        {selectedSection && selectedSection.video && <>
        <ReactPlayer
                                        key={selectedSection.id}
                                        onReady={() => { console.log("this is the onReady function")}}
                                        url={selectedSection.video && selectedSection.video}
                                        controls
                                        onEnded={() => {console.log("this is the onEnded function")}}
                                    />
                        <br/>
                        <form id="sectionForm" ref={formRef}>
                        <p>{selectedSection.question1.questionText}</p><br/><br/>
                        {selectedSection.question1.answerOptions && selectedSection.question1.answerOptions.map((answer:any)=>{
                          return <div key ={answer} style={{margin:"0.4rem 0rem"}}>
                            <RadioButton 
                                        className="radioBtn" 
                                        style={{margin: "0rem 0.2rem"}} 
                                        inputId={answer}
                                        value={answer} 
                                        onChange={(e) => {setSelectedAnswer1(e.value); disabledHandler(); }}
                                        checked={selectedAnswer1 === answer}/> 
                                        <span>{answer}</span>
                                        <br/>
                                  </div>
                        })}
                        {selectedAnswer1 !== undefined && selectedAnswer1 === selectedSection.question1.isCorrect && <p>Great Job</p> }
                        {selectedAnswer1 !== undefined && selectedAnswer1 !== selectedSection.question1.isCorrect && <p>Wrong answer</p> }
                        <br/><br/>

                       <p>{selectedSection.question2.questionText}</p><br/><br/>
                        {selectedSection.question2.answerOptions && selectedSection.question2.answerOptions.map((answer:any)=>{
                          return <div key ={answer} style={{margin:"0.4rem 0rem"}}>
                            <RadioButton 
                                        style={{margin: "0rem 0.2rem"}}
                                        className="radioBtn"  
                                        inputId={answer}
                                        value={answer} 
                                        onChange={(e) => {setSelectedAnswer2(e.value); disabledHandler(); }}
                                        checked={selectedAnswer2 === answer}/>
                                        <span>{answer}</span>
                                        <br/>
                                    </div>
                        })}
                        {selectedAnswer2 !== undefined && selectedAnswer2 === selectedSection.question2.isCorrect && <p>Great Job</p> }
                        {selectedAnswer2 !== undefined && selectedAnswer2 !== selectedSection.question2.isCorrect && <p>Wrong answer</p> }
                        <br/><br/>

                        <p>{selectedSection.question3.questionText}</p><br/><br/>
                        {selectedSection.question3.answerOptions && selectedSection.question3.answerOptions.map((answer:any)=>{
                          return <div key ={answer} style={{margin:"0.4rem 0rem"}}>
                            <RadioButton
                            className="radioBtn"  
                            style={{margin: "0rem 0.2rem"}} 
                            inputId={answer}
                            value={answer} 
                            onChange={(e) => setSelectedAnswer3(e.value)}
                            checked={selectedAnswer3 === answer}/>
                            <span>{answer}</span>
                            <br/>
                            </div>
                        })}
                        {selectedAnswer3 !== undefined && selectedAnswer3 === selectedSection.question3.isCorrect && <p>Great Job</p> }
                        {selectedAnswer3 !== undefined && selectedAnswer3 !== selectedSection.question3.isCorrect && <p>Wrong answer</p> }
                        <br/><br/>

                        <p>{selectedSection.question4.questionText}</p><br/><br/>
              
                        {selectedSection.question4.answerOptions && selectedSection.question4.answerOptions.map((answer:any)=>{
                          return <div key ={answer} style={{margin:"0.4rem 0rem"}}>
                            <RadioButton
                            className="radioBtn" 
                            style={{margin: "0rem 0.2rem"}} 
                            inputId={answer}
                            value={answer} 
                            onChange={(e) => setSelectedAnswer4(e.value)}
                            checked={selectedAnswer4 === answer}/>
                            <span>{answer}</span>
                            <br/>
                        </div>
                        })}
                        {selectedAnswer4 !== undefined && selectedAnswer4 === selectedSection.question4.isCorrect && <p>Great Job</p> }
                        {selectedAnswer4 !== undefined && selectedAnswer4 !== selectedSection.question4.isCorrect && <p>Wrong answer</p> }
                        <Button 
                            onClick={(e)=>{}}
                            disabled={disabledStatus}>Submit</Button>
                        </form>

      </>  }
        </Sidebar>
        
        <Card onClick={()=>setFinalVisible(true)}>
          <h3>Final Acknowledgement</h3>
        </Card>
        <Sidebar visible={finalVisible} onHide={() => setFinalVisible(false)} fullScreen>
                        <h4>Final Acknowledgement Content goes here</h4>
        </Sidebar>
        
        

        

        </Card>
    </Fragment>
        }
}


export default CourseComponent;