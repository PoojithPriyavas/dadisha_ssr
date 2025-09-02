import React from 'react';
import Header from '../../components/Header';
import HomeSectionEight from '../home/HomeSectionEight'
import FooterTwo from "../../components/FooterTwo";

import './blogs.css';
import BlogPage from './BlogPage';



export default function Blogs() {
    return (
        <div>
            <Header />
            <BlogPage />
            {/* <HomeSectionEight /> */}
            <FooterTwo />
        </div>
    )
}