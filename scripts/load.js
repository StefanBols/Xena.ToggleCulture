
chrome.browserAction.onClicked.addListener(function (tab) { //Fired when User Clicks ICON
    if (tab.url.toLowerCase().indexOf('xena.biz') === -1 &&
        tab.url.toLowerCase().indexOf('localhost') === -1) {
        alert('You have to be on a Xena platform to use Toggle Culture!');
        return;
    }
    chrome.tabs.executeScript(tab.ib, {
        file: 'scripts/inject.js'
    });
});