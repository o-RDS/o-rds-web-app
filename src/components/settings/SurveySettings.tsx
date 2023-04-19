import React from "react";
import { GeneralSettings } from "./GeneralSettings";
import { MoneySettings } from "./MoneySettings";
import { ContactSettings } from "./ContactSettings";
import { AppearanceSettings } from "./AppearanceSettings";
import { TremendousSettings } from "./TremendousSettings";
import { InformedConsentSettings } from "./InformedConsentSettings";

export default function SurveySettings(props: any) {
  function showSettings() {
    switch (props.settings.whichSettings) {
      case "general": {
        return <GeneralSettings />;
      }
      case "money": {
        return <MoneySettings />;
      }
      case "contact": {
        return <ContactSettings />;
      }
      case "appearance": {
        return <AppearanceSettings />;
      }
      case "tremendous": {
        return <TremendousSettings />;
      }
      case "informed-consent": {
        return <InformedConsentSettings />;
      }
    }
  }
  return (
    <>
      <div className="h-min-56 mt-3 flex w-screen flex-col items-start justify-start gap-10 dark:text-white">
        {showSettings()}
      </div>
    </>
  );
}
