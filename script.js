let letter = ''

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        let div = document.querySelector("#coverLetter")
        div.innerHTML = ''
        letter = request?.letter || ''
        let letterArr = letter.split('\n')
        for (let par of letterArr) {
            let child = document.createElement('p')
            child.innerHTML = par
            div.appendChild(child)
        }
    }
)

document.getElementById("copy").addEventListener("click", () => {
    navigator.clipboard.writeText(letter);
})

document.getElementById("insert").addEventListener("click", async () => {
    const [tab] = await chrome.tabs.query({active: true, lastFocusedWindow: true});
    chrome.tabs.sendMessage(tab.id, {letter});
})