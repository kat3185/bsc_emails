

$('form').submit(function(event) {
  event.preventDefault();
  console.log("Form submission prevented.");

  //save form information ->
    //flash thank you message ->
    //clear form and message
    $('.element').val('');
    $('.thankYouMessage').show(function() {
      $('.thankYouMessage').fadeOut(1500, function() {

      });
    });
});
