import { Fragment } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CourseComponent from "@/components/coursedata-components/CourseComponent";

import React from 'react'

const CourseDetailPage = () => {
  return (
    <Fragment>
        <Header />
        <h3>CourseDetailPage</h3>
        <CourseComponent />
        <Footer />
        </Fragment>
  )
}

export default CourseDetailPage;