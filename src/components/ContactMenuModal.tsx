
export default function ContactMenuModal(props: any){

    return(
        <>
        {props.display ? (
            <div className="fixed h-full w-full flex items-center justify-center backdrop-blur-sm">
                <div className="flex flex-col gap-y-6 items-center justify-center w-3/4 md:w-1/5 h-1/3 md:h-1/5 rounded-md border-2 border-rdsOrange bg-white p-2">
                    <h1>If you have any questions, you may contact the researcher using the contact information listed below!</h1>
                    <div className="flex flex-row gap-x-2">
                        <p>Phone:</p>
                        <a href="tel:">NUMBER WILL GO HERE</a>
                    </div>
                    <div className="flex flex-row gap-x-2">
                        <p>Email:</p>
                        <a href="mailto:">EMAIL WILL GO HERE</a>
                    </div>
                    <button
                        onClick={() => props.setDisplay(false)}
                        className="bg-rdsOrange text-white w-1/3"
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

