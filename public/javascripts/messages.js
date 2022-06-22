const addButton = document.getElementById('add-message-btn');

addButton.addEventListener('click', event => {
    const title = document.getElementById('title').value;
    const message = document.getElementById('message').value;
    
    postMessage('/api/post', { title, message })
    .then(data => {
        console.log(data);
    })
    .catch(err => {
        console.log(err)
    })
    
    event.preventDefault()
})

window.addEventListener('click', event => {
    if (event.target.classList.contains('delete-btn')){
        let messageID = event.target.getAttribute('data-id');
        let message = document.querySelector(`[msg-id='${messageID}']`);

        deleteMessage(`/api/delete/${messageID}`)
        .then(data => {
            console.log(data);
            message.remove();
        })
        .catch(err => {
            console.log(err)
        })
    }
})

// Fetch API
async function postMessage(url, data){
    const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })

    return response.json()
}

async function deleteMessage(url){
    const response = await fetch(url, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
    })

    return response.json()
}