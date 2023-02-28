import React from "react";
import { listCampaigns, listFundingSources } from "../../APIs/Tremendous"

/* DEV NOTES
*
* There are two things that need to be selected: 
* 1: The funding source (funding_source_id: string)
* 2: The campaign (campaign_id: string)
* 
* Their decision will be saved in the survey config, along with the list of products associated with whichever campaign they chose. 
*/

interface campaign {
    name: string;
    id: string;
    products: string[];
}

interface fundingSource {
    method: string;
    id: string;
    availableCents: number;
}

function loadCampaignData() {
    let campaigns: campaign[] = [];

    listCampaigns().then((data) => {
        data.campaigns.forEach((obj: any) => {
            var tempCampaign: campaign = {
                name: obj.name,
                id: obj.id,
                products: obj.products
            }
            campaigns.push(tempCampaign);
        })
    });  

    return campaigns;
}

function loadFundingData() {
    let fundingSources: fundingSource[] = [];

    listFundingSources().then((data) => {
        data.funding_sources.forEach((obj: any) => {
            var tempFundingSource: fundingSource = {
                method: obj.method,
                id: obj.id,
                availableCents: obj.meta.available_cents
            }
            fundingSources.push(tempFundingSource);
        })
    }); 

    return fundingSources;
}

export function TremendousSettings() {

    let campaigns: campaign[] = loadCampaignData();
    console.log(campaigns);

    let fundingSources: fundingSource[] = loadFundingData();
    console.log(fundingSources);

    return (
        <div className="flex flex-col gap-10 w-full pl-2 pr-2">
            <h3 className="text-3xl">Tremendous</h3>
          </div>
    )
}