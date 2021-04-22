// Global Variables 

// Base URL and API Key

const BASE_URL = 'http://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = '&appid=447b4382090f346c4053684f424d0824&units=imperial';
const newZip = document.getElementById('zip').value;

// Create a new date instance dynamically with JS

let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDay()+'.'+ d.getYear();

// Create an event listener for the element with the id: generate, with a callback function to execute when it is clicked. 
// Event Listener that adds function - click is the event listener, performAction is the callback

const click = document.getElementById('generate')
click.addEventListener('click', performAction);
// Confirmed Good ^^

// Function that will be called by the event listener
// Inside that callback function call your async GET request with the parameters: 
/*
- base url
- user entered zip code (see input in html with id zip)
- personal API key
*/

function performAction(e) {
  const newZipcode = document.getElementById('zip').value;
  const feel = document.getElementById('feelings').value;
  console.log(newDate);
  getData(BASE_URL, newZipcode, apiKey)
  .then(function (data){
      postData('http://localhost:8000/addInput', {temperature: data.main.temp, date: newDate, user_response: feel } )
      .then(function() {
          update()
      })
  })
}

// Write an async function in app.js that uses fetch() to make a GET request to the OpenWeatherMap API.

const getData = async (BASE_URL, newZip, apiKey)=>{
  const response = await fetch(BASE_URL + newZip + apiKey)
  try {
    const data = await response.json();
    console.log(data);
    return data;
  } catch(error) {
    console.log("error", error);
  }
  }

  // You will need to write another async function to make this POST request.
  // The function should receive a path and a data object.
  // The data object should include:
  /*
- temperature
- date
- user response
  */
  // Remember, you can access the value of DOM elements by selecting them in your JS code.

  const postData = async (url = '', data = {}) => {
    const postRequest = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    try {
        console.log('x');
        const newData = await postRequest.json();
        console.log(newData, 'x');
        return newData;
    }
    catch (error) {
        console.log('Error', error);
    }
}

// Finally, chain another Promise that updates the UI dynamically Write another async function that is called after the completed POST request. This function should retrieve data from our app, select the necessary elements on the DOM (index.html), and then update their necessary values to reflect the dynamic values for:
/*
- Temperature
- Date
- User input
*/

async function update() {
  const request = await fetch('http://localhost:8000/post');
  try {
    const allData = await request.json();
    document.getElementById('date').innerHTML = allData.date;
    document.getElementById('temp').innerHTML = allData.temperature;
    document.getElementById('content').innerHTML = allData.userResponse;
  }
  catch (error) {
    console.log('error', error);
  }
}