import React from "react";
import "./ResultRow.css";
import removeEntryIcon from "../images/remove_entry_icon.svg";

export default function ResultRow(props: {rowData: string[], type: string, bgColor?: string}){
    function renderCells(){
        return props.rowData.map((responseVal, index) =>{
            if(props.type == "header"){
                return(
                    <th className="border border-black px-4 py-3 whitespace-wrap max-w-md">{responseVal}</th>
                );
            }
            else{
                return(
                    <td className="border border-black px-4 py-3 whitespace-wrap break-words max-w-md">{responseVal}</td>
                );
            } 
        });   
    }

    return(
        <>
        {(props.type == "header") ?
            <tr className="bg-slate-600 text-white text-sm">
                <th className="bg-white border-0 w-fit"></th>
                {renderCells()}
            </tr>
            :
            <>
            <tr className={"dataRow " + props.bgColor}>
                <td className="bg-white w-10 align-middle">
                    <button className="deleteButton"><img src={removeEntryIcon} alt="Row delete button" className="w-8 h-10"/></button>
                </td>
                {renderCells()}
                
            </tr>
            </>
        }
        </>
    )
}