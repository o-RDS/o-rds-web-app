# APIs

This folder contains the files that facilitate our web API calls. There are currently two resources o-RDS is leveraging: the **Tremendous** payment service API, and **Twilio** APIs. 

All of these calls require the use of a JWT (JSON web token) that is provided after a user or survey taker signs in or verifies via their phone number. These tokens allow us to be sure that anyone who is attempting to access our endpoints are properly authorized and to prevent misuse of the payout system. 

## o-RDS proxy server

We have created a [proxy server](https://github.com/o-RDS/o-rds-server) for use with the o-RDS admin client and survey taker pages. This server is meant to provide integrity and confidentiality to both our users' data and API secrets. The server's Github goes into much more detail on how our API endpoints work, as well as how to set up your own keys once you have both a Tremendous and Twilio account set up.  

