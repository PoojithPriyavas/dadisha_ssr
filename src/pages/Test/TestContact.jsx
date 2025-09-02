import React from "react";
import PageHeader from "../../components/PageHeader";
import HeroSection from "../../components/ContactHeroSection";
import ContactForm from "../../components/ContactForm";
import HomeFourteen from "../home/HomeFourteen";
import FooterTwo from "../../components/FooterTwo";
import Header from '../../components/Header';

export default function TestContact() {
    return (
        <>
            <Header />
            <HeroSection />
            <ContactForm />
            <HomeFourteen />
            <FooterTwo />
        </>
    )
}