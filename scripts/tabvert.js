window.addEventListener("load",function(){
    chrome.tabs.query({currentWindow:true},function(tabs){
        createTabs(tabs);
    })
});

function createTabs(tabs){
    var tabObjects = [];
    tabs.forEach(function(tab){
        var tabObj = new Tab(tab.title,tab.url,tab.favIconUrl,tab.id);
        tabObjects.push(tabObj);        
    });
    createVM(tabObjects);
}