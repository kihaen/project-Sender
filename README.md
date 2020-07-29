Project-Sender

Overview

Project-Sender is a large feedback-collection application, features including everything from authentication to email handling. This app will mass send emails to a big list of users for the purpose of collecting feedback.

Description

Some features included as part of this application:

Built from Create-React-App the front end of this application is connected to a NodeJs and Express backend. Mongo cloud based database communicates data to our backend. React-Router is implemented as a part of our front-end handling frontend routing while Express handles our backend. Stripe handles credit cards and recieves payments from our users. Users are sent automated emails Authentication is built using google OAuth for a seamless transition. Multiple environment implementations and advanced API key handling.

--------------------

How to use : 
Currently the live version with use your google account to register you an account. 
Once you register, you can add credits to the debug mode stripe processing by : 
using any email or name. valid future expiration date, and filling the card number repeatedly with : 424242...
once you have the credits, the recipients added must be seperated by a comma if there is more than one.

----------------------

Currently the live version is running the bare minimum UI
