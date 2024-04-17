import React, {Fragment} from 'react'
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CourseBuilder from '@/components/coursebuilder-components/CourseBuilder';


const CourseBuilderPage = () => {


    
  return (
    <Fragment>
        <Header/>
        <h2>This is the course builder page</h2>
        <CourseBuilder/>
        <Footer/>
    </Fragment>
  )
}

export default CourseBuilderPage;