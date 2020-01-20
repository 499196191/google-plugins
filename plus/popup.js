    $(function () {
        $("#copy").click(function () {
            chrome.storage.local.get({exampleInputEmail1: '', age: 18}, function(items) {
                // alert('exampleInputEmail1='+items.exampleInputEmail1);
                console.log(items.exampleInputEmail1, items.age);
                var valMail = items.exampleInputEmail1;
                getCurrentTabId((tabId) => {
                    var port = chrome.tabs.connect(tabId, {name: 'test-copy'});
                    port.postMessage({paste: valMail});
                });

            });

        });


        $("#paste").click(function () {
            
            chrome.storage.local.get({exampleInputEmail1: '', age: 18}, function(items) {
                console.log(items.exampleInputEmail1, items.age);
                var valMail = items.exampleInputEmail1;
                getCurrentTabId((tabId) => {
                    var port = chrome.tabs.connect(tabId, {name: 'test-paste'});
                    port.postMessage({paste: valMail});
                });

            });

        });

    });


// 获取当前选项卡ID
function getCurrentTabId(callback)
{
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs)
    {
        if(callback) callback(tabs.length ? tabs[0].id: null);
    });
}
