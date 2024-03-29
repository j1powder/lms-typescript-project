import { Fragment } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CurrentCourses from "@/components/coursedata-components/CurrentCourses";


const CoursesList = () => {


    return <Fragment>
        <Header />
       <h3>This is the Courses List Page</h3> 
        <CurrentCourses />
       <Footer/>
    </Fragment>
}


export default CoursesList;