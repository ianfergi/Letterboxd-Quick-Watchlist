const urlParams = new URLSearchParams(window.location.search);

// Phase 1: Find the first anchor link inside the search result element
if (urlParams.get('auto_watchlist') === 'true') {
  const redirectToFirstResult = (link) => {
    const targetUrl = new URL(link.href);
    targetUrl.searchParams.set('trigger_watchlist', 'true');
    window.location.href = targetUrl.toString();
  };

  const existingLink = document.querySelector('.search-result a');
  if (existingLink && existingLink.href) {
    redirectToFirstResult(existingLink);
  } else {
    // Search results can load asynchronously, so wait for them to appear
    const observer = new MutationObserver(() => {
      const link = document.querySelector('.search-result a');
      if (link && link.href) {
        observer.disconnect();
        redirectToFirstResult(link);
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });

    setTimeout(() => {
      observer.disconnect();
      if (!document.querySelector('.search-result a')) {
        console.log("No movie links found within a .search-result element.");
      }
    }, 10000);
  }
}

// Phase 2: On the film page, execute the watchlist button click
if (urlParams.get('trigger_watchlist') === 'true') {
  const clickWatchlistBtn = (btn) => {
    if (!btn.classList.contains('active') && !btn.textContent.includes('Remove')) {
      btn.click();
      console.log("Movie successfully added to your watchlist!");
    } else {
      console.log("This movie is already in your watchlist.");
    }
  };

  const existingBtn = document.querySelector('a.action.-watchlist');
  if (existingBtn) {
    clickWatchlistBtn(existingBtn);
  } else {
    // The watchlist button can load asynchronously, so wait for it to appear
    const observer = new MutationObserver(() => {
      const btn = document.querySelector('a.action.-watchlist');
      if (btn) {
        observer.disconnect();
        clickWatchlistBtn(btn);
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });

    setTimeout(() => {
      observer.disconnect();
      if (!document.querySelector('a.action.-watchlist')) {
        console.log("Could not find the watchlist button on this page.");
      }
    }, 10000);
  }
}