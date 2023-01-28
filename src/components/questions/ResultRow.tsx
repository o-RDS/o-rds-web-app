import React from "react";

export default function ResultRow(props: {rowData: string[], type: string, bgColor?: string}){
    function renderCells(){
        return props.rowData.map((responseVal, index) =>{
            if(props.type == "header"){
                return(
                    <th className="border border-black px-4 py-2 whitespace-wrap max-w-md">{responseVal}</th>
                );
            }
            else{
                return(
                    <td className="border border-black px-4 py-2 whitespace-wrap max-w-md">{responseVal}</td>
                );
            } 
        });   
    }

    return(
        <>
        {(props.type == "header") ?
            <tr className="bg-slate-600 text-white text-sm">
                {renderCells()}
            </tr>
            :
            <tr className={props.bgColor}>
                {renderCells()}
            </tr>
        }
        </>
    )
}