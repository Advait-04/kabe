const onCreatedListener = (tab) => {
    const url = new URL(tab.url);
    blockList.forEach((item) => {
        if (url.hostname.includes(item)) {
            chrome.tabs.update(tab.id, {
                url: "https://www.youtube.com/watch?v=MozKrDoS1Dc",
            });
        }
    });
};

const onUpdatedListener = (tabId, changeInfo, tab) => {
    const url = new URL(tab.url);
    blockList.forEach((item) => {
        if (url.hostname.includes(item)) {
            chrome.tabs.update(tab.id, {
                url: "https://www.youtube.com/watch?v=MozKrDoS1Dc",
            });
        }
    });
};

var toggle = false;
var blockList = [];

chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.local.set({ toggle: false });
    chrome.storage.local.set({ blockList: [] });
});

chrome.storage.local.onChanged.addListener(async () => {
    toggle = await chrome.storage.local.get("toggle").then((res) => res.toggle);

    blockList = await chrome.storage.local
        .get("blockList")
        .then((res) => res.blockList);

    if (toggle && blockList.length !== 0) {
        chrome.tabs.query({}, (tabs) => {
            tabs.forEach((tab) => {
                const url = new URL(tab.url);

                blockList.forEach((item) => {
                    if (url.hostname.includes(item)) {
                        chrome.tabs.update(tab.id, {
                            url: "https://www.youtube.com/watch?v=MozKrDoS1Dc",
                        });
                    }
                });
            });
        });

        chrome.tabs.onCreated.addListener(onCreatedListener);
        chrome.tabs.onUpdated.addListener(onUpdatedListener);
    } else if (!toggle || blockList.length == 0) {
        chrome.tabs.onCreated.removeListener(onCreatedListener);
        chrome.tabs.onUpdated.removeListener(onUpdatedListener);
    }
});
