const addButton = document.getElementById('add-message-btn');

addButton.addEventListener('click', event => {
    const title = document.getElementById('title').value;
    const message = document.getElementById('message').value;
    
    postMessage('/api/post', { title, message })
    .then(data => {
        addMessage(data)
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

// Prepend new message to top of container
function addMessage(data){
    const messagesContainer = document.getElementsByClassName('messages-container')[0];
    let btn = '';

    if (data.userMemStatus === 'Admin'){
        btn = `<button data-id=${data._id} class="delete-btn">Delete</button>`
    }

    let content = `
        <div class="message-item" msg-id=${data._id}>
            <div class="message-title">
                ${data.title}
            </div>

            <div class="message-message">
                ${data.message}
            </div>

            <div class="message-author">
                by ${data.user}
            </div>

            <div class="message-timestamp">
                ${data.formatTimestamp}
            </div>

            ${btn}
        </div>
    `;

    messagesContainer.insertAdjacentHTML('afterbegin', content)
}

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