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

// Fetch API
async function postMessage(url, data){
    const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })

    return response.json()
}