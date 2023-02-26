import { Link, useNavigate, useParams } from "react-router-dom";
import SurveyTakerStandardPage from "../../components/SurveyTakerStandardPage";

export default function Consent(){
    return (
        <SurveyTakerStandardPage>
            <p>
                You will now be asked to provide your consent to participate in this study.<br/> 
                Please read the consent information below.
            </p>
            <p>
                Get config info from config and put here.
            </p>
            <div className="flex flex-row">
                <input 
                    type="checkbox"
                    id="consent"
                    name="consent"
                    className="mr-2"
                />
                <label htmlFor="consent">
                    I acknowledge that I have read the consent information listed above and give my consent to participate in this study.
                </label>
            </div>
            <button className="w-56 rounded bg-rdsOrange p-1 text-white">
                Accept
            </button>
        </SurveyTakerStandardPage>
    );
}