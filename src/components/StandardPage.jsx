import React from "react";
import TopNav from "./TopNav";

export default function StandardPage(props) {
    return(
        <>
            <TopNav />
            {props.children}
        </>
    )
}