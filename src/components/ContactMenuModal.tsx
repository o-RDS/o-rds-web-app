import { useOutletContext } from "react-router-dom";

export default function ContactMenuModal(props: any){
    const config: any = useOutletContext();

    return(
        <>
        {props.display ? (
            <div className="fixed h-full w-full flex items-center justify-center backdrop-blur-sm">
                <div className="flex flex-col items-center w-3/4 lg:w-1/4 min-h-[33%] md:min-h-[20%] rounded-md border-2 border-rdsOrange bg-white p-4">
                    <h1 className="mb-auto">If you have any questions, you may contact the researcher using the contact information listed below!</h1>
                    <div className="mt-2 flex flex-col gap-y-4 text-left mb-auto">
                        {config.contactInfo.phone &&
                            <div className="flex flex-row gap-x-2">
                                <p className="font-semibold">Phone:</p>
                                <a 
                                    href={"tel:" + config.contactInfo.phone}
                                    className="text-rdsBlue underline"
                                >
                                    {config.contactInfo.phone}
                                </a>
                            </div>
                        }
                        {config.contactInfo.email &&
                            <div className="flex flex-row gap-x-2">
                                <p className="font-semibold">Email:</p>
                                <a 
                                    href={"mailto:" + config.contactInfo.email}
                                    className="text-rdsBlue underline"
                                >
                                    {config.contactInfo.email}
                                </a>
                            </div>
                        }
                    </div>
                    <button
                        onClick={() => props.setDisplay(false)}
                        className="mt-2 w-1/3 p-1 rounded bg-rdsOrange text-white"
                    >
                        Close
                    </button>
                </div>
            </div>
            ) : (
                <></>
            )
        }
        </>
    );
}

