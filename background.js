const extensions = 'https://developer.chrome.com/docs/extensions';
const webstore = 'https://developer.chrome.com/docs/webstore'

chrome.runtime.onInstalled.addListener(()=> {
    chrome.action.setBadgeText({
        text: "OFF"
    }); 
})
chrome.action.onClicked.addListener(async (tab) => {

    if(tab.url.startsWith(extensions) || tab.url.startsWith(webstore)) {
        const prevState = await chrome.action.getBadgeText({
            tabId: tab.id
        });
        const nextState = (prevState==='ON') ? 'OFF':'ON';
        await chrome.action.setBadgeText({
            tabId: tab.id,
            text: nextState,
        });

        if(nextState=='OFF') {
            await chrome.scripting.executeScript({
                target: {tabId: tab.id},
                func: () => {
                    const badge = document.querySelector(".timeBadge");
                    badge.style.display = "none";
                }
            }).then(()=>{
                console.log("badge removed");
            })
        } else {
            await chrome.scripting.executeScript({
                target: {tabId: tab.id},
                func: () => {
                    const badge = document.querySelector(".timeBadge");
                    badge.style.display = "block";
                }
            });
        }
    }
});

