var storageKeyPrefix = "plus-book-";
var postContainerClassName = ".ii";
var postIdClassName = "g-M-n";
var shareButtonsClassName = "dk Pk";
var actionButtonClassName = "dk";
var actionButtonContentClassName = "sr bi";
var bookmarkButtonText = '☆';

function addBookmarkButtonToEachPostActionBlock() {
	shareButtonsNodeList = document.getElementsByClassName(shareButtonsClassName);
	shareButtons = toArray(shareButtonsNodeList);
	
	shareButtons.forEach(function(shareButton){
		shareButton.parentElement.insertBefore(createBookmarkButton(), shareButton);
	});
};

function createBookmarkButton(){
	bookmark_dom = document.createElement('div');
	bookmark_dom.className = actionButtonClassName;
	
	bookmark_span_dom = document.createElement('span');
	bookmark_span_dom.className = actionButtonContentClassName;
	bookmark_span_dom.innerText = bookmarkButtonText;
	
	bookmark_dom.appendChild(bookmark_span_dom);
	
	bookmark_dom.addEventListener("click", bookmarkButtonClicked, false);
	
	return bookmark_dom;
}

function bookmarkButtonClicked(event) {
	postContainer = $(event.target).parents(postContainerClassName)[0];
	postLinkId = postContainer.getElementsByClassName(postIdClassName)[0].getAttribute('href');
	postLink = postContainer.baseURI + postLinkId;

	window.localStorage.setItem(storageKeyPrefix + postLinkId, postLink);
}

function toArray(nodeList) {
    for(var array=[], l=nodeList.length; l--; array[l]=nodeList[l]);
    return array;
}

addBookmarkButtonToEachPostActionBlock();
