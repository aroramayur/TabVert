function createVM(tabObjects){
    var vm = (function() {
        var tabs = ko.observableArray(tabObjects);
        var tabGlimpse = function(index) {
           chrome.tabs.update(index.id,{active:true},function(tab) {
               console.log("switched to " + tab.url);
           });
        }
        
        return {
            tabs:tabs,
            tabGlimpse:tabGlimpse
        }
    })();
    ko.applyBindings(vm);
}