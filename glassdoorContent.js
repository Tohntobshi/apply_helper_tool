async function grabData() {
    if (document.visibilityState === "hidden")
        return
    let roleName = ''
    let companyName = ''
    let personName = ''
    let jobDescription = ''

    const roleElement = document.querySelector('div[data-test="jobTitle"]') || document.querySelector('div[data-test="job-title"]')
    if (roleElement && roleElement.innerText)
        roleName = roleElement.innerText || ''

    const companyElement = document.querySelector('div[data-test="employerName"]') || document.querySelector('div[data-test="employer-name"]')
    if (companyElement)
        companyName = companyElement.childNodes[0]?.data || ''

    const descriptionElement = document.querySelector('div.jobDescriptionContent')
    if (descriptionElement && descriptionElement.innerText)
        jobDescription = descriptionElement.innerText || ''

    try {
        await chrome.runtime.sendMessage({data: {personName, roleName, companyName, jobDescription}})
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