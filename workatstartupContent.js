async function grabData() {
    if (document.visibilityState === "hidden")
        return
    if (!window.location.href.startsWith('https://www.workatastartup.com/jobs/'))
        return
    let roleName = ''
    let companyName = ''
    let personName = ''
    let jobDescription = ''

    const roleElement = document.querySelector('span.company-name')
    if (roleElement && roleElement.innerText) {
        const vals = roleElement.innerText.split('at').map(el => el.trim())
        roleName = vals[0] || ''
        companyName = vals[1] || ''
    }
    companyName = companyName.slice(0, companyName.indexOf('(')).trim()

    const descriptions = document.querySelectorAll('div.prose.max-w-none')
    for (const descriptionElement of descriptions) {
        jobDescription += descriptionElement.innerText || ''
        jobDescription += '\n'
    }

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