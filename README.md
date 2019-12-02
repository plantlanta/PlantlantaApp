# PlantlantaApp

## Install Guide

### Local Development and Deploy
Pre-requisites
  git (see https://git-scm.com/downloads)
  node --version (see https://nodejs.org/en/download/)
  v10.16.3
  npm --version (see https://www.npmjs.com/get-npm)
  6.9.0

Clone repository to local machine
  Log into AWS account (either with the Plantlanta main account, or with a user)
  ** INSERT IMAGE **
  You will be brought to the main console screen.
  From here go to CodeCommit under the services tab.
  You will see the PlantlantaApp Repository. From which you will be able to clone onto your machine using git.
  ** INSERT IMAGE **

AWS Amplify Installed and Configured
  From the root plantlanta directory in a console window
  ```
  npm i -g @aws-amplify/cli
  amplify configure
    Specify the AWS Reong
    ? region: us-east-2
    Specify the username of the new IAM user:
    ? user name: <Your Username> (Don’t Create a new user if you already have one, just cancel the creation)
    Enter the access key of the newly created user: (Gotten in IAM in your user’s security credentials)
    ? accessKeyId: AKIA4O4GYT**********
    ? secretAccessKey: ;tQFRYkTkX5o4e7hnswu***************
    ? Profile Name: default
  amplify init
    ? Do you want to use an existing environment? Yes
    ? Choose the environment you would like to use: test
  ```

Install modules
  From the root plantlanta directory in a console window
  ``` npm install ```

Develop and run code
  You are now ready to develop and run the code. Use the command:
  ```npm start```

### Local Deploy Only
If you only want to run the code on your local machine and do not care about writing and developing the code.
Pre-requisites
  git (see https://git-scm.com/downloads)
  node --version (see https://nodejs.org/en/download/)
  v10.16.3
  npm --version (see https://www.npmjs.com/get-npm)
  6.9.0

Clone repository to local machine
  Log into AWS account (either with the Plantlanta main account, or with a user)
  ** INSERT IMAGE **
  You will be brought to the main console screen.
  From here go to CodeCommit under the services tab.
  You will see the PlantlantaApp Repository. From which you will be able to clone onto your machine using git.
  ** INSERT IMAGE **

AWS Amplify Installed and Configured
  From the root plantlanta directory in a console window
  ```
  npm i -g @aws-amplify/cli
  amplify configure
    Specify the AWS Reong
    ? region: us-east-2
    Specify the username of the new IAM user:
    ? user name: <Your Username> (Don’t Create a new user if you already have one, just cancel the creation)
    Enter the access key of the newly created user: (Gotten in IAM in your user’s security credentials)
    ? accessKeyId: AKIA4O4GYT**********
    ? secretAccessKey: ;tQFRYkTkX5o4e7hnswu***************
    ? Profile Name: default
  amplify init
    ? Do you want to use an existing environment? Yes
    ? Choose the environment you would like to use: test
  ```

Install modules
  From the root plantlanta directory in a console window
  ``` npm install ```

Develop and run code
  You are now ready to develop and run the code. Use the command:
  ```npm start```

### Upload to the App Store and Google Play Store
App Store: https://developer.apple.com/ios/submit/
Google Play Store: https://facebook.github.io/react-native/docs/signed-apk-android

### Troubleshooting
Error: Unauthorized graphQL request
```
Object {
  "data": Object {},
  "errors": Array [
    [GraphQLError: Request failed with status code 401],
  ],
}
```

Solution:
  The API Key might need to be updated:
  Go to the AWS Console → AWS AppSync → Click on app → Settings → API Details
  Get the API Key, and update the API key in aws-exports.js to the new one

  If it is still not working, or if your API key is up to date, do the following:
  Make sure amplify is up to date and configured correctly
  From the plantlanta directory in a console window

  ```
  npm i -g @aws-amplify/cli
  amplify configure
    Specify the AWS Reong
    ? region: us-east-2
    Specify the username of the new IAM user:
    ? user name: <Your Username> (Don’t Create a new user if you already have one, just cancel the creation)
    Enter the access key of the newly created user: (Gotten in IAM in your user’s security credentials)
    ? accessKeyId: AKIA4O4GYT**********
    ? secretAccessKey: ;tQFRYkTkX5o4e7hnswu***************
    ? Profile Name: default
  amplify init
    ? Do you want to use an existing environment? Yes
    ? Choose the environment you would like to use: test
  ```
 
Error: GraphQL schema files are not up to date. Occurs when making updates or creating new app data such as events, users, rewards, etc. 
```
"message": "The variables input contains a field name 'eventHistory' that is not defined for input object type 'UpdateUserInput'"
```

Solution:
  If this error or one of a similar structure comes up, you need to make sure you have the latest git code by doing   the following:
  ```
  git checkout master
  git pull
  ```
  If it is still not working, you may have changes in the graphql schema that are not pushed. Run the following:
  ```
  amplify push
      yes
      yes
  ```

Error: After running 'amplify push'
```
Resource is not in the state stackUpdateComplete
```

Solution:
  Reconfigure amplify. From the root plantlanta directory in a console window
  ```
  amplify configure
    Specify the AWS Reong
    ? region: us-east-2
    Specify the username of the new IAM user:
    ? user name: <Your Username> (Don’t Create a new user if you already have one, just cancel the creation)
    Enter the access key of the newly created user: (Gotten in IAM in your user’s security credentials)
    ? accessKeyId: AKIA4O4GYT**********
    ? secretAccessKey: ;tQFRYkTkX5o4e7hnswu***************
    ? Profile Name: default
  amplify init
    ? Do you want to use an existing environment? Yes
    ? Choose the environment you would like to use: test
  ```

Error: As soon as you run the app
```
Invariant Violation: Element type is invalid: expected à string (for built-in components) or …

Check the render method of 'CustomDrawerContent'.
```

Solution:
  Delete node modules and reinstall. From root of plantlanta directory
  ```
  rm -rf node_modules
  npm install
  ```
  
  
General solution to errors:
  If an error is not found here, some general steps can be taken that might work
  
  Pull the latest master code from GitHub
  ```
  git fetch
  git branch master
  git pull
  ```
  
  delete local node_modules folder and do reinstall npm modules
  from root project directory
  ```
  rm -rf node_modules
  npm install
  ```
 
  Reinitialize amplify
  ```
  amplify init
	  ? Do you want to use an existing environment? Yes
	  ? Choose the environment you would like to use: test
  ```
  If these do not work, try the steps shown above to update and reconfigure amplify

## Release Notes
This is the first release of our application. In this section, we will describe completed software features that we promised early in the semester, also address some known bugs and defects that we are missing in this release.

### Completed software features for this release
Multi-type account creation: the app supports 3 account types; staff, admin, and volunteer. 
User creation and management: sign in, sign up, and password resetting. We used AWS Cognito to securely manage and synchronize app data across mobile devices. Users will be required email authentication once they create a new account.
Volunteer Event Creation: create, delete, and edit events 
Event Signup System: look for events, able to see the description of the event, sign up for the event, and check-in/check-out system.
Reward System: exchange points for rewards, lookup for rewards, see available rewards, and redeem them after exchanging. 
Reward Creation: staff accounts will be able to add, edit, and delete rewards in marketplace 
Account detail information: users will be able to see how many points they have, lists of purchased rewards and past events.
### Known bugs or defects
Images uploading: we were having some difficulties when implementing this feature. 
Refer to our implementation schedule below, we have completed all features from the in-scope section. However, features from stretch goals and future goals remain incomplete.

*** ADD IMAGE ***

