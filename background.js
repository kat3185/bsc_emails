chrome.app.runtime.onLaunched.addListener(function() {
  chrome.app.window.create('form.html', {
    'outerBounds': {
      'width': 800,
      'height': 600
    }
  });
});
