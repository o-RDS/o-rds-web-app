import React from "react";

export default function DeleteButton(props: any) {
  return (
    <button
      className="pointer-events-auto z-50 ml-auto rounded-sm bg-rdsOrange p-1 text-white"
      onClick={() => props.handleDeleteQuestion(props.index)}
    >
      Delete
    </button>
  );
}
