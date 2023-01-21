import { listFundingSources } from '../../APIs/Tremendous';
import StandardPage from "../../components/StandardPage";



export default function PaymentManager() {
    
    listFundingSources()
    .then(data => {
        console.log(data)
    });
       

    return (
        <StandardPage>
            <p>This is the payment manager</p>
        </StandardPage>
    )
}