import { listFundingSources } from "../../APIs/Tremendous";
import StandardPage from "../../components/StandardPage";

export default function PaymentManager() {
  listFundingSources().then((data) => {
    console.log(data);
  });

  // TODO: Allow for configuration of payout per response -> this gets sent to ReceivePayment.tsx

  return (
    <StandardPage>
      <p>This is the payment manager</p>
    </StandardPage>
  );
}
