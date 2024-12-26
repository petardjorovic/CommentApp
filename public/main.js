window.onload = function(){
    let xml = new XMLHttpRequest();

    xml.open('GET', '/messages')

    xml.onreadystatechange = function(){
        if(xml.readyState === 4 && xml.status === 200){
            displayMessages(JSON.parse(xml.responseText));
        }
    }

    xml.send()
}
let subBtn = document.querySelector('#sub');
let emailInput = document.querySelector('#email');
let messageInput = document.querySelector('#message');
let allMessages = document.querySelector('.all-messages');

subBtn.addEventListener('click', (e)=>{
    e.preventDefault();
    // fetch('/messages', {
    //     method : 'POST',
    //     headers : {
    //         "Content-Type" : "application/json"
    //     },
    //     body : JSON.stringify({
    //         email : emailInput.value,
    //         message : messageInput.value
    //     })
    // })
    // .then(res => {
    //     return res.json()})
    // .then(data => {
    //     console.log(data)
    // })

    let xml = new XMLHttpRequest();

    xml.open('POST', '/messages');
    xml.setRequestHeader("Content-Type", "application/json");
    xml.onreadystatechange = function(){
        if(xml.readyState === 4 && xml.status === 200){
            displayMessages(JSON.parse(xml.responseText));
        }
        emailInput.value = ""; 
        messageInput.value = ""; 
    }
    xml.send(JSON.stringify({
        email : emailInput.value,
        message : messageInput.value
    }))
})

function displayMessages(messages) {
    let html = "";
    messages.data.forEach(msg => {
        html += `
        <dl>
            <dt>${msg.email}</dt>
            <dd>${msg.message}</dd>
            <dd>${msg.datetime}</dd>
        </dl>
        `.trim();
    });
    allMessages.innerHTML = html;
}