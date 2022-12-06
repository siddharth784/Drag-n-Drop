var draggedElement=null;
// const folder = document.querySelector(".dropbox .folder");
var items;


function handleDragStart(e) {
    draggedElement=this;
    e.dataTransfer.setData("text", e.target.id);
    e.dataTransfer.effectAllowed = "move";
}

function handleDragOver(e) {
    if(e.preventDefault)
    e.preventDefault();

    e.dataTransfer.dropEffect = "move";
    //folder emboss animation
    if(e.target.className == "dropzone" || e.target.className == "folder" || e.target.className=="label" || e.target.className=="count"){
        var folder = document.querySelector(".folder");
        folder.style.transform = "scale(1.05)";
        folder.style.transition = "all 0.3s ease-in-out";
    }
    return false;
}

function handleDragEnter(e) {
    // if(e.target.className == "dropzone" || e.target.className == "folder" || e.target.className=="label" || e.target.className=="count"){
    // }
}

function handleDragLeave(e){
    //folder emboss animation
    if(e.target.className == "dropzone" || e.target.className == "folder" || e.target.className=="label" || e.target.className=="count"){
        var folder = document.querySelector(".folder");
        folder.style.transform = "scale(1)";
        folder.style.transition = "all 0.3s ease-in-out";
    }
    // e.target.style=none;
}

function handleDrop(e) {
    if(e.stopPropagation)
    e.stopPropagation();
    e.preventDefault();
    var name=e.dataTransfer.getData("text");

    //COUNTER COUNT UPDATION CODE--
    var counter = document.querySelector(".count");
    const currcount=parseInt(counter.innerText);
    counter.innerText = currcount+1;
    //STACK UPDATION CODE--
    //this and draggedElement hold A/B/C
    const object=draggedElement.innerText;
    //add block in stack
    var stack = document.querySelector(".dropstack");
    const str='<div class="block">'+object+' Dropped <i class="fa-solid fa-trash-can" onclick="parentElement.remove(); pop()"></i></div>';
    stack.insertAdjacentHTML('beforeend',str );

    //folder emboss animation
    if(e.target.className == "dropzone" || e.target.className == "folder" || e.target.className=="label" || e.target.className=="count"){
        var folder = document.querySelector(".folder");
        folder.style.transform = "scale(1)";
        folder.style.transition = "all 0.3s ease-in-out";
    }
}

function handleDragEnd(e){
}


document.addEventListener("DOMContentLoaded", Event => {
    items = document.querySelectorAll(".draggables .items .item");

    items.forEach(function(item){
        item.addEventListener("dragstart", handleDragStart);
        // item.addEventListener("dragend",handleDragEnd);
        item.addEventListener("touchmove", function(ev){
            //grab location of the touch
            var touchLocation = ev.targetTouches[0];
            //assign item new coordinates based on the touch
            item.style.left=touchLocation.pageX + 'px';
            item.style.top=touchLocation.pageY + 'px';
        });
        // addition 3 lines below
        document.addEventListener("touchstart", handleDragStart);
        document.addEventListener("touchmove", handleDragOver);
        document.addEventListener("touchend", handleDrop);
        document.addEventListener("touchend", handleDragLeave);
    });
});

//addition the function below
// function touch2Mouse(e)
// {
//   var theTouch = e.changedTouches[0];
//   var mouseEv;

//   switch(e.type)
//   {
//     case "touchstart": mouseEv="mousedown"; break;  
//     case "touchend":   mouseEv="mouseup"; break;
//     case "touchmove":  mouseEv="mousemove"; break;
//     default: return;
//   }

//   var mouseEvent = document.createEvent("MouseEvent");
//   mouseEvent.initMouseEvent(mouseEv, true, true, window, 1, theTouch.screenX, theTouch.screenY, theTouch.clientX, theTouch.clientY, false, false, false, false, 0, null);
//   theTouch.target.dispatchEvent(mouseEvent);

//   e.preventDefault();
// }


//decrease the count in the folder
function pop(){
    var counter = document.querySelector(".count");
    const currcount=parseInt(counter.innerText);
    counter.innerText = currcount-1;
}
//slideaway blocks animation on removal



