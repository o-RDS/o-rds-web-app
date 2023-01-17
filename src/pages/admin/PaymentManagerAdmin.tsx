import React from "react";
import StandardPage from "../../components/StandardPage";
import listFundingSources from '../../Tremendous/Tremendous';


interface fundingSourcesObj {
    method: string;
    balance: number;
}

export default function PaymentManager() {

    var response = listFundingSources();
    // console.log(response);

    return (
        <StandardPage>
            <p>This is the payment manager</p>
        </StandardPage>
    )
}