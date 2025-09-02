import React from "react";
import HomeTen from "../home/HomeTen";
import HomeEleven from '../home/HomeEleven';
import HomeTwelve from '../home/HomeTwelve';
import HomeThirteen from '../home/HomeThirteen';
import HomeFourteen from '../home/HomeFourteen';
import FooterTwo from "../../components/FooterTwo";
import EmpowerSection from "../home/HomeNine";
import PrimaryHeader from "../../components/PrimaryHeader";
import Header from '../../components/Header';
import ProductFooter from '../products/ProductFooter';

export default function TestHome() {
    return (
        <>
            <Header />
            <EmpowerSection />
            <HomeTen />
            {/* <HomeEleven /> */}
            <HomeTwelve />
            <HomeThirteen />
            <HomeFourteen />
            <FooterTwo />
        </>
    )
}