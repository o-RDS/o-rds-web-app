import React, {useState} from "react";
import { Link } from "react-router-dom";
import SurveyTakerStandardPage from "../../components/SurveyTakerStandardPage";
import tremendousLogo from "../../images/tremendous_logo.svg"
import { order } from "../../APIs/interfaces"
import { createOrder } from "../../APIs/Tremendous"
import { send } from "process";

export default function ReceivePayment(){
    const [emailVerified, setEmailVerified] = useState(false);

    function newOrder(email: string, phoneNum: string): order {
        let order: order = {
            external_id: "o-RDS Survey",
            funding_source_id: '0JLPRGW2MEB9',
            campaign_id: '4BDWAVSR8A91',
            products: ['TBAJH7YLFVS5'],
            denomination: 5, // Best way to set up how much to send? Ideally, this would come from the payment manager page
            recipient_name: 'Survey Taker', // best to keep this anonymous? 
            recipient_email: email,
            recipient_phone: phoneNum,
            reward_id: '123456', // perhaps this could be the hash?? 
            reward_value: 'Survey Reward',
            delivery_method: 'EMAIL'
        };

        
        return order;
    }

    function sendReward(order: order) {
        console.log("Fetching Tremendous order API");
        createOrder(order)
            .then(data => {
            console.log(data)
            // TODO: error checking
        });
    }
    
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
                        <p className="text-center w-5/6 max-w-xs break-words pl-2">An email will be sent to <br/> {(document.getElementById("tremendousEmail") as HTMLInputElement).value}!</p>
                    </div>
                    <button className="mt-6 p-1 w-1/3 rounded bg-orange-600 text-white">Continue</button>
                </div>
                :
                <div className="flex flex-col w-full max-w-prose items-center mt-12">
                    <img src={tremendousLogo} alt="The logo of Tremendous" className="w-3/4"/>
                    <label htmlFor="tremendousEmail" className="w-2/3 mt-6">Email:<br /></label>
                    <input type="text" id="tremendousEmail" name="tremendousEmail" placeholder="Ex: name@gmail.com" className="w-2/3 p-1 rounded bg-gray-200"></input>
                    <button onClick={() => {
                        let email = (document.getElementById("tremendousEmail") as HTMLInputElement).value;
                        let regexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
                        let test = regexp.test(email);
                        if (test) {
                            setEmailVerified(true);
                            sendReward(newOrder(email, '123-456-7890')); // TODO: get phone number from somewhere else
                        } else {
                            alert("Invalid email");
                        }
                    }} className="mt-6 p-1 w-1/3 rounded bg-orange-600 text-white">Submit</button>
                </div>
            }
        </SurveyTakerStandardPage>
    )
}