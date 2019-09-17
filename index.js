'use strict';

let dateCounter = 0;

const apiKey = "zvU1EvdUp6guk0I0PMIqZ5jysg6viR7CarxExhh1"


const searchURL = 'https://api.nasa.gov/planetary/earth/imagery';


function watchAddButton() {
    $('addButton').submit(event => {
        event.preventDefault();
        addDateInput();
    })
}

function watchForm() {
    $('form').submit(event => {
      event.preventDefault();
  
      //Location search parameters
      //const searchCity = $('#js-search-city').val();
      const searchLat = $('#js-search-lat').val();
      const searchLong = $('#js-search-long').val();
  
      //eitherCityOrLatLong(searchCity, searchLat, searchLong);
    });
    getImages();

//function eitherCityOrLatLong (city, lat, long) {
    //This function deciphers the input to determine which paramets to search by
    //putting this feature on pause until I'm ready to circle back to it
//}
}

function addDateInput() {
    //when the user hits the Add Date button
    //it creates another input type for date
    //also dateCounter++
}

function getDateParams() {
    let dateParams = {};
    let searchDate = 0;

    for (let i=0; i <=dateCounter; i++) {
        searchDate = $('date'+'i').val();

        dateParams.push({i: searchDate});
    }

    return dateParams;
}

function getImages(lat, long) {
    const locationParam= {
      lat: lat,
      long: long,
    };

    //need to make a for Loop for if there is more than one image

    let dateParams = getDateParams();
    $('#results-list').empty();

    for (let i=0; i <=dateCounter; i++) {
        let params = locationParem;

        params.push(dateParems[i])
        const queryString = formatQueryParams(params);
        const url = searchURL + '?' + queryString;
    
        console.log(url);

        //make the call to get the image
        fetchImage(url);
    }

  }

function formatQueryParams(params) {

    //this is where I will create the string needed for the url search

  const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)

  return queryItems.join('&');
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
      //`<li><h3><a href="${responseJson.articles[i].url}">${responseJson.articles[i].title}</a></h3>
      //<p>${responseJson.articles[i].source.name}</p>
      //<p>By ${responseJson.articles[i].author}</p>
      //<p>${responseJson.articles[i].description}</p>
      //<img src='${responseJson.articles[i].urlToImage}'>
      //</li>`
    
  //display the results section 
    )
  $('#results').removeClass('hidden');
}


$(watchForm);