import React, {useState} from "react";
import { Link } from "react-router-dom";
import SurveyTakerStandardPage from "../../components/SurveyTakerStandardPage";
import tremendousLogo from "../../images/tremendous_logo.svg"

export default function ReceivePayment(){
    const [emailVerified, setEmailVerified] = useState(false);
    
    return(
        <SurveyTakerStandardPage>
            <div className="flex flex-col mt-10 max-w-prose">
                <p>
                    Thank you for completing the survey! You may now claim your participation reward of $X!
                    Your reward will be sent to you through Tremendous, a digital payment service.<br/><br/>

                    Please enter your email address below, and you will be sent an email from Tremendous with instructions on how to claim your reward.
                </p>
            </div>

            {(emailVerified) ?
                <div className="flex flex-col w-full max-w-prose items-center mt-12">
                    <img src={tremendousLogo} alt="The logo of Tremendous" className="w-3/4"/>
                    <div className="flex flex-row justify-center items-center mt-6 w-2/3 max-w-prose">
                        <p className="text-6xl text-green-500 text-center w-1/6">✔</p>
                        <p className="text-center w-5/6 max-w-xs break-words pl-2">An email will be sent to <br/> name@gmail.com!</p>
                    </div>
                    <button className="mt-6 p-1 w-1/3 rounded bg-rdsOrange text-white">Continue</button>
                </div>
                :
                <div className="flex flex-col w-full max-w-prose items-center mt-12">
                    <img src={tremendousLogo} alt="The logo of Tremendous" className="w-3/4"/>
                    <label htmlFor="tremendousEmail" className="w-2/3 mt-6">Email:<br /></label>
                    <input type="text" id="tremendousEmail" name="tremendousEmail"  placeholder="Ex: name@gmail.com" className="w-2/3 p-1 rounded bg-gray-200"></input>
                    <button onClick={() => setEmailVerified(true)} className="mt-6 p-1 w-1/3 rounded bg-rdsOrange text-white">Submit</button>
                </div>
            }
        </SurveyTakerStandardPage>
    )
}