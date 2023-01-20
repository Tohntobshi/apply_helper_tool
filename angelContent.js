function setCoverLetter(letter) {
    const input = document.getElementById('form-input--userNote')
    if (input && !input.value)
        input.value = letter
}

async function grabData() {
    if (document.visibilityState === "hidden")
        return
    let roleName = ''
    let companyName = ''
    let personName = ''

    const roleElement = document.querySelector('h4.styles-module_component__3ZI84.text-lg.font-medium.text-dark-aaaa')
    if (roleElement && roleElement.innerText)
        roleName = roleElement.innerText || ''

    const companyElement = document.querySelector('.styles_detail__moBEM.styles_name__YTfJL dd')
    if (companyElement && companyElement.innerText)
        companyName = companyElement.innerText || ''

    const personElement = document.querySelector('div.styles_component__ETEwm.styles_details__7QRS4 div.styles_header__LhnxP h4.styles-module_component__3ZI84.styles_name__oO6gd.text-lg.font-medium a')
    if (personElement && personElement.innerText)
        personName = personElement.innerText || ''

    try {
        await chrome.runtime.sendMessage({data: {personName, roleName, companyName}})
    } catch(e) {}
}

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request?.letter) {
            setCoverLetter(request.letter)
            return
        }
        if (request?.grabData) {
            grabData()
            return
        }
    }
)