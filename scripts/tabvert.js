window.addEventListener("load",function(){
    chrome.tabs.query({},function(tabArray){
        showTabs(tabArray);
    })
});

function showTabs(tabs){
    console.log(tabs)
}