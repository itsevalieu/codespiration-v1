// ====================
// Modal Initialization
// ====================
$(document).ready(function(){
    // the "href" attribute of .modal-trigger must specify the modal ID that wants to be triggered
    $('.modal').modal();
  });

// ====================
// Chips - Modal Tags - http://materializecss.com/chips.html
// ====================
  $('.chips').material_chip();
  $('.chips-initial').material_chip({
    data: [{
      tag: 'Hello World',
    }, {
      tag: 'HTML',
    }, {
      tag: 'CSS',
    }],
  });
  $('.chips-placeholder').material_chip({
    placeholder: 'Technologies',
    secondaryPlaceholder: 'Technologies',
  });
  $('.chips-autocomplete').material_chip({
    autocompleteData: {
      'Apple': null,
      'Microsoft': null,
      'Google': null
    }
  });

  $('.chips').on('chip.add', function(e, chip){
    // you have the added chip here
  });

  $('.chips').on('chip.delete', function(e, chip){
    // you have the deleted chip here
  });

  $('.chips').on('chip.select', function(e, chip){
    // you have the selected chip here
  });


// ====================
// Datepicker - Ref. Materialize Forms
// ====================
  $('.datepicker').pickadate({
    selectMonths: true, // Creates a dropdown to control month
    selectYears: 15 // Creates a dropdown of 15 years to control year
  });

// ====================
// SideNav - http://materializecss.com/side-nav.html
// ====================
  // Initialize collapse button
  $(".button-collapse").sideNav();
  // Initialize collapsible (uncomment the line below if you use the dropdown variation)
  //$('.collapsible').collapsible();