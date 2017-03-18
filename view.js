document.onkeydown=function() {
    if(window.event.keyCode=='13'){
      $('form').submit();
    }
};

$('#saveForm').click(function(event) {
  $('form').submit();
});

$('form').submit(function(event) {
  event.preventDefault();
  var signupEmail = $('.email_entry').val();
  let handler = new FormSubmissionHandler(signupEmail);
  handler.handleSubmit();
});

$('#delete_emails').click(function(event) {
  localforage.removeItem('emails');
  $('.show_emails').fadeOut(1500, function() {});
});

class FormSubmissionHandler {
  constructor(signupEmail) {
    this.signupEmail = signupEmail;
    this.password = "showmetheemails";
    this.dbName = "emails";
  }

  handleSubmit() {
    var that = this;
    $('.show_emails').fadeOut(1500, function() {});
    console.log('submit handled!');
    if (that.signupEmail === that.password) {
      that.showEmails(that);
    } else {
      console.log('about to save the email, sir!');
      that.saveEmail(that);
    }
  }

  showEmails(that) {
    localforage.getItem(that.dbName).then(function(value) {
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
      $('.email_list').html(emails.join());
      $('.show_emails').fadeIn(1500, function() {});
      $('#delete_emails').fadeIn(1500, function() {});
      $('.element').val('');
    });
  }

  saveEmail(that) {
    console.log('start of email save!');
    localforage.getItem(that.dbName).then(function(value) {
      console.log("I got mah item!");
        var emails = value || [];
        if (that.signupEmail !== "") { emails.push(that.signupEmail); }
        console.log("Found teh emails");
        return emails;
    }).catch(function(err) {
        // This code runs if there were any errors
        console.log(err);
    }).then(function(emails) {
      console.log(emails);
      localforage.setItem(that.dbName, emails).then(function (value) {
        console.log(emails);
        $('.element').val('');
        $('.thankYouMessage').show(function() {
          $('.element').val('');
          $('.thankYouMessage').fadeOut(1500, function() {});
        });
      }).catch(function(err) {
          // This code runs if there were any errors
          console.log(err);
      });
    });
  }

}
