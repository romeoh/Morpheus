window.addEventListener("dragenter", dragHandler, false);
window.addEventListener("dragexit", dragHandler, false);
window.addEventListener("dragover", dragHandler, false);
window.addEventListener("drop", dragHandler, false);

function dragHandler(evt){
	evt.stopPropagation();
	evt.preventDefault();

	switch (evt.type) {
		case "drop":
			evt.preventDefault(); 
			var file = evt.dataTransfer.files[0],
			reader = new FileReader(); 
			console.log(reader)
			reader.onload = function (event) {
				document.querySelector("#img").setAttribute("src",  event.target.result); 
			}; 
			reader.readAsDataURL(file); 

			/* path가져오기 */
			var file = evt.dataTransfer.items[0].webkitGetAsEntry()
			chrome.fileSystem.getDisplayPath(file, function(path){
				console.log(path)
				//document.querySelector('#img').setAttribute('src', path)
			})
			/**/
			
		break;
	}
}

document.querySelector('#pop').addEventListener('click', function() {
	window.open('index.html', 'id', 'toolbar=0,scrollbars=0,statusbar=0,menubar=0,width=460,height=600');
}, false)

chrome.management.getAll(function(info) {
	console.log(info)
})
