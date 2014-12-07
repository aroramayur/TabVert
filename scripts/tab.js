

function Tab(title,url,faviconUrl,id,windowId,isBookmarked,path) {
    this.title = title;
    this.url = url;
    this.faviconUrl = faviconUrl;
    this.id = id;
    this.windowId = windowId;    
    this.isBookmarked = ko.observable(isBookmarked);
    this.path = ko.observable(path);
}

