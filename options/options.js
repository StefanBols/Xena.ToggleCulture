function save_options() {
    var cultureOne = document.getElementById('cultureOne').value;
    var cultureTwo = document.getElementById('cultureTwo').value;
    
    chrome.storage.sync.set({
        cultureOne: cultureOne,
        cultureTwo: cultureTwo
    }, function() {
      var status = document.getElementById('status');
      status.textContent = ' - Options saved.';
      setTimeout(function() {
        status.textContent = '';
      }, 750);
    });
  }
  
  function restore_options() {
    chrome.storage.sync.get({
        cultureOne: '',
        cultureTwo: ''
    }, function(items) {
      document.getElementById('cultureOne').value = items.cultureOne;
      document.getElementById('cultureTwo').value = items.cultureTwo;
    });
  }
  document.addEventListener('DOMContentLoaded', restore_options);
  document.getElementById('save').addEventListener('click', save_options);