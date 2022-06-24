window.addEventListener('scroll', () => {
    if (window.scrollY + window.innerHeight >= 0.98*(document.documentElement.scrollHeight)){
        loadMessages()
    }
})

function loadMessages(){
    // get all messages
    const messages = Array.from(document.getElementsByClassName('message-item'));

    // get messages that have style of "display:none"
    const remainingMessages = messages.filter(message => message.style.display === 'none');

    // make next 10 (or less) messages appear
    if (remainingMessages.length > 10){
        remainingMessages.slice(0, 10).map(message => message.style.display = 'flex')
    } else {
        remainingMessages.map(message => message.style.display = 'flex')
    }
}