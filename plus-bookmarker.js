var storageKeyPrefix = "plus-book-";
var postContainerClassName = ".ii";
var postIdClassName = "g-M-n";
var shareButtonsClassName = "dk Pk";
var actionButtonClassName = "dk";
var bookmarkButtonContentClassName = "sr bi";
var bookmarkButtonSelector = "span.bi";
var bookmarkButtonText = '☆';

function addBookmarkButtonToEachPostActionBlock() {
	shareButtonsNodeList = document.getElementsByClassName(shareButtonsClassName);
	shareButtons = toArray(shareButtonsNodeList);
	
	shareButtons.forEach(function(shareButton){
		shareButton.parentElement.insertBefore(createBookmarkButton(), shareButton);
	});

	$(bookmarkButtonSelector).on("click", function(){
		bookmarkButtonClicked($(this));
	});
};

function createBookmarkButton(){
	bookmark_dom = document.createElement('div');
	bookmark_dom.className = actionButtonClassName;
	
	bookmark_span_dom = document.createElement('span');
	bookmark_span_dom.className = bookmarkButtonContentClassName;
	bookmark_span_dom.innerText = bookmarkButtonText;
	
	bookmark_dom.appendChild(bookmark_span_dom);
	
	return bookmark_dom;
}

function bookmarkButtonClicked(bookmarkButton) {
	postContainer = $(bookmarkButton).parents(postContainerClassName)[0];
	postLinkId = postContainer.getElementsByClassName(postIdClassName)[0].getAttribute('href');
	postLink = postContainer.baseURI + postLinkId;

	window.localStorage.setItem(storageKeyPrefix + postLinkId, postLink);
}

function toArray(nodeList) {
    for(var array=[], l=nodeList.length; l--; array[l]=nodeList[l]);
    return array;
}

addBookmarkButtonToEachPostActionBlock();
