'use strict';

let dateCounter = 0;

const apiKey = "zvU1EvdUp6guk0I0PMIqZ5jysg6viR7CarxExhh1"


const searchURL = 'https://api.nasa.gov/planetary/earth/imagery';


function watchAddButton() {
    $('.addButton').on('click', event => {
        event.preventDefault();
        addDateInput();
    })
}

function watchForm() {
    $('.submitButton').on('click', event => {
      event.preventDefault();
  
      //Location search parameters
      //const searchCity = $('#js-search-city').val();
      const searchLat = $('#js-search-lat').val();
      const searchLong = $('#js-search-long').val();
  
      //eitherCityOrLatLong(searchCity, searchLat, searchLong);
      getImages(searchLat, searchLong);
      resetDateInputs();
    });
}

function aboutClick() {
    $('.about').on('click', event => {
        event.preventDefault();

        aboutScreenPopUp();
    })
}

function okayClick() {
    $('.menuPopUp').on('click', "menuScreen.okayButton",  event => {
        event.preventDefault();

        clearScreenPopUp();
        console.log('okayButton executed');
    });
}

function addDateInput() {
    dateCounter++;

    $('.dateInputArea').append(
       ` <label for="max-results">Dates of imagery</label>`+
        `<input type="date" name="date" value="2014-06-20" id="date` + dateCounter + `" required>`
    );
}

function resetDateInputs() {
    dateCounter = 0;
    console.log(dateCounter);

    $('.dateInputArea').empty();

    $('.dateInputArea').append(
        ` <label for="max-results">Dates of imagery</label>`+
         `<input type="date" name="date" value="2014-06-20" id="date` + dateCounter + `" required>`
     );
}


function getDateParams() {
    let dateParams = {};
    let searchDate = 0;

    for (let i=0; i <=dateCounter; i++) {
        searchDate = $('#date'+i).val();
        console.log(searchDate);

        dateParams[i] = searchDate;
    }

    console.log(dateParams);

    return dateParams;
}

function getImages(lat, long) {
    const locationParam= {
      lat: lat,
      lon: long,
    };

    //need to make a for Loop for if there is more than one image

    let dateParams = getDateParams();
    $('#results-list').empty();

    for (let i=0; i <=dateCounter; i++) {
        
        //i need to create an object with keys lat, long, date
        let paramObject = JSON.parse(JSON.stringify(locationParam));

        console.log(paramObject);

        paramObject.date = String(dateParams[i]);

        console.log(paramObject);

        //formatting the query
        const queryString = formatQueryParams(paramObject);
        const url = searchURL + '?' + queryString + '&api_key=' + apiKey;
    
        console.log(url);

        //make the call to get the image
        fetchImage(url);
    }

  }

function formatQueryParams(params) {

    //this is where I will create the string needed for the url search

  const paramQuery = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)

  return paramQuery.join('&');
  
}

function fetchImage(url) {
    //making the actual API call
    fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error(response.statusText);
      })
      .then(responseJson => displayResults(responseJson))
      .catch(err => {
        $('#js-error-message').text(`Something went wrong: ${err.message}`);
      });
}

function displayResults(responseJson) {
  // if there are previous results, remove them
  console.log(responseJson);

  //create html text to display the image
    $('#results-list').append(
      `<li><img src="${responseJson.url}" alt="Satellite image from + ${responseJson.date}" >` + 
      `<p>Image Date: ${responseJson.date}</p>` + 
      `<a href="">Download Image</a>`
      `</li>`
    )
  $('#results').removeClass('hidden');
}

function aboutScreenPopUp() {
    $('.menuPopUp').removeClass('hidden');

    $('.menuPopUp').append(
        `<div class="menuScreen">` + 
            `<h1>About</h1>` + 
            `<p>This is where I will put detailed instructions on the purpose of this page and how to use it</p>` +
            `<button type="submit" class="okayButton">Okay</button>` + 
        `</div>`
    );
}

function clearScreenPopUp() {
    $('.menuPopUp').empty();

    $('.menuPopUp').addClass('hidden');
}

function runPage() {
    watchForm();
    watchAddButton();
    aboutClick();
    okayClick();
}

$(runPage);