async function grabData() {
    if (document.visibilityState === "hidden")
        return
    if (!window.location.href.startsWith('https://career.habr.com/vacancies/'))
        return
    let roleName = ''
    let companyName = ''
    let personName = ''
    let jobDescription = ''

    const roleElement = document.querySelector('h1.page-title__title')
    if (roleElement && roleElement.innerText)
        roleName = roleElement.innerText || ''

    const companyElement = document.querySelector('div.company_name')
    if (companyElement)
        companyName = companyElement.innerText || ''

    const descriptionElement = document.querySelector('div.vacancy-description__text')
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