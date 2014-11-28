function createVM(tabObjects){
    var vm = (function() {
        var tabs = ko.observableArray(tabObjects);
        var tabGlimpse = function(index) {
           chrome.tabs.update(index.id,{active:true},function(tab) {
               console.log("switched to " + tab);
           });
            
        }
        var drawBookmark = function(index){            
            var node = document.getElementById("img"+index.id);           
            var element = document.createElement("canvas");
            node.parentNode.appendChild(element);
            element.height = 25;
            element.width=15; 
            element.style.marginLeft = "5px";
            var canvasId = index.id.toString().concat("_bookmark") ;
            element.setAttribute("id",canvasId);
            console.log(element);
            var context = element.getContext("2d");
            context.beginPath();
            context.moveTo(0,0);
            context.rect(0,0,20,20);            
            context.fillStyle = "rgb(255,215,0)";
            context.fill();
            context.strokeStyle = "brown";
            context.stroke();
            context.closePath();
            context.beginPath();
            context.moveTo(0,25);
            context.lineTo(7.5,12.5);
            context.lineTo(15,25);
            context.fillStyle = "white";
            context.fill();
            context.stroke();
            };
        
        return {
            tabs:tabs,
            tabGlimpse:tabGlimpse,
            drawBookmark:drawBookmark
        }
    })();
    ko.applyBindings(vm);
}