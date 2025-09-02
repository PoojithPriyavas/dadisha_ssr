import React, { useContext, useEffect } from "react";
import { Context } from '../../context/context';
import DOMPurify from "dompurify";
import Header from "../../components/Header";
import ProductFooter from "../products/ProductFooter";

export default function TermsAndConditions() {
    const { policyDetails } = useContext(Context);

    return (
        <div>
            <Header />
            <div className="container">
                <div style={{marginTop:"50px"}}>
                    <h1 className="mb-4">Terms And Conditions</h1>
                    <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(policyDetails.terms_and_conditions) || '' }} />
                </div>
            </div>
            <ProductFooter />
        </div>

    )
}