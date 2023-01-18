import React from "react";
import StandardPage from "../../components/StandardPage";
import { listFundingSources } from '../../Tremendous/Tremendous';



export default function PaymentManager() {

    var promise = listFundingSources();
    console.log(promise);

    return (
        <StandardPage>
            <p>This is the payment manager</p>
        </StandardPage>
    )
}