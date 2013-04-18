chrome.extension.onMessage.addListener(function(message,sender,sendResponse){
  if(message.text == "saveBookmark"){
  	newBookmark = message.link;
	chrome.storage.sync.get("bookmarks", function(storageEntry) {
		bookmarks = storageEntry.bookmarks;
		if(bookmarks == null){
			bookmarks = new Array();
		}

		updateBookmarks(bookmarks, newBookmark);
	});
  }
});

function updateBookmarks(bookmarks, newBookmark) {
	bookmarks.push(newBookmark);
	chrome.storage.sync.set({"bookmarks": bookmarks}, function() {
		var notification = webkitNotifications.createNotification('48.png', 'New bookmark !', newBookmark + ' has been added to bookmarks.');
		notification.show();
		setTimeout(function(){notification.close();},3000);
	});
}