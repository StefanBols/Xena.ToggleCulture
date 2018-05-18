chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
    switch (request.method) {
        case 'ChangeCulture':
            changeCulture(request.data, sendResponse);
            break;
        case 'ReloadPage':
            reloadPage();
            break;
    }
});

var changeCulture = function(newCulture, sendResponse) {
    var token;
    try {
        var regex = /'Bearer[\s]+([A-z0-9\-]*)'/g;
        token = regex.exec(document.getElementsByTagName('HEAD')[0].innerHTML)[1];
    } catch(e) {}

    if (!token) {
        showError('You have to be logged in ;-)');
    }

    $.ajax({
        method: 'GET',
        url: '/Api/Home/Profile',
        contentType: 'application/json',
        headers: { 'Authorization': 'Bearer ' + token }
    }).done(function(user) {
        $.ajax({
            method: 'PUT',
            url: '/Api/Home/Profile',
            data: JSON.stringify({ 'Name': user.Name, 'Country': user.Country, 'Culture': newCulture }),
            contentType: 'application/json',
            headers: { 'Authorization': 'Bearer ' + token }
        }).done(function(){
            reloadPage();
        }).fail(function(err) {
            showError('Some error occurred while attempting to change culture.', err);
        });
    }).fail(function(err) {
        showError('Some error occurred while fecthing user information.', err);
    });
}

var reloadPage = function() {
    window.location.href = '';
}

var showError = function(message, error) {
    if (message) alert(message);
    if (error) console.error(error);
}