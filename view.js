const DB_NAME = "bsc_mail";
const DB_VERSION = 1;
const DB_STORE_NAME = "emails";



$('form').submit(function(event) {
  event.preventDefault();
  console.log("Form submission prevented.");
  var signupEmail = $('.element').val();

  localforage.getItem('emails').then(function(value) {
      var emails = value || [];
      emails.push(signupEmail);
      console.log('value');
      return emails;
  }).catch(function(err) {
      // This code runs if there were any errors
      console.log('err');
  }).then(function(emails) {
    localforage.setItem('emails', emails).then(function (value) {
      $('.element').val('');
      $('.thankYouMessage').show(function() {
        $('.element').val('');
        signupEmail = "";
        $('.thankYouMessage').fadeOut(1500, function() {});
      });
        console.log(emails);
    }).catch(function(err) {
        // This code runs if there were any errors
        console.log(err);
    });
  });




});
