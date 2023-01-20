import { getCoverLetter } from './coverLetter.js'

let letter = ''

function onData({personName, roleName, companyName}) {
    letter = getCoverLetter(personName, roleName, companyName)
    const div = document.querySelector("#coverLetter")
    div.innerHTML = ''
    const letterArr = letter.split('\n')
    for (const par of letterArr) {
        let child = document.createElement('p')
        child.innerHTML = par
        div.appendChild(child)
    }
}

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request?.data) {
            onData(request.data)
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

async function sendRequest() {
    const [tab] = await chrome.tabs.query({active: true, lastFocusedWindow: true});
    chrome.tabs.sendMessage(tab.id, {grabData: true});
}

sendRequest()