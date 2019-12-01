# PlantlantaApp

App description

## Dev Requirements

Make sure you have the correct npm and node versions

```bash
node --version
v10.16.3
npm --version
6.9.0
```

Install amplify and configure and initialize it to create local files such as aws-exports.js

```bash
npm i -g @aws-amplify/cli
```

```bash
amplify configure
Specify the AWS Region
? region:  us-east-2Specify the username of the new IAM user:
? user name:  <YourUsername> (Dont Create a new user if you already have one, just cancel the creation)
Enter the access key of the newly created user: (Gotten in IAM in your user\'s security credentials)
? accessKeyId:  AKIA4O4GYT**********
? secretAccessKey:  ltQFRYkTkX5o4e7hnswu********************
This would update/create the AWS Profile in your local machine
? Profile Name:  default
```

```bash
amplify init
```

Install packages with npm from package.json

```bash
npm i
```

## Usage

Run start command to start expo client

```python
npm run start
```
