window.addEventListener("load",function(){
    chrome.tabs.query({},function(tabs){
        createTabs(tabs);
    })
});

function createTabs(tabs){
    var tabObjects = [];
    tabs.forEach(function(tab){
        var tabObj = new Tab(tab.title,tab.url,tab.favIconUrl,tab.id,tab.windowId);
        tabObjects.push(tabObj);        
    });
    createVM(tabObjects);
}