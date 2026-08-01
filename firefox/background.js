browser.runtime.onInstalled.addListener(() => {
  browser.contextMenus.removeAll();
  browser.contextMenus.create({
    id: "letterboxdsearch",
    title: "Search '%s'",
    contexts: ["selection"],
    icons: {
      "16": "icon16.png"
    }
  });
  browser.contextMenus.create({
    id: "letterboxdadd",
    title: "Add '%s' to Watchlist",
    contexts: ["selection"],
    icons: {
      "16": "icon16.png"
    }
  });
});

browser.contextMenus.onClicked.addListener((info, tab) => {
  var isAdd = info.menuItemId === "letterboxdadd";
  if (isAdd || info.menuItemId === "letterboxdsearch") {
    
    const searchQuery = encodeURIComponent(info.selectionText.trim());
    const letterboxdSearchUrl = `https://letterboxd.com/search/${searchQuery}/?auto_watchlist=${isAdd}`;
    
    browser.tabs.create({ url: letterboxdSearchUrl, active: true });
  }
});
