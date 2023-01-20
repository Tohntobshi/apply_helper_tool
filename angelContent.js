let roleName = ''
let companyName = ''
let personName = ''

function setCoverLetter(letter) {
    const input = document.getElementById('form-input--userNote')
    if (input && !input.value)
        input.value = letter
}

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        const { letter } = request
        setCoverLetter(letter)
    }
);

async function doStuff() {
    if (document.visibilityState === "hidden")
        return
    const roleElement = document.querySelector('h4.styles-module_component__3ZI84.text-lg.font-medium.text-dark-aaaa')
    if (roleElement && roleElement.innerText)
        roleName = roleElement.innerText || ''

    const companyElement = document.querySelector('.styles_detail__moBEM.styles_name__YTfJL dd')
    if (companyElement && companyElement.innerText)
        companyName = companyElement.innerText || ''

    const personElement = document.querySelector('div.styles_component__ETEwm.styles_details__7QRS4 div.styles_header__LhnxP h4.styles-module_component__3ZI84.styles_name__oO6gd.text-lg.font-medium a')
    if (personElement && personElement.innerText)
        personName = personElement.innerText || ''

    const letter = getCoverLetter(personName, roleName, companyName)

    try {
        await chrome.runtime.sendMessage({letter})
    } catch(e) {}
}

setInterval(doStuff, 500)