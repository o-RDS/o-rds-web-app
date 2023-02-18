import React from "react";

export default function DeleteButton(props: any) {
    return (<button className="rounded-sm p-1 bg-rdsOrange z-50 pointer-events-auto ml-auto text-white" onClick={() => props.handleDeleteQuestion(props.index)}>Delete</button>)
}