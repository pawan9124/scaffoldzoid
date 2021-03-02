# Consideration

The SCAFFOLZOID Inc. project is the bridge between the orange seller and buyers and it provide a unique way to interaction between the seller and buyers.

So the following consierations taken to complete the project as User based product

1. Explain what were your security considerations

-> Since, it user based authentication product the focus on security is primary focus as buyer and seller provide sensitive information to our database and I consider to use the most reknown way of handling the api access through JWT (Json web Token) as it not rely on the previous cookie based method where an unidentified user can intercept and gain the access of personal security, JWT token is encrypted and passed to user and receive request from user along with JWT, if not found then can't grant access to the api and token expires on 15 min to regenerate the token.

-> Distinction to accessing the routes from the front-end i.e. a buyer can't access the seller api , here I have checked access to api based on the role of the user, if buyer login then it can't access the seller modify chart url and if the seller is logged in it can't access the list of sellers viewed by buyers, so no one can access others or modify it.

-> From API side, can't access the api using POSTMAN or any other app to hit the api, protected by role permission.

2. Explain in a couple of words your tech descisions,

-> Maintainablity
For Code maintenance, I always try to use the DRY (Don't Repeat Yourself) methodolgy which lead me to decide which library is best suited to write code which easy in maintenance then REACT JS is the perfect solution for that as it allows big code to broken down in multiple components and dividing the big code into multiple components doesn't help in maintaining but save to repeat the save html code along the code.

-> Readability
Working in groups to write a code and come after long time to review always start funny conversations who write these code and God know why even it was written by me, so readability increase the grasp of the working of functions, I tried my best to write the comments of the functionality what they are doing and choose the names of the variable that relate to the actions performed, this increases the readability of the code.

-> Job Market  
 Currently the cutting edge techonolgy used by most of the companies are the MERN/MEAN stack, as it uses one language to completely make a project up and running and the support of the libraries are very good and debugging issues which commonly occurs to the majority of the people can be also searched in more accurate way in internet and future support is also bright in this technology, so I choose these stack for the project.

-> Security & upgrades
Since it is a MVP, the count of the number of user is less but as the MVP hits and the user base increases then need to scale the application by considering the microservices upgrades for each part of the application run independtly, creating the API gateways to handle the authentication and grant access to api basically (serverless), implementing machine learning and AI to handle the customer properly and make the product more efficient.

# Unit Testing

-> Implemented unit test using `JEST Enzyme` for the react project

-> For Mocha/chai I use seperate database to test the project although I can use the existing one but I have another and prefered to make the database for test seperate from the production database.
