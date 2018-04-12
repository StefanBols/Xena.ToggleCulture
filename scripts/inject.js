chrome.storage.sync.get(function (items) {
    var cultureOne = items.cultureOne || 'da';
    var cultureTwo = items.cultureTwo || 'en';

    var token;
    try {
        var regex = /'Bearer[\s]+([A-z0-9\-]*)'/g;
        token = regex.exec(document.getElementsByTagName('HEAD')[0].innerHTML)[1];
    } catch(e) {}

    if (!token) {
        alert('You have to be logged in ;-)');
    }

    $.ajax({
        method: 'GET',
        url: '/Api/Home/Profile',
        contentType: 'application/json',
        headers: { 'Authorization': 'Bearer ' + token }
    }).done(function(user) {
        var newCulture = cultureOne;
        if ('da-dk'.indexOf(user.Culture.toLowerCase()) !== -1) newCulture = cultureTwo;

        $.ajax({
            method: 'PUT',
            url: '/Api/Home/Profile',
            data: JSON.stringify({ 'Name': user.Name, 'Country': user.Country, 'Culture': newCulture }),
            contentType: 'application/json',
            headers: { 'Authorization': 'Bearer ' + token }
        }).done(function(){
            document.location.href = '';
        });
    });
});