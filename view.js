const DB_NAME = "bsc_mail";
const DB_VERSION = 1;
const DB_STORE_NAME = "emails";

document.onkeydown=function() {
    if(window.event.keyCode=='13'){
      if ($('.password_attempt').is(':focus')){
        $('#show_emails').click();
      } else {
        $('form').submit();
      }
    }
};


$('form').submit(function(event) {
  event.preventDefault();
  console.log("Form submission prevented.");
  var signupEmail = $('.email_entry').val();

  localforage.getItem('emails').then(function(value) {
      var emails = value || [];
      emails.push(signupEmail);
      return emails;
  }).catch(function(err) {
      // This code runs if there were any errors
      console.log(err);
  }).then(function(emails) {
    localforage.setItem('emails', emails).then(function (value) {
      $('.element').val('');
      $('.thankYouMessage').show(function() {
        $('.element').val('');
        signupEmail = "";
        $('.thankYouMessage').fadeOut(1500, function() {});
      });
    }).catch(function(err) {
        // This code runs if there were any errors
        console.log(err);
    });
  });
});

$('#show_emails').click(function(event) {
  var password = "showmetheemails";
  var passwordAttempt = $('.password_attempt').val();
  if (password === passwordAttempt) {
    localforage.getItem('emails').then(function(value) {
        var emails = value || [];
        if (emails.length === 0) {
          emails.push("No Emails Present");
        }
        return emails;
    }).catch(function(err) {
        var emails = [];
        if (emails.length === 0) {
          emails.push("No Emails Present");
        }
        console.log(err);
        return emails;
    })

    .then(function(emails) {
      $('.email_list').html(emails.join()).fadeIn(1500, function() {});
      $('#delete_emails').fadeIn(1500, function() {});
      $('.password_attempt').val('');
    });
  } else {
    $('.email_list').html('That password was incorrect.  You bad.').fadeIn(1500, function() {}).fadeOut(3000, function() {});
    $('#delete_emails').fadeOut(1500, function() {});
    $('.password_attempt').val('');
  }
});

$('#delete_emails').click(function(event) {
  localforage.removeItem('emails');
  $('.email_list').fadeOut(1500, function() {});
  $('#delete_emails').fadeOut(1500, function() {});
});
