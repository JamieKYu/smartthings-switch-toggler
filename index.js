const dotenv = require('dotenv').config();
const express = require('express');
const axios = require('axios').default;

const port = 8888;
const apiUrl = 'https://api.smartthings.com/v1/';
const smartthingsToken = process.env.SMARTTHINGS_PAT_TOKEN;
const smartthingsDeviceID = process.env.SMARTTHINGS_DEVICE_ID;
const isDevelopment = (process.env.NODE_ENV === 'production') ? false : true;
const requestHeaders = {
  headers: {'Authorization': 'Bearer ' + smartthingsToken}
};

var app = express();

app.get("/", (req, res, next) => {
  res.status(200).send('OK')
});

app.get("/toggleSwitch", (req, res, next) => {
  let deviceID = smartthingsDeviceID;

  getSwitchState(deviceID)
  .then((result) => {
    return toggleSwitch(deviceID, result);
  })
  .then((result) => {
    res.status(200).send('OK')
  })
  .catch(e => {
    let error = handleRequestError(e);
    next(error);
  });
});

app.get("/testError", (req, res, next) => {
  throw new Error("Testing Error!");
});

app.use(express.static('public'))

app.use((req, res, next) => {
  const error = new Error("Path Not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500).send({
      error: {
        status: error.status || 500,
        message: error.message || 'Internal Server Error',
      },
    });
  });

app.listen(port, () => {
  console.log("Server app running at http://localhost:" + port);
 });

async function getSwitchState(deviceID) {
  var response = null;

  response = await axios.get(apiUrl + 'devices/' + deviceID + '/states', requestHeaders);

  if (isDevelopment) logResponse(response);
  return (response.data.main.switch.value.toLowerCase() === 'on') ? true : false;
}

async function toggleSwitch(deviceID, currentState) {
  var response = null;

  const switchRequest = {
    commands: [
      {
        component: 'main',
        capability: 'switch',
        command: (currentState === false) ? 'on' : 'off',
        arguments: []
      }
    ]
  };

  response = await axios.post(apiUrl + 'devices/' + deviceID + '/commands', switchRequest, requestHeaders);

  if (isDevelopment) logResponse(response);
  return response;
}

function handleRequestError(e) {
  if (isDevelopment) logResponse(e.response);

  let error = {};
  if (e.response) {
    error.status = e.response.status;
    error.message = e.response.statusText;
  } else if (e.request) {
    error.status = 500;
    error.message = 'Client never received a response or request never left for ' + e.request;
  } else {
    error.status = 500;
    error.message = 'Unknown error occured when sending request';
  }

  return error;
}

async function logResponse(response) {
  console.log('++++++++++++++++++++');
  console.log(response.request);
  console.log(response.config);
  console.log('++++++++++++++++++++');
  console.log('--------------------');
  console.log(response.status);
  console.log(response.statusText);
  console.log(response.data);
  console.log('--------------------');
}
