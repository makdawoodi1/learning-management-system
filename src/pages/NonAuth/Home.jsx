import React from "react";

// Layouts
import Header from '@/containers/layout/header.jsx'
import Footer from '@/containers/layout/footer.jsx'

// Sections
import About from '@/containers/section/about.jsx'
import Achievement from '@/containers/section/achievement.jsx'
import Banner from '@/containers/section/banner.jsx'
import Blog from '@/containers/section/blog.jsx'
import Category from '@/containers/section/category.jsx'
import Course from '@/containers/section/course.jsx'
import Instructor from '@/containers/section/instructor.jsx'
import Student from '@/containers/section/student.jsx'
import Sponsor from '@/containers/section/sponsor.jsx'

const Home = () => {
  return (
    <div>
      <Header />
      <Banner />
      {/* <Sponsor /> */}
      <Category />
      <Course />
      <About />
      <Instructor />
      <Student />
      <Blog />
      <Achievement />
      <Footer />
    </div>
  );
};

export default Home;
