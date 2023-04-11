import React from "react";

export default function DeleteButton(props: any) {
  return (
    <button
      className="pointer-events-auto ml-auto rounded-sm bg-rdsOrange p-1 text-white transition-all hover:shadow-md hover:shadow-black active:translate-y-1 active:shadow-none"
      onClick={() => props.handleDeleteQuestion(props.index)}
    >
      Delete
    </button>
  );
}
