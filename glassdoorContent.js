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

    try {
        await chrome.runtime.sendMessage({data: {personName, roleName, companyName}})
    } catch(e) {}
}

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request?.grabData) {
            grabData()
            return
        }
    }
)