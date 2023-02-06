# APIs
### o-RDS
This folder contains the files that facilitate our web API calls. There are currently two resources o-RDS is leveraging: the **Tremendous** payment service API, and the **WebOTP** (One Time Password) API. 


# Tremendous
### Description
Tremendous is how o-RDS facilitates payments to the survey takers. In the current state of o-RDS, Tremendous is the only place a researcher or developer will need to set up an account wtih any third-party. It is within that Tremendous account where a researcher will deposit the funds for their survey, create an organization, and pick a particular payout method for their individual survey. 
### Usage
The use of the Tremendous API functions requires set up in two places. First, by setting up [Tremendous.ts](./Tremendous.ts) with the correct authentication tokens. At the top of the file you will find: 

`// replace tokens here`
`const devToken = "Bearer [TOKEN]";`
`const prodToken = "Beaarer [TOKEN]"; `

Tremendous has a sandbox environment meant for development testing. The API key for this environment would go into `devToken`. Once the developer is ready to switch to production, they will need to change the variable within the request body (`const options`).

The second important set up requires the use of an `order` [interface](./interfaces.ts). This interface defines all of the necessary information that goes into creating an order through the Tremendous API. Notice that an order variable is the parameter for the `createOrder` function.


# WebOTP
### Description

### Usage
