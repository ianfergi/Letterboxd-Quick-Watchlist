chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.removeAll();
  chrome.contextMenus.create({
    id: "letterboxdsearch",
    title: "Letterboxd Search '%s'",
    contexts: ["selection"],
    icons: {
      "16": "icon16.png"
    }
  });
  chrome.contextMenus.create({
    id: "letterboxdadd",
    title: "Letterboxd Add '%s' to Watchlist",
    contexts: ["selection"],
    icons: {
      "16": "icon16.png"
    }
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  var isAdd = info.menuItemId === "letterboxdadd";
  if (isAdd || info.menuItemId === "letterboxdsearch") {

    const searchQuery = encodeURIComponent(info.selectionText.trim());
    const letterboxdSearchUrl = `https://letterboxd.com/search/${searchQuery}/?auto_watchlist=${isAdd}`;

    chrome.tabs.create({ url: letterboxdSearchUrl, active: true });
  }
});
