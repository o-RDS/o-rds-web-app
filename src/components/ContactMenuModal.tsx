import { useOutletContext } from "react-router-dom";

export default function ContactMenuModal(props: any) {
  const config: any = useOutletContext();

  return (
    <>
      {props.display ? (
        <div className="fixed flex h-full w-full items-center justify-center backdrop-blur-sm">
          <div className="flex min-h-[33%] w-3/4 flex-col items-center rounded-md border-2 border-rdsOrange bg-white p-4 md:min-h-[20%] lg:w-1/4">
            <h1 className="mb-auto">
              If you have any questions, you may contact the researcher using
              the contact information listed below!
            </h1>
            <div className="mt-2 mb-auto flex flex-col gap-y-4 text-left">
              {config.contactInfo.phone && (
                <div className="flex flex-row gap-x-2">
                  <p className="font-semibold">Phone:</p>
                  <a
                    href={"tel:" + config.contactInfo.phone}
                    className="text-rdsBlue underline"
                  >
                    {config.contactInfo.phone}
                  </a>
                </div>
              )}
              {config.contactInfo.email && (
                <div className="flex flex-row gap-x-2">
                  <p className="font-semibold">Email:</p>
                  <a
                    href={"mailto:" + config.contactInfo.email}
                    className="text-rdsBlue underline"
                  >
                    {config.contactInfo.email}
                  </a>
                </div>
              )}
            </div>
            <button
              onClick={() => props.setDisplay(false)}
              className="mt-2 w-1/3 rounded bg-rdsOrange p-1 text-white"
            >
              Close
            </button>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
