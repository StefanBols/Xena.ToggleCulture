function init() {
    $('#toggleCultureList li').click(function() {
        var newCulture = $(this).data('value');      
        initiateChangeCulture(newCulture);
    });
}

var initiateChangeCulture = function(newCulture) {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { method: 'ChangeCulture', data: newCulture });
    });
}

document.addEventListener('DOMContentLoaded', init, false);