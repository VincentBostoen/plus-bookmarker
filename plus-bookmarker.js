var storageKeyPrefix = "plus-book-";
var newsFeedContainerClassName = "Nj mu";
var postContainerClassName = ".ii";
var updatedContainerIdPrefix = "update";
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
		if (elementIsANewPostContainer(e.target) || elementIsANewFeedContainer(e.target) || elementIsAStreamRefresh(e.target)) {
			insertBookmarkButtonBeforeEachShareButtonsUnder(e.target);
		}
	});
};

function elementIsANewPostContainer(element){
	return element.id.substring(0, 6) == updatedContainerIdPrefix;
}

function elementIsANewFeedContainer(element){
	return element.className == newsFeedContainerClassName;
}

function elementIsAStreamRefresh(element){
	return element.tagName == "DIV";
}

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

	saveBookmark(postLink);
}

function saveBookmark(bookmark){
	chrome.extension.sendMessage({text:"saveBookmark", link:bookmark},function(reponse){
	  if(reponse.type == "saved") {
	    	console.log("Bookmark saved sync");
		}
	});
}

function toArray(nodeList) {
    for(var array=[], l=nodeList.length; l--; array[l]=nodeList[l]);
    return array;
}

addBookmarkButtonToEachPostActionBlock();
