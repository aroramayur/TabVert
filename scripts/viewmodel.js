function createVM(tabObjects){
    var vm = (function() {
        var tabs = ko.observableArray(tabObjects);
        var tabGlimpse = function(index) {   
             chrome.tabs.update(index.id,{active:true},function(tab){
                console.log("switched to tab " + index.id);
            });
            chrome.windows.update(index.windowId,{focused:true},function(window) {
            console.log("Window Id : " + window.id + " focused");                
           });                        
        }        
        return {
            tabs:tabs,
            tabGlimpse:tabGlimpse
        }
    })();
    ko.applyBindings(vm);
}