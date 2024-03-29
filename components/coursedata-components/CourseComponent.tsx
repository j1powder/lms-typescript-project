'use client'

import { Fragment, useEffect, useState } from "react";
import { projectFirestore } from "@/FirebaseConfig";
import { getDocs, collection } from "firebase/firestore";




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
      
      
        },) 

        console.log(courseData)


    return <Fragment>
        <h3>Course Component</h3>
    </Fragment>
}


export default CourseComponent;