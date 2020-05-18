$(document).ready(function () {
  /* Dictionary with the amenities, states, cities checked id: name */
  const amenitiesCheck = {};
  const statesCheck = {};
  const citiesCheck = {};

  $('input:checkbox').on('click', function () {
    /* verify if the box clicked was checked or not (is checked) */
    if ($(this).is(':checked')) {
      switch ($(this).attr('data-class')) {
        case 'state':
          /* add the checked city to the dictionary */
          statesCheck[$(this).attr('data-id')] = $(this).attr('data-name');
          break;
        case 'city':
          /* add the checked city to the dictionary */
          citiesCheck[$(this).attr('data-id')] = $(this).attr('data-name');
          break;
        case 'amenity':
          /* add the checked amenity to the dictionary */
          amenitiesCheck[$(this).attr('data-id')] = $(this).attr('data-name');
          break;
      }
    } else {
      switch ($(this).attr('data-class')) {
        case 'state':
          /* deletes the state from dictionary */
          delete statesCheck[$(this).attr('data-id')];
          break;
        case 'city':
          /* deletes the city from dictionary */
          delete citiesCheck[$(this).attr('data-id')];
          break;
        case 'amenity':
          /* deletes the amenity from dictionary */
          delete amenitiesCheck[$(this).attr('data-id')];
          break;
      }
    }
    /* call the function that print the amenities, states, cities checked */
    printAmenities();
    printStatesCities();
  });

  function printAmenities () {
    /* separator */
    let comma = '';
    /* clean the html content in amenities box */
    $('#amenitiesBox').html('');
    /* runs the dictionary */
    for (const key in amenitiesCheck) {
      /* print each amenity in the aminities box */
      $('#amenitiesBox').append(comma + amenitiesCheck[key]);
      /* separate by comma */
      comma = ', ';
    }
  }
  function printStatesCities () {
    /* separator */
    let comma = '';
    /* clean the html content in amenities box */
    $('#statescitiesBox').html('');
    /* runs the dictionary */
    for (const key in statesCheck) {
      /* print each amenity in the states box */
      $('#statescitiesBox').append(comma + statesCheck[key]);
      /* separate by comma */
      comma = ', ';
    }
    /* runs the dictionary */
    for (const key in citiesCheck) {
      /* print each amenity in the cities box */
      $('#statescitiesBox').append(comma + citiesCheck[key]);
      /* separate by comma */
      comma = ', ';
    }
  }
  /* status API */
  $.ajax({
    type: 'GET',
    url: 'http://0.0.0.0:5001/api/v1/status/',
    success: function (outmsg) {
      /* change the color staus to avaliable */
      $('#api_status').addClass('available');
    },
    error: function () {
      /* change the color staus to avaliable */
      $('#api_status').removeClass('available');
    }
  });
  function getPlaces (data = {}) {
    $.ajax({
      type: 'POST',
      contentType: 'application/json',
      url: 'http://0.0.0.0:5001/api/v1/places_search',
      data: JSON.stringify(data),
      success: function (outdata) {
        /* clean the content in places */
        $('.places').html('');
        /* append each place in places class */
        outdata.forEach(element => {
          $('.places').append(
            '<article>' +
              '<div class="title_box">' +
                '<h2>' + element.name + '</h2>' +
                '<div class="price_by_night">' + element.price_by_night + '</div>' +
              '</div>' +
              '<div class="information">' +
                '<div class="max_guest">' + element.max_guest + '</div>' +
                '<div class="number_rooms">' + element.number_rooms + '</div>' +
                '<div class="number_bathrooms">' + element.number_bathrooms + '</div>' +
              '</div>' +
              '<div class="user">' +
                '<b>Owner:</b>' + ' ' + element.user_id.first_name + ' ' + element.user_id.last_name +
              '</div>' +
              '<div class="description">' +
                element.description +
              '</div>' +
            '</article>'
          );
        });
      }
    });
  }
  /* event button (search) */
  $('.filters > button').on('click', function () {
    const data = {};
    /* data filters */
    data.amenities = Object.keys(amenitiesCheck);
    data.states = Object.keys(statesCheck);
    data.cities = Object.keys(citiesCheck);
    /* execute search request */
    getPlaces(data);
  });
  getPlaces();
});
