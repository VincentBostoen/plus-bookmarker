chrome.extension.onMessage.addListener(function(message,sender,sendResponse){
  if(message.text == "saveBookmark"){
  	newBookmark = message.link;
	chrome.storage.sync.get("bookmarks", function(storageEntry) {
		bookmarks = storageEntry.bookmarks;
		if(bookmarks == null){
			bookmarks = new Array();
		}

		if(bookmarkIsNotAlreadyBookmarked(bookmarks, newBookmark)){
			updateBookmarks(bookmarks, newBookmark);
		}
	});
  } else if(message.text == "listBookmarks") {
  	chrome.storage.sync.get("bookmarks", function(storageEntry) {
  		bookmarks = storageEntry.bookmarks;
  		chrome.extension.sendMessage({text:"displayBookmarks", list:bookmarks},function(reponse){});
	});
  } else if(message.text == "displayAction") {
	chrome.pageAction.show(sender.tab.id);
  }
});

function updateBookmarks(bookmarks, newBookmark) {
	bookmarks.push(newBookmark);
	chrome.storage.sync.set({"bookmarks": bookmarks}, function() {
		displayNewBookmarkNotification(newBookmark);
	});
}

function displayNewBookmarkNotification(newBookmark){
	notification = webkitNotifications.createNotification('48.png', 'New bookmark !', newBookmark + ' has been added to bookmarks.');
	notification.show();
	setTimeout(function(){notification.close();},3000);
}

function bookmarkIsNotAlreadyBookmarked(bookmarks, newBookmark){
	return bookmarks.indexOf(newBookmark) == -1;
}