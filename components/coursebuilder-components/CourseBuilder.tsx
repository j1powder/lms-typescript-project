'use client'

import React,{Fragment, useEffect, useState, useRef} from 'react'
import {InputText} from 'primereact/inputtext'
import { Button } from 'primereact/button'
import { projectFirestore } from '@/FirebaseConfig'
import { doc, setDoc, collection } from "firebase/firestore";

import classes from './CourseBuilder.module.css'

const CourseBuilder = () => {
    const [counter, setCounter] = useState(1);
    const courseName = useRef<HTMLInputElement>(null);
    const sectionTitle = useRef<HTMLInputElement>(null);
    const sectionVideo = useRef<HTMLInputElement>(null);
    const sectionNumber = useRef<HTMLInputElement>(null);
    const question1 = useRef<HTMLInputElement>(null);
    const question2 = useRef<HTMLInputElement>(null);
    const question3 = useRef<HTMLInputElement>(null);
    const question4 = useRef<HTMLInputElement>(null);
    const q1Correct = useRef<HTMLInputElement>(null);
    const q2Correct = useRef<HTMLInputElement>(null);
    const q3Correct = useRef<HTMLInputElement>(null);
    const q4Correct = useRef<HTMLInputElement>(null);
    const answer1 = useRef<HTMLInputElement>(null);
    const answer2 = useRef<HTMLInputElement>(null);
    const answer3 = useRef<HTMLInputElement>(null);
    const answer4 = useRef<HTMLInputElement>(null);
  
    const answer5 = useRef<HTMLInputElement>(null);
    const answer6 = useRef<HTMLInputElement>(null);
    const answer7 = useRef<HTMLInputElement>(null);
    const answer8 = useRef<HTMLInputElement>(null);
  
    const answer9 = useRef<HTMLInputElement>(null);
    const answer10 = useRef<HTMLInputElement>(null);
    const answer11 = useRef<HTMLInputElement>(null);
    const answer12 = useRef<HTMLInputElement>(null);
  
    const answer13 = useRef<HTMLInputElement>(null);
    const answer14 = useRef<HTMLInputElement>(null);
    const answer15 = useRef<HTMLInputElement>(null);
    const answer16 = useRef<HTMLInputElement>(null);
  
    const createNewCourseWithId = async () => {
      try {
        const createdAt = new Date().toLocaleDateString();
        const customId = courseName.current?.value;
        const coursesCollectionRef = doc(projectFirestore, 'newcourses', `${customId}` );
        await setDoc(coursesCollectionRef, { courseTitle: courseName.current?.value, dateCreated: createdAt });
        console.log("course created successfully");
        alert(`${courseName.current?.value} has been created successfully`);
      } catch (error) {
        console.error("Error creating document", error);
      }
    };
  
     

    const createSubCollection = async () => {
      try {
        const parentId = courseName.current?.value;
        const parentDocRef = doc(projectFirestore, 'newcourses', `${parentId}`); //projectFirestore.collection("newcourses").doc(parentId);

  
        const subcollectionRef = collection(parentDocRef, "Sections");
        const subDocRef = doc(subcollectionRef, `${sectionTitle.current?.value}`);
        const createdAt = new Date().toLocaleDateString();
  
        await setDoc(subDocRef,{
            createdAt: createdAt,
            orderNumber: parseFloat(sectionNumber.current!.value),
            title: sectionTitle.current!.value,
            video: sectionVideo.current!.value,
            
            question1: {
              questionText: question1.current!.value,
              answerOptions: [
                answer1.current!.value !== "" ? answer1.current!.value : null,
                answer2.current!.value !== "" ? answer2.current!.value : null,
                answer3.current!.value !== "" ? answer3.current!.value : null,
                answer4.current!.value !== "" ? answer4.current!.value : null,
              ],
              isCorrect: q1Correct.current?.value,
            },
            
            question2: {
              questionText: question2.current!.value,
              answerOptions: [
                answer5.current!.value !== "" ? answer5.current!.value : null,
                answer6.current!.value !== "" ? answer6.current!.value : null,
                answer7.current!.value !== "" ? answer7.current!.value : null,
                answer8.current!.value !== "" ? answer8.current!.value : null,
              ],
              isCorrect: q2Correct.current!.value,
            },
    
            question3: {
              questionText: question3.current!.value,
              answerOptions: [
                answer9.current!.value !== "" ? answer9.current!.value : null,
                answer10.current!.value !== "" ? answer10.current!.value : null,
                answer11.current!.value !== "" ? answer11.current!.value : null,
                answer12.current!.value !== "" ? answer12.current!.value : null,
              ],
              isCorrect: q3Correct.current!.value,
            },
    
            question4: {
              questionText: question4.current!.value,
              answerOptions: [
                answer13.current!.value !== "" ? answer13.current!.value : null,
                answer14.current!.value !== "" ? answer14.current!.value : null,
                answer15.current!.value !== "" ? answer15.current!.value : null,
                answer16.current!.value !== "" ? answer16.current!.value : null,
              ],
              isCorrect: q4Correct.current!.value,
            },
          })
        

  
        sectionTitle.current!.value = "";
        sectionVideo.current!.value = "";
        question1.current!.value = "";
        question2.current!.value = "";
        question3.current!.value = "";
        question4.current!.value = "";
        q1Correct.current!.value = "";
        q2Correct.current!.value = "";
        q3Correct.current!.value = "";
        q4Correct.current!.value = "";
        answer1.current!.value = "";
        answer2.current!.value = "";
        answer3.current!.value = "";
        answer4.current!.value = "";
        answer5.current!.value = "";
        answer6.current!.value = "";
        answer7.current!.value = "";
        answer8.current!.value = "";
        answer9.current!.value = "";
        answer10.current!.value = "";
        answer11.current!.value = "";
        answer12.current!.value = "";
        answer13.current!.value = "";
        answer14.current!.value = "";
        answer15.current!.value = "";
        answer16.current!.value = "";
  
        addToCounter();
        console.log("section added successfully", subDocRef.id);
        alert(`section was successfully added to ${courseName.current!.value}`);
      } catch (error) {
        console.error("Error creating subcollection document:", error);
      }
    };
  
    const addToCounter = () => {
      setCounter((score) => score + 1);
    };


  return (
    <Fragment>
    
      <h2>Need to create a new course?</h2>
      <h4>
        Please read the instructions below in order to create a new course
      </h4>
      <h5>
        1. Enter Course Name in the Top Fied and Click "Add". This adds the
        course
      </h5>
      <h5>
        2. Next Add Sections. Each Section allows a video and 2 review
        questions. The videos can be added from vimeo or youtube. You only
        need to enter the https address of the video.{" "}
      </h5>
      <h5>
        3. Adding questions, you can add <b>4</b> questions per section. You can have
        multiple choice answers with up to 4 options. Make sure the correct
        answer text matches the answer option text.{" "}
      </h5>

      <form>
        
          <label style={{ width: "90%" }}  >
            Course Name:
            <InputText
              ref={courseName}
              type="text"
            />
          </label>
          <br />
          <Button
               type="button"
               onClick={createNewCourseWithId}           
          >
            Add
          </Button>
        
      </form>

      <br />
      <hr/>

      <h2>Add Sections</h2>
      <form className={classes.entireform}>
        <label className={classes.cbuilderlabel}>
          Section Title
        </label>
        <InputText ref={sectionTitle} type="text" />
        <label className={classes.cbuilderlabel}>
          Section Order Number
        </label>
        <InputText ref={sectionNumber} type="number" value={counter} />
        <label className={classes.cbuilderlabel}>Add Video</label>
        <InputText ref={sectionVideo} type="text" />
        <br />
        <br />
        <label className={classes.cbuilderlabel}>
          <b>Question 1</b>
        </label>
        <InputText ref={question1} type="text" />
        <p className={classes.answers}>Answer Options</p>
        <label className={classes.cbuilderlabel}>answer: </label>
        <InputText ref={answer1} type="text" />
        <label className={classes.cbuilderlabel}>answer: </label>
        <InputText ref={answer2} type="text" />
        <label className={classes.cbuilderlabel}>answer: </label>
        <InputText ref={answer3} type="text" />
        <label className={classes.cbuilderlabel}>answer: </label>
        <InputText ref={answer4} type="text" />
        <label className={classes.cbuilderlabel}>
          Correct Answer:{" "}
        </label>
        <InputText ref={q1Correct} type="text" />

        <br />
        <br />
        <label className={classes.cbuilderlabel}>
          <b>Question 2</b>
        </label>
        <InputText ref={question2} type="text" />
        <p className={classes.answers}>Answer Options</p>
        <label className={classes.cbuilderlabel}>answer: </label>
        <InputText ref={answer5} type="text" />
        <label className={classes.cbuilderlabel}>answer: </label>
        <InputText ref={answer6} type="text" />
        <label className={classes.cbuilderlabel}>answer: </label>
        <InputText ref={answer7} type="text" />
        <label className={classes.cbuilderlabel}>answer: </label>
        <InputText ref={answer8} type="text" />
        <label className={classes.cbuilderlabel}>
          Correct Answer:{" "}
        </label>
        <InputText ref={q2Correct} type="text" />

        <br />
        <br />
        
        <label className={classes.cbuilderlabel}>
          <b>Question 3</b>
        </label>
        <InputText ref={question3} type="text" />
        <p className={classes.answers}>Answer Options</p>
        <label className={classes.cbuilderlabel}>answer: </label>
        <InputText ref={answer9} type="text" />
        <label className={classes.cbuilderlabel}>answer: </label>
        <InputText ref={answer10} type="text" />
        <label className={classes.cbuilderlabel}>answer: </label>
        <InputText ref={answer11} type="text" />
        <label className={classes.cbuilderlabel}>answer: </label>
        <InputText ref={answer12} type="text" />
        <label className={classes.cbuilderlabel}>
          Correct Answer:{" "}
        </label>
        <InputText ref={q3Correct} type="text" />

        <br />
        <br />

        <label className={classes.cbuilderlabel}>
          <b>Question 4</b>
        </label>
        <InputText ref={question4} type="text" />
        <p className={classes.answers}>Answer Options</p>
        <label className={classes.cbuilderlabel}>answer: </label>
        <InputText ref={answer13} type="text" />
        <label className={classes.cbuilderlabel}>answer: </label>
        <InputText ref={answer14} type="text" />
        <label className={classes.cbuilderlabel}>answer: </label>
        <InputText ref={answer15} type="text" />
        <label className={classes.cbuilderlabel}>answer: </label>
        <InputText ref={answer16} type="text" />
        <label className={classes.cbuilderlabel}>
          Correct Answer:{" "}
        </label>
        <InputText ref={q4Correct} type="text" />

        <br />
        <br />
        <Button type="button" onClick={createSubCollection}>Add Section</Button>
      </form> 
    
  </Fragment>
  )
}

export default CourseBuilder;