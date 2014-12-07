window.addEventListener("load",function(){
    var bookmarks = [];
    chrome.bookmarks.getTree(function(tree){  
        createBookmarks(bookmarks,tree);
    });    
    chrome.tabs.query({},function(tabs){
        createTabs(tabs,bookmarks);
    });
});

function createTabs(tabs,arr){
var urls = arr.map(function(bookmark){
    return bookmark.url;
});
    var tabObjects = [];
    var promises = [];
    
    tabs.forEach(function(tab){
        var index = 0;
        while(index <= arr.length - 1 && arr[index].url !== tab.url)
        {
            index++;
        }
        if(index === arr.length) {
            var tabObj = new Tab(tab.title,tab.url,tab.favIconUrl,tab.id,tab.windowId,false,'Bookmark');
        tabObjects.push(tabObj);        
                    
        }
        else {
            var path = new Array();         
            promises.push(new Promise(function(resolve,reject){
                fetchPath(arr[index].parentId,path,resolve);
            }).then(
                function() {
                    var tabObj = new Tab(tab.title,tab.url,tab.favIconUrl,tab.id,tab.windowId,true,path.reverse().join(' > ').replace('>',''));
                    tabObjects.push(tabObj);        
                    
                }
                
            )
                         );
                  
    }
   
    
});
     Promise.all(promises).then(function(){
        tabObjects.sort(function(a,b){
            return a.id - b.id;
        });
        createVM(tabObjects);
    });
}
                 
                 

function createBookmarks(arr,node) {
    if(!(node instanceof Array) && !node.children){
        arr.push({url:node.url,id:node.id,parentId:node.parentId});
    }
    else if( node instanceof Array ) {
        node.forEach(function(n){
            createBookmarks(arr,n);
        });
        
    }
    else {
        createBookmarks(arr,node.children);
    }
  
}

function fetchPath(id,path,resolve){    
chrome.bookmarks.getSubTree(id,function(subtree){
    path.push(subtree[0].title);
    if(subtree[0].hasOwnProperty('parentId')) {
       fetchPath(subtree[0].parentId,path,resolve);
    }  
    else {
        resolve(path);
    }
});  
    
}


