function fetchBookmarks(){
	chrome.extension.onMessage.addListener(function(message,sender,sendResponse){
		if(message.text == "displayBookmarks"){
			displayBookmarks(message.list);
		}
	});
	chrome.extension.sendMessage({text:"listBookmarks"},function(reponse){
		if(reponse.type == "bookmarks") {
			console.log("Bookmarks list retrieved");
		}
	});
}

function displayBookmarks(bookmarks) {
	bookmarks_dom = document.createElement('ul');
	bookmarks.forEach(function(bookmark){
		bookmark_dom = createBookmarkRow(bookmark);
		bookmarks_dom.appendChild(bookmark_dom);
	});

	document.getElementById("bookmarks").appendChild(bookmarks_dom);
}

function createBookmarkRow(bookmark){
	bookmark_link_dom = document.createElement('a');
	bookmark_link_dom.href = bookmark;
	bookmark_link_dom.innerHTML = bookmark;

	bookmark_dom = document.createElement('li');
	bookmark_dom.appendChild(bookmark_link_dom);

	return bookmark_dom;
}

window.onload = fetchBookmarks;