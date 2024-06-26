'use client'

import { Fragment, useEffect, useState, useRef, useReducer } from "react";
import { projectFirestore } from "@/FirebaseConfig";
import { getDocs, collection, query, orderBy, where, setDoc, doc } from "firebase/firestore";
import { Card } from 'primereact/card'
import { Button } from 'primereact/button'
import Link from "next/link";
import ReactPlayer from "react-player";
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Dialog } from 'primereact/dialog'
import { Sidebar } from 'primereact/sidebar';
import { RadioButton } from "primereact/radiobutton";
import { useLocalStorage } from "@/helper-function/HelperFunctions";


import classes from './Courses.module.css'


const CourseComponent = () => {

    const [courseData, setCourseData] = useState<any>()
    const [loading, setLoading] = useState<Boolean>(true)
    const [showSectionDetails, setShowSectionDetails] = useState<Boolean>(false);
    const [selectedSection, setSelectedSection] = useState<any>()
    const [lastSelectedRow, setLastSelectedRow] = useState<any>();
    const [sectionVisible, setSectionVisible] = useState<any>(false)
    const [finalVisible, setFinalVisible] = useState<any>(false)
    const [selectedAnswer1, setSelectedAnswer1] = useState<any>()
    const [selectedAnswer2, setSelectedAnswer2] = useState<any>()
    const [selectedAnswer3, setSelectedAnswer3] = useState<any>()
    const [selectedAnswer4, setSelectedAnswer4] = useState<any>()
    const [question1, setQuestion1] = useState<any>()
    const [question2, setQuestion2] = useState<any>()
    const [question3, setQuestion3] = useState<any>()
    const [question4, setQuestion4] = useState<any>()
    const [disabledStatus, setDisabledStatus] = useState<Boolean>(true) 
    const course = useLocalStorage('CourseName');
    const sectionStatus = useLocalStorage('sectionNumber');
    const employee = useLocalStorage('EmployeeName');
    const courseId = useLocalStorage('courseId');
    
     
    
    //const formRef = useRef(); 

    
    const finalURL = "https://player.vimeo.com/video/455943382?h=2d45027c8e&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479"


    useEffect(()=>{
        let results:object[]=[];
        const fetchData = async () => {
        const collectionRef = collection(projectFirestore, "newcourses", `${course}`, "Sections")
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
      if(course){
        fetchData()
      }
        
      
        
      
      
        },[course]) 

        const sectionSubmitHandler = async (e:any, section:any) => {
          e.preventDefault();
          try{
            const docRef = doc(projectFirestore,'course-progress',courseId)
            await setDoc(docRef, {
              [course]: section
            }, {merge: true})

            console.log("document updated")
        
          

          }catch(err){
            console.log(err,"something went wrongs")
          }

          
          setSelectedAnswer1(undefined)
          setSelectedAnswer2(undefined)
          setSelectedAnswer3(undefined)
          setSelectedAnswer4(undefined)
          //setSectionVisible(false)
          setDisabledStatus(true)
        }



 console.log(selectedSection)
 console.log(sectionStatus)
 //console.log(lastSelectedRow)
 const r = /\d+/;
 const sectionNumber = sectionStatus.match(r)
console.log(sectionNumber)
          
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
              return <li 
                        key={section.id} 
                        className={classes.courseCard}
                        style={section.orderNumber <= sectionNumber || sectionStatus == "Pass" ? {backgroundColor:"#daedf4"} : {backgroundColor:"none"}} 
                        onClick={(e)=>{setSelectedSection(section); setSectionVisible(true);}}>
                          <span>{section.id}</span><br/>
                          <span style={{float:"right", fontSize:"15px"}}>{section.orderNumber <= sectionNumber || sectionStatus == "Pass" ? "section complete" : null}</span>
                      </li>
            })}
        <li 
            onClick={()=>setFinalVisible(true)} 
            className={classes.courseCard}
            style={sectionStatus == "Pass" ? {backgroundColor:"#daedf4"} : {backgroundColor:"none"}} 
            >
          <span>Conclusion - Final Knowledge Check</span>
          <span style={{float:"right", fontSize:"15px"}}>{sectionStatus == "Pass" ? "section complete" : null}</span>
        </li>
          </ul>

        <br/>
        <hr/>
        <br/>

{/*         <DataTable value={courseData} selectionMode="single" selection={selectedSection}
        onSelectionChange={(e) => {setSelectedSection(e.value); setLastSelectedRow(e.value); setSectionVisible(true)}} >
          <Column field="id" header="Section" sortable filter />
        </DataTable> */}
        <Sidebar 
        header={selectedSection && selectedSection.id ? selectedSection.id : "Welcome"} 
        visible={sectionVisible}  
        onHide={() => {
                    setSelectedAnswer1(undefined)
                    setSelectedAnswer2(undefined)
                    setSelectedAnswer3(undefined)
                    setSelectedAnswer4(undefined)
                    setSectionVisible(false);
                    setDisabledStatus(true);}} 
        fullScreen>

        {selectedSection && selectedSection.video && <>
        <p><b>Watch the Video and then answer the questions below.</b></p>
        <ReactPlayer
                                        key={selectedSection.id}
                                        onReady={() => { console.log("this is the onReady function")}}
                                        url={selectedSection.video && selectedSection.video}
                                        controls
                                        onEnded={() => {console.log("this is the onEnded function"); setDisabledStatus(false)}}
                                    />
                        <br/>
                        <form  >
                        {selectedSection.question1.questionText !== "" && selectedSection.question1.questionText !== null && <> 
                        <p>{selectedSection.question1.questionText}</p>
                        {selectedSection.question1.answerOptions && selectedSection.question1.answerOptions.map((answer:any)=>{
                          if(answer !== "" && answer !== null){
                            return <div key ={answer} style={{margin:"0.4rem 0rem"}}>
                            <RadioButton 
                                        disabled={false}
                                        className="radioBtn" 
                                        style={{margin: "0rem 0.2rem"}} 
                                        inputId={answer}
                                        value={answer} 
                                        onChange={(e) => {setSelectedAnswer1(e.value);
                                          if(e.value !== undefined && e.value=== selectedSection.question1.isCorrect || 
                                            selectedSection.question1 === "" || 
                                            selectedSection.question1 === null
                                             ) {
                                              setQuestion1(true)
                                             }
                                        }}
                                        
                                        checked={selectedAnswer1 === answer}/> 
                                        <span>{answer}</span>
                                        <br/>
                                  </div>
                          }

                        })}
                        {selectedAnswer1 !== undefined && selectedAnswer1 === selectedSection.question1.isCorrect && <p>Great Job</p> }
                        {selectedAnswer1 !== undefined && selectedAnswer1 !== selectedSection.question1.isCorrect && <p>Wrong answer</p> }
                        <br/>
                        
                        </>}

                        {selectedSection.question2 && selectedSection.question2.questionText !== "" && selectedSection.question2.questionText !== null && <> 
                        <p>{selectedSection.question2.questionText}</p>
                        {selectedSection.question2.answerOptions && selectedSection.question2.answerOptions.map((answer:any)=>{
                          if(answer !== "" && answer !== null){
                            return <div key ={answer} style={{margin:"0.4rem 0rem"}}>
                            <RadioButton 
                                        style={{margin: "0rem 0.2rem"}}
                                        className="radioBtn"  
                                        inputId={answer}
                                        value={answer}
                                        disabled={disabledStatus} 
                                        onChange={(e) => {setSelectedAnswer2(e.value); 
                                          if(e.value !== undefined && e.value === selectedSection.question2.isCorrect ||
                                            selectedSection.question2 === "" ||
                                            selectedSection.question2 === null) {
                                             setQuestion2(true);
                                            }
                                        }}
                                        
                                        checked={selectedAnswer2 === answer}/>
                                        <span>{answer}</span>
                                        <br/>
                                    </div>
                          }

                        })}
                        {selectedAnswer2 !== undefined && selectedAnswer2 === selectedSection.question2.isCorrect && <p>Great Job</p> }
                        {selectedAnswer2 !== undefined && selectedAnswer2 !== selectedSection.question2.isCorrect && <p>Wrong answer</p> }
                        <br/><br/>
                        
                        </>}

                      {selectedSection.question3 && selectedSection.question3.questionText !== "" && selectedSection.question3.questionText !== null && <>
                      <p>{selectedSection.question3.questionText}</p>
                        {selectedSection.question3.answerOptions && selectedSection.question3.answerOptions.map((answer:any)=>{
                         if(answer !== "" && answer !== null){
                          return <div key ={answer} style={{margin:"0.4rem 0rem"}}>
                          <RadioButton
                          className="radioBtn"  
                          style={{margin: "0rem 0.2rem"}} 
                          inputId={answer}
                          value={answer}
                          disabled={disabledStatus} 
                          onChange={(e) => {setSelectedAnswer3(e.value);
                            if(e.value !== undefined && e.value === selectedSection.question3.isCorrect ||
                              selectedSection.question2 === "" ||
                              selectedSection.question2 === null) {
                               setQuestion3(true);
                              }
                          }}
                          checked={selectedAnswer3 === answer}/>
                          <span>{answer}</span>
                          <br/>
                          </div>

                         }

                          
                          

                        })}
                        {selectedAnswer3 !== undefined && selectedAnswer3 === selectedSection.question3.isCorrect && <p>Great Job</p> }
                        {selectedAnswer3 !== undefined && selectedAnswer3 !== selectedSection.question3.isCorrect && <p>Wrong answer</p> }
                        <br/><br/>

                      </>}

                      {selectedSection.question4 && selectedSection.question4.questionText !== "" && selectedSection.question4.questionText !== null && <>
                      <p>{selectedSection.question4.questionText}</p>
              
              {selectedSection.question4.answerOptions && selectedSection.question4.answerOptions.map((answer:any)=>{
                if(answer !== "" && answer !== null){
                  return <div key ={answer} style={{margin:"0.4rem 0rem"}}>
                  <RadioButton
                  className="radioBtn" 
                  style={{margin: "0rem 0.2rem"}} 
                  inputId={answer}
                  value={answer}
                  disabled={disabledStatus} 
                  onChange={(e) => {setSelectedAnswer4(e.value);
                    if(e.value !== undefined && e.value === selectedSection.question4.isCorrect ||
                      selectedSection.question2 === "" ||
                      selectedSection.question2 === null) {
                       setQuestion4(true);
                      }
                    }}
                  checked={selectedAnswer4 === answer}/>
                  <span>{answer}</span>
                  <br/>
              </div>

                }

                

              })}
              {selectedAnswer4 !== undefined && selectedAnswer4 === selectedSection.question4.isCorrect && <p>Great Job</p> }
              {selectedAnswer4 !== undefined && selectedAnswer4 !== selectedSection.question4.isCorrect && <p>Wrong answer</p> }
                      </>}
                    <br/>
                        <Button 
                            onClick={(e)=>{sectionSubmitHandler(e,selectedSection.id)}}
                            disabled={false}>Submit</Button>
                        </form>

      </>  }
        </Sidebar>
{/*         <hr/>
        <div onClick={()=>setFinalVisible(true)} className={classes.courseCard}>
          <h4>Conclusion - Final Knowledge Check</h4>
        </div> */}
        <Sidebar visible={finalVisible} onHide={() => setFinalVisible(false)} fullScreen>
                        <h4>Final Knowledge Check</h4>
                        <ReactPlayer 
                                    url={finalURL}
                                    onReady={()=> console.log("this is the onReady function")}
                                    onEnded={()=> console.log("this is the onEnded function")}
                                    controls />
                        {courseData && courseData.map((section:any)=>{

                          return <Fragment key={section.id}> 
                          {!section.question1.isCorrect.includes("ready to proceed") && <>
                                                  <p key={section.id}>{section.question1.questionText}</p>
                                                    {section.question1.answerOptions.map((answer:any)=>{
                                                      if(answer !== "" && answer !== null){
                                                        return <Fragment key={answer}>
                                                        <div key ={answer} style={{margin:"0.4rem 0rem"}}>
                                                    <RadioButton
                                                    className="radioBtn" 
                                                    style={{margin: "0rem 0.2rem"}} 
                                                    inputId={answer}
                                                    value={answer} 
                                                    onChange={()=> console.log("Hello there")}
                                                    checked={selectedAnswer4 === answer}/>
                                                    <span>{answer}</span>
                                                    <br/>
                                                </div>
                                                      </Fragment>
                                                      }

                                                    })}
                                              <br/>
                                          </> } 


                              {section.question2 && section.question2.isCorrect !== "" && section.question2.isCorrect !== null && <>
                              <p>{section.question2.questionText}</p>
                            {section.question2.answerOptions.map((answer:any)=>{
                              if(answer !== "" && answer !== null){
                                return <div key ={answer} style={{margin:"0.4rem 0rem"}}>
                                <RadioButton
                                className="radioBtn" 
                                style={{margin: "0rem 0.2rem"}} 
                                inputId={answer}
                                value={answer} 
                                onChange={()=> console.log("Hello there")}
                                checked={selectedAnswer4 === answer}/>
                                <span>{answer}</span>
                                <br/>
                            </div>

                              }

                            })}
                            <br/>
                              </>}
                            
                            {section.question3 && section.question3.questionText !== "" && section.question3.questionText !== null && <>
                            <p>{section.question3.questionText}</p><br/>
                            {section.question3.answerOptions.map((answer:any)=>{
                              if(answer !== "" && answer !== null){
                                return <Fragment key ={answer}>
                                <div  style={{margin:"0.4rem 0rem"}}>
                              <RadioButton
                              className="radioBtn" 
                              style={{margin: "0rem 0.2rem"}} 
                              inputId={answer}
                              value={answer} 
                              onChange={()=> console.log("Hello there")}
                              checked={selectedAnswer4 === answer}/>
                              <span>{answer}</span>
                              <br/>
                          </div>
                              </Fragment>
                              }
                              
                            })}
                            <br/>
                            </>}

                            {section.question4 && section.question4.questionText !== "" && !section.question4.questionText !== null && <>
                            <p>{section.question4.questionText}</p><br/><br/>
                            {section.question4.answerOptions.map((answer:any)=>{
                              if(answer !== "" && answer !== null){
                                return <Fragment key ={answer}>
                                <div  style={{margin:"0.4rem 0rem"}}>
                              <RadioButton
                              className="radioBtn" 
                              style={{margin: "0rem 0.2rem"}} 
                              inputId={answer}
                              value={answer} 
                              onChange={()=> console.log("Hello there")}
                              checked={selectedAnswer4 === answer}/>
                              <span>{answer}</span>
                              <br/>
                          </div>
                              </Fragment>
                              }

                            })}
                            <br/>
                            </>}

                            </Fragment>
                        })}
                        <br/>
                        <Button >Submit Final Exam</Button>
        </Sidebar>
        
        </Card>
    </Fragment>
        }
}


export default CourseComponent;