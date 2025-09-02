import React, { useContext, useEffect } from "react";
import { Context } from '../../context/context';
import DOMPurify from "dompurify";
import Header from "../../components/Header";
import ProductFooter from "../products/ProductFooter";

export default function PrivacyPolicy() {
    const { policyDetails } = useContext(Context);

    return (
        <div>
            <Header />
            <div className="container">
                <div className="policy-div" style={{marginTop:'50px'}}>
                    <h1 className="mb-4">Privacy Policy</h1>
                    <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(policyDetails.privacy_policy) || '' }} />
                </div>
            </div>
            <ProductFooter />
        </div>

    )
}