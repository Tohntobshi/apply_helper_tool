

async function grabData() {
    if (document.visibilityState === "hidden")
        return

    let roleName = ''
    let companyName = ''
    let personName = ''

    const roleElement = document.querySelector('div[data-test="jobTitle"]')
    if (roleElement && roleElement.innerText)
        roleName = roleElement.innerText || ''

    const companyElement = document.querySelector('div[data-test="employerName"]')
    if (companyElement)
        companyName = companyElement.childNodes[0]?.data || ''

    const letter = getCoverLetter(personName, roleName, companyName)

    try {
        await chrome.runtime.sendMessage({letter})
    } catch(e) {}
}

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (!request?.grabData) return
        grabData()
    }
)