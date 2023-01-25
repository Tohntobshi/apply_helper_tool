async function ask({person, role, company, description, myName}) {
    const input = document.querySelector('textarea[data-id="root"]')
    const button = document.querySelector('textarea[data-id="root"]+button')
    if (!input || !button) return
    input.value = `make very concise cover letter for ${role} position in ${company}\
${person ? '\nhiring-manager\'s name: ' + person : ''}
my name: ${myName}
job description: ${description}`
    button.click()
}

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request?.askGPTData) {
            ask(request.askGPTData)
            return
        }
    }
);
