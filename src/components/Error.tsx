import React from "react";

export default function Error(props: any) {
    return (
        <div className="p-2 w-full bg-red-500 bg-opacity-20 rounded-md"><p className="text-red-500 text-center text-sm">{props.message}</p></div>
    )
}