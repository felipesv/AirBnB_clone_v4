$(document).ready(function () {
  /* Dictionary with the amenities checked id: name */
  const amenitiesCheck = {};

  $('.popover > ul > li > input:checkbox').on('click', function () {
    /* verify if the box clicked was checked or not (is checked) */
    if ($(this).is(':checked')) {
      /* add the checked amenity to the dictionary */
      amenitiesCheck[$(this).attr('data-id')] = $(this).attr('data-name');
    } else {
      /* deletes the amenity from dictionary */
      delete amenitiesCheck[$(this).attr('data-id')];
    }
    /* call the function that print the amenities checked */
    printAmenities();
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
  /* status API */
  $.ajax({
    type: 'GET',
    url: 'http://0.0.0.0:5001/api/v1/status/',
    success: function (outmsg) {
      /* change the color staus to avaliable */
      $('#api_status').addClass('available');
    },
    error: function (error) {
      /* change the color staus to avaliable */
      $('#api_status').removeClass('available');
    }
  });
  function getPlaces (data={}) {
    $.ajax({
      type: 'POST',
      contentType: 'application/json',
      url: 'http://0.0.0.0:5001/api/v1/places_search',
      data: JSON.stringify(data),
      success: function (outdata) {
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
          )
        });
      }
    });
  }
  getPlaces();
});
