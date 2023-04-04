import React, { useContext, useEffect, useState } from "react";
import { SurveyContext, SurveyDispatchContext } from "../../context/SurveyBuilderContext";
import { listCampaigns, listFundingSources } from "../../APIs/Tremendous";


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

async function loadCampaignData() {
  let campaigns: campaign[] = [];

  let data = await listCampaigns()
  data.campaigns.forEach((obj: any) => {
    var tempCampaign: campaign = {
      name: obj.name,
      id: obj.id,
      products: obj.products,
    };
    campaigns.push(tempCampaign);
  });

  return campaigns;
}

async function loadFundingData() {
  let fundingSources: fundingSource[] = [];

  let data = await listFundingSources()
  data.funding_sources.forEach((obj: any) => {
    var tempFundingSource: fundingSource = {
      method: obj.method,
      id: obj.id,
      availableCents: obj.meta.available_cents,
    };
    fundingSources.push(tempFundingSource);
  });

  return fundingSources;
}

export function TremendousSettings() {
  const [campaigns, setCampaigns] = useState<campaign[]>([]);
  const [fundingSources, setFundingSources] = useState<fundingSource[]>([]);
  const dispatch = useContext(SurveyDispatchContext);

  function handleCampaignChange(e: any) {
    e.preventDefault();
    let name = e.target.value;
    let id = "";
    campaigns.forEach((campaign: any) => {
      if (campaign.name === name) {
        id = campaign.id;
      }
    });
    if (id === "") {
      console.error("Funding source not found");
      return;
    }
    dispatch({
      type: "change-campaign",
      newType: id
    });
  }

  function handleFundingSourceChange(e: any) {
    e.preventDefault();
    let method = e.target.value;
    let id = "";
    fundingSources.forEach((source: any) => {
      if (source.method === method) {
        id = source.id;
      }
    });
    if (id === "") {
      console.error("Funding source not found");
      return;
    }
    dispatch({
      type: "change-funding",
      newType: id
    });
  }

  useEffect(() => {
    loadCampaignData().then((data) => setCampaigns(data));
    console.log(campaigns);

    loadFundingData().then((data) => setFundingSources(data));
    console.log(fundingSources);
  }, []);


  return (
    <div className="flex w-full flex-col gap-10 pl-2 pr-2">
      <h3 className="text-3xl">Tremendous</h3>
      <div className="flex flex-col items-start gap-3">
        <label htmlFor="campaign">Select a Campaign</label>
        <select
          id="campaign"
          onChange={(e) => handleCampaignChange(e)}
          className="rounded-md border border-rdsBlue p-2 dark:bg-inherit dark:text-white"
        >
          <option>Select an Option</option>
          {campaigns.map((campaign: any) => (
            <option>{campaign.name}</option>
          ))}
        </select>
      </div>
      <div className="flex flex-col items-start gap-3">
        <label htmlFor="funding">Funding Source</label>
        <select
          id="funding"
          onChange={(e) => handleFundingSourceChange(e)}
          className="rounded-md border border-rdsBlue p-2 dark:bg-inherit dark:text-white"
        >
          <option>Select an Option</option>
          {fundingSources.map((source: any) => (
            <option>{source.method}</option>
          ))}
        </select>
      </div>
    </div>
  );
}
