chrome.runtime.onMessage.addListener(function(request, sender) {
    if (request.action == "getSource") {
        message.innerText = request.source;
        if (localStorage.getItem("save_to_storage") === null) {
            storage.setItem("save_to_storage", message.innerText);
        } else {
            function appendToStorage(name, data) {
                var old = localStorage.getItem(name);
                if (old === null) old = "";
                localStorage.setItem(name, old + data);
            }

            appendToStorage('save_to_storage', message.innerText);
        }
        message.innerText = storage.getItem(save_to_storage);
    }
});

function onWindowLoad() {

    var message = document.querySelector('#message');

    chrome.tabs.executeScript(null, {
        file: "background.js"
    }, function() {
        // If you try and inject into an extensions page or the webstore/NTP you'll get an error
        if (chrome.runtime.lastError) {
            message.innerText = 'There was an error injecting script : \n' + chrome.runtime.lastError.message;
        }
    });

}

window.onload = onWindowLoad;