import react, { useContext } from "react";

export default function SurveySettingsSide(props: any) {
  function isActive(setting: string) {
    if (setting === props.settings.whichSettings) {
      return "bg-gray-200 dark:bg-rdsDarkAccent";
    } else {
      return "";
    }
  }

  return (
    <>
      <div className="flex min-h-screen w-1/4 flex-col items-start justify-start gap-2 border-r border-black pl-4 pt-3 dark:border-none dark:bg-rdsDarkAccent3 dark:text-white">
        <h2 className="w-2/5 text-2xl font-bold">Settings</h2>
        <button
          className={`w-4/5 rounded-sm p-1 text-left hover:bg-gray-300 hover:dark:bg-rdsDarkAccent ${isActive(
            "general"
          )} transition-all`}
          onClick={() =>
            props.setSettings({ active: true, whichSettings: "general" })
          }
        >
          General
        </button>
        <button
          className={`w-4/5 rounded-sm p-1 text-left hover:bg-gray-300 hover:dark:bg-rdsDarkAccent ${isActive(
            "appearance"
          )} transition-all`}
          onClick={() =>
            props.setSettings({ active: true, whichSettings: "appearance" })
          }
        >
          Appearance
        </button>
        <button
          className={`w-4/5 rounded-sm p-1 text-left hover:bg-gray-300 hover:dark:bg-rdsDarkAccent ${isActive(
            "money"
          )} transition-all`}
          onClick={() =>
            props.setSettings({ active: true, whichSettings: "money" })
          }
        >
          Referrals & Payments
        </button>
        <button
          className={`w-4/5 rounded-sm p-1 text-left hover:bg-gray-300 hover:dark:bg-rdsDarkAccent ${isActive(
            "tremendous"
          )} transition-all`}
          onClick={() =>
            props.setSettings({ active: true, whichSettings: "tremendous" })
          }
        >
          Tremendous
        </button>
        <button
          className={`w-4/5 rounded-sm p-1 text-left hover:bg-gray-300 hover:dark:bg-rdsDarkAccent ${isActive(
            "contact"
          )} transition-all`}
          onClick={() =>
            props.setSettings({ active: true, whichSettings: "contact" })
          }
        >
          Contact Information
        </button>
        <button
          className={`w-4/5 rounded-sm p-1 text-left hover:bg-gray-300 hover:dark:bg-rdsDarkAccent ${isActive(
            "informed-consent"
          )} transition-all`}
          onClick={() =>
            props.setSettings({
              active: true,
              whichSettings: "informed-consent",
            })
          }
        >
          Informed Consent
        </button>
      </div>
    </>
  );
}
