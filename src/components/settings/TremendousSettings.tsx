import React from "react";

/* DEV NOTES
*
* There are three things that need to be selected: 
* 1: The funding source (funding_source_id)
* 2: The campaign (campaign_id)
* 3: Which products they would like to use (products[])
* 
* Tremendous.js has functions to list each one of these.
* Their decision probably needs to be stored in the survey config, then used when a payment is made in ReceivePayment.tsx
*/


export function TremendousSettings() {

    

    return (
        <div className="flex flex-col gap-10 w-full pl-2 pr-2">
            <h3 className="text-3xl">Tremendous</h3>
          </div>
    )
}