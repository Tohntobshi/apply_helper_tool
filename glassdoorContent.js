let roleName = ''
let companyName = ''
let personName = ''

async function doStuff() {
    if (document.visibilityState === "hidden")
        return
    const roleElement = document.querySelector('div[data-test="jobTitle"]')
    if (roleElement && roleElement.innerText)
        roleName = roleElement.innerText || ''

    const companyElement = document.querySelector('div[data-test="employerName"]')
    if (companyElement)
        companyName = companyElement.childNodes[0]?.data || ''

    const letter = getCoverLetter(personName, roleName, companyName)

    try {
        await chrome.runtime.sendMessage({roleName, companyName, personName, letter})
    } catch(e) {}
}

setInterval(doStuff, 500)