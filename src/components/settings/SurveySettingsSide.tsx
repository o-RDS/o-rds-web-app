import react, { useContext } from "react";

export default function SurveySettingsSide(props: any) {

  function isActive(setting: string) {
    if (setting ===  props.settings.whichSettings) {
      return "dark:bg-rdsDarkAccent"
    } else {
      return ""
    }
  }

  return (
    <>
      <div className="flex w-1/4 pl-4 pt-3 flex-col items-start justify-start gap-2 border-r border-black dark:bg-rdsDarkAccent3 dark:text-white dark:border-none">
        <h2 className="text-2xl w-2/5 font-bold">Settings</h2>
        <button className={`hover:bg-rdsDarkAccent w-4/5 rounded-sm text-left p-1 ${isActive("general")}`} onClick={() => props.setSettings({active: true, whichSettings: "general"})}>General</button>
        <button className={`hover:bg-rdsDarkAccent w-4/5 rounded-sm text-left p-1 ${isActive("appearance")}`} onClick={() => props.setSettings({active: true, whichSettings: "appearance"})}>Appearance</button>
        <button className={`hover:bg-rdsDarkAccent w-4/5 rounded-sm text-left p-1 ${isActive("money")}`} onClick={() => props.setSettings({active: true, whichSettings: "money"})}>Referrals & Payments</button>
        <button className={`hover:bg-rdsDarkAccent w-4/5 rounded-sm text-left p-1 ${isActive("tremendous")}`} onClick={() => props.setSettings({active: true, whichSettings: "tremendous"})}>Tremendous</button>
        <button className={`hover:bg-rdsDarkAccent w-4/5 rounded-sm text-left p-1 ${isActive("contact")}`} onClick={() => props.setSettings({active: true, whichSettings: "contact"})}>Contact Information</button>
      </div>
    </>
  );
}
