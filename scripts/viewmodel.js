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
            
        };   
        var removeBookmarks = ko.observable(false);        
        var addBookmark = function(index) {
            chrome.bookmarks.create({title:index.title,url:index.url});            
            index.path('Other bookmarks');
                     return true;
        }        
        return {
            tabs:tabs,
            removeBookmarks:removeBookmarks,
            tabGlimpse:tabGlimpse,
            addBookmark:addBookmark            
        }
    })();
    ko.applyBindings(vm);
}