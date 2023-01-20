export interface order {
    external_id: string; // your individual indentifier for this order
    funding_source_id: string; // '0JLPRGW2MEB9'
    campaign_id: string; // '4BDWAVSR8A91'
    products: string[]; // ['TBAJH7YLFVS5']
    denomination: number; // 5
    recipient_name: string; // 'John Doe Jr.'
    recipient_email: string; // 'john.doe@example.com'
    recipient_phone: string; // '123-456-7890'
    reward_id: string; // '123456'
    reward_value: string; // 'Huffelpuff'
    delivery_method: string; // 'EMAIL'
}

// EXAMPLE Order Creation
// let order: order = {
//     external_id: "your individual indentifier for this order",
//     funding_source_id: '0JLPRGW2MEB9',
//     campaign_id: '4BDWAVSR8A91',
//     products: ['TBAJH7YLFVS5'],
//     denomination: 5,
//     recipient_name: 'John Doe Jr.',
//     recipient_email: 'john.doe@example.com',
//     recipient_phone: '123-456-7890',
//     reward_id: '123456',
//     reward_value: 'Huffelpuff',
//     delivery_method: 'EMAIL'
// };