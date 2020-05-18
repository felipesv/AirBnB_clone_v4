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
      $('#api_status').addclass('available');
    },
    error: function (error) {
      /* change the color staus to avaliable */
      $('#api_status').removeClass('available');
    }
  });
});
