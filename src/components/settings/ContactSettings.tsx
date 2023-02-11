import React from "react";

export function ContactSettings() {
  return (
    <div className="flex w-full flex-col gap-10 pl-2 pr-2">
      <h2 className="text-3xl">Contact Information</h2>
      <div className="flex flex-col gap-1">
        <label htmlFor="phone">Phone Number</label>
        <input
          type="tel"
          id="phone"
          className="rounded-sm p-1 dark:bg-rdsDarkAccent w-1/5"
          maxLength={20}
        ></input>
      </div>
      <div className="flex flex-col gap-1">
      <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          className="rounded-sm p-1 dark:bg-rdsDarkAccent w-1/5"
          maxLength={20}
        ></input>
      </div>
      <div className="flex flex-col gap-1">
      <label htmlFor="mail">Mailing Address</label>
        <input
          type="text"
          id="mail"
          className="rounded-sm p-1 dark:bg-rdsDarkAccent w-1/5"
          maxLength={20}
        ></input>
      </div>
    </div>
  );
}
