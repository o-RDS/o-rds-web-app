import React from "react";
import SurveyTopNav from "./SurveyTopNav";

export default function StandardPage(props: any) {
    return(
        <>
            <SurveyTopNav />
            {props.children}
        </>
    )
}