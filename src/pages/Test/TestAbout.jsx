import React from "react";
import Header from '../../components/Header';
// import PageHeader from "../../components/PageHeader";
import HeroSection from "../../components/AboutHeroSection";
import ServiceAbout from "../../components/ServiceAbout";
import Services from "../services/Services";
import ServiceSection from "../../components/ServiceSection";

import EmpowerSection from "../home/HomeNine";
import FooterTwo from "../../components/FooterTwo";
import HomeThirteen from "../home/HomeThirteen";
import HomeTen from "../home/HomeTen";
import Mission from "../about/NewAboutMission";
import HomeFourteen from '../home/HomeFourteen';
import AboutBanner from "../../components/AboutSecondBanner";





export default function TestAbout() {
    return (
        <>
            {/* <PageHeader /> */}
            <Header />
            <HeroSection />
            <ServiceAbout />
            <Mission />
            <AboutBanner />

            <HomeTen />

            {/* <HomeThirteen /> */}
            <HomeFourteen />

            <FooterTwo />
        </>
    )
}