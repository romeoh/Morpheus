window.addEventListener("dragenter", dragHandler, false);
window.addEventListener("dragexit", dragHandler, false);
window.addEventListener("dragover", dragHandler, false);
window.addEventListener("drop", dragHandler, false);

function dragHandler(evt){
	evt.stopPropagation();
	evt.preventDefault();

	switch (evt.type) {
		case "drop":
			
			/* path가져오기 */
			var file = evt.dataTransfer.items[0].webkitGetAsEntry()
			chrome.fileSystem.getDisplayPath(file, function(path){
				console.log(path)
				document.querySelector('#img').setAttribute('src', path)
			})
			/**/
			
		break;
	}
}



