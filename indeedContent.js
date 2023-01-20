function setCoverLetter(letter) {
    const input = document.getElementById('textarea-applicant.applicationMessage')
    if (input && !input.value) {
        input.value = letter
    }
        
}

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request?.letter) {
            setCoverLetter(request.letter)
            return
        }
    }
);
