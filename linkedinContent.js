async function grabData() {
    if (document.visibilityState === "hidden")
        return
    if (!window.location.href.startsWith('https://www.linkedin.com/jobs/'))
        return
    let roleName = ''
    let companyName = ''
    let personName = ''
    let jobDescription = ''

    const roleElement = document.querySelector('.jobs-unified-top-card__job-title')
    if (roleElement && roleElement.innerText)
        roleName = roleElement.innerText || ''

    const companyElement = document.querySelector('span.jobs-unified-top-card__company-name a')
    if (companyElement && companyElement.innerText)
        companyName = companyElement.innerText || ''

    const personElement = document.querySelector('.jobs-poster__name')
    if (personElement && personElement.innerText)
        personName = personElement.innerText.trim() || ''

    const descriptionElement = document.querySelector('article.jobs-description__container')
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