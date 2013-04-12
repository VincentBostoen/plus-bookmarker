var storageKeyPrefix = "plus-book-";
var postContainerClassName = ".ii";
var postIdClassName = "g-M-n";
var shareButtonsClassName = "dk Pk";
var actionButtonClassName = "dk";
var bookmarkButtonContentClassName = "sr bi";
var bookmarkButtonSelector = "span.bi";
var bookmarkButtonText = '☆';
var tooltipAttributeName = "data-tooltip";

function addBookmarkButtonToEachPostActionBlock() {
	insertBookmarkButtonBeforeEachShareButtonsUnder(document);

	$(document).on('DOMNodeInserted', function(e) {
		if (e.target.id.substring(0, 6) == "update") {
			insertBookmarkButtonBeforeEachShareButtonsUnder(e.target);
		}
	});
};

function insertBookmarkButtonBeforeEachShareButtonsUnder(parent){
	shareButtonsNodeList = parent.getElementsByClassName(shareButtonsClassName);
	shareButtons = toArray(shareButtonsNodeList);
	shareButtons.forEach(insertNewBookmarkButtonBefore);
}

function insertNewBookmarkButtonBefore(shareButton){
	shareButton.parentElement.insertBefore(createBookmarkButton(), shareButton);
}

function createBookmarkButton(){
	bookmark_dom = document.createElement('div');
	bookmark_dom.className = actionButtonClassName;
	$(bookmark_dom).attr(tooltipAttributeName, "Bookmark this post");
	
	bookmark_span_dom = document.createElement('span');
	bookmark_span_dom.className = bookmarkButtonContentClassName;
	bookmark_span_dom.innerText = bookmarkButtonText;
	
	bookmark_dom.appendChild(bookmark_span_dom);
	
	$(bookmark_dom).on("click", function(){
		bookmarkButtonClicked($(this));
	});

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
