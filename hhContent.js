async function grabData() {
    if (document.visibilityState === "hidden")
        return
    if (!window.location.href.startsWith('https://hh.ru/vacancy/'))
        return
    let roleName = ''
    let companyName = ''
    let personName = ''
    let jobDescription = ''

    const roleElement = document.querySelector('h1[data-qa="vacancy-title"]')
    if (roleElement && roleElement.innerText)
        roleName = roleElement.innerText || ''

    const companyElement = document.querySelector('a[data-qa="vacancy-company-name"]')
    if (companyElement)
        companyName = companyElement.innerText || ''

    const descriptionElement = document.querySelector('div[data-qa="vacancy-description"]')
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