chrome.extension.onMessage.addListener(function(message,sender,sendResponse){
  if(message.text == "saveBookmark"){
    window.localStorage.setItem(new Date().toJSON(), message.link); 
    sendResponse({type:"saved"});
  }
});