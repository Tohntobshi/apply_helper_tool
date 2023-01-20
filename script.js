import { getCoverLetter, PHONE, LINKEDIN, GITHUB  } from './coverLetter.js'

let letter = ''

function onData({personName, roleName, companyName}) {
    letter = getCoverLetter(personName, roleName, companyName)
    const div = document.querySelector("#coverLetter")
    const btns = document.querySelector("#cp-buttons")
    btns.style.display = 'flex'
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
    navigator.clipboard.writeText(letter)
})

document.getElementById("insert").addEventListener("click", async () => {
    const [tab] = await chrome.tabs.query({active: true, lastFocusedWindow: true})
    chrome.tabs.sendMessage(tab.id, {letter})
})

async function sendRequest() {
    const [tab] = await chrome.tabs.query({active: true, lastFocusedWindow: true})
    chrome.tabs.sendMessage(tab.id, {grabData: true})
}

function insertContacts() {
    const div = document.querySelector("#contacts")
    let arr = [PHONE, LINKEDIN, GITHUB]
    for (const contact of arr) {
        if (!contact) continue
        let a = document.createElement('div')
        a.style.display = 'flex'
        a.style.marginTop = '3px'
        let b = document.createElement('button')
        b.innerText = 'copy'
        b.addEventListener("click", () => navigator.clipboard.writeText(contact))
        b.style.marginRight = '5px'
        let c = document.createElement('p')
        c.innerText = contact
        a.appendChild(b)
        a.appendChild(c)
        div.appendChild(a)
    }
}

sendRequest()
insertContacts()