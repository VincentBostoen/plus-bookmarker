var plusPrefix = "https://plus.google.com/u/0/";
var localStorageKeyPrefix = "plus-book-";

function addBookmarkButtonToEachPostActionBlock() {
	shareButtonsNodeList = document.getElementsByClassName("dk Pk");
	shareButtons = toArray(shareButtonsNodeList);
	
	console.log("length :" + shareButtons.length);
	
	shareButtons.forEach(function(shareButton){
		shareButton.parentElement.insertBefore(createBookmarkButton(), shareButton);
	});
};

function createBookmarkButton(){
	bookmark_dom = document.createElement('div');
	bookmark_dom.className = "dk";
	
	bookmark_span_dom = document.createElement('span');
	bookmark_span_dom.className = "sr bi";
	bookmark_span_dom.innerText = '☆';
	
	bookmark_dom.appendChild(bookmark_span_dom);
	
	bookmark_dom.addEventListener("click", bookmarkButtonClicked, false);
	
	return bookmark_dom;
}

function bookmarkButtonClicked(event) {
	linkElementEndPart = event.target.parentElement.parentElement.parentElement.getElementsByClassName("g-M-n")[0].getAttribute('href');
	link = plusPrefix + linkElementEndPart;
	window.localStorage.setItem(localStorageKeyPrefix + linkElementEndPart, link);
	notify(link);
}

function notify(link){
	if (window.webkitNotifications.checkPermission() == 0) {
		window.webkitNotifications.createNotification(
		'sample-48.png', 'New Plus bookmark', ' has been stored as a bookmark');
	} else {
		window.webkitNotifications.requestPermission();
	}
}

function toArray(nodeList) {
    for(var array=[], l=nodeList.length; l--; array[l]=nodeList[l]);
    return array;
}

addBookmarkButtonToEachPostActionBlock();
