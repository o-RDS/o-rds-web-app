import React from "react";

export default function Error(props: any) {
  return (
    <div className="w-full rounded-md bg-red-500 bg-opacity-20 p-2">
      <p className="text-center text-sm text-red-500">{props.message}</p>
    </div>
  );
}
