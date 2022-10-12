
# smartthings-switch-toggler

A simple NodeJS web service that toggles a SmartThings switch on or off.


## Environment Variables

To run this project, you will need to get the following values from your SmartThings account:


`SMARTTHINGS_PAT_TOKEN` To get your SmartThings Personal Access Token (PAT), follow the instructions here - https://developer-preview.smartthings.com/docs/advanced/authorization-and-permissions#personal-access-tokens.

`SMARTTHINGS_DEVICE_ID` Log into your SmartThings account at https://graph.api.smartthings.com/, search for the switch you want to control and get the device id

## Run Locally

Clone the project

```bash
  git clone https://github.com/jamiekyu/smartthings-switch-toggler
```

Go to the project directory

```bash
  cd smartthings-switch-toggler
```

Install dependencies

```bash
  npm install
```

Create a .env file

```bash
  nano .env
```

Paste these two lines and replace the values with those from your SmartThings account.  Ctrl+X and 'Y' to Save and Exit.

```bash
  SMARTTHINGS_PAT_TOKEN=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
  SMARTTHINGS_DEVICE_ID=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
```

Start the server

```bash
  npm run start
```

Toggle the device on or off by making a GET request to the endpoint, either using CURL or web browser

```bash
  curl http://localhost:8888/toggleSwitch
```

## Docker build and deploy

To build the docker image for this project run

```bash
  docker build -t jamiekyu/smartthings-switch-toggler .
```

To deploy and run the docker container

```bash
  docker run -d -p8888:8888 -e SMARTTHINGS_PAT_TOKEN=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
  -e SMARTTHINGS_DEVICE_ID=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx jamiekyu/smartthings-switch-toggler
```

Alternatively, deploy and run using docker-compose YAML:

```bash
  version: "2"
  services:
    node:
      image: "jamiekyu/smartthings-switch-toggler"
      container_name: "smartthings-switch-toggler"
      environment:
        - "NODE_ENV=development"
        - "SMARTTHINGS_PAT_TOKEN=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
        - "SMARTTHINGS_DEVICE_ID=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
      ports:
        - "8888:8888"
```
