const express = require('express');
const fs = require('fs');
const dayjs = require('dayjs');

const app = express();

app.use('/', express.static(__dirname + '/public'))
app.use('/', express.static(__dirname + '/node_modules/bootstrap/dist/css'))
app.use(express.urlencoded({extended : true}))
app.use(express.json());


app.post('/messages', (req,res) => {
    fs.readFile('./messages.json', 'utf8', (err,content)=>{
        let arr = JSON.parse(content);
        let messageDate = new Date();
        let formatedDate = dayjs(messageDate).format('YYYY-MM-DD THH:mm:ss')
        req.body.datetime = formatedDate;
        arr.push(req.body);
        fs.writeFile('./messages.json', JSON.stringify(arr), err => {
            fs.readFile('./messages.json', 'utf8', (err,content)=>{
                let lastFiveUsers = JSON.parse(content).slice(-5);
                lastFiveUsers.reverse();
                res.send(JSON.stringify({status : "super", data : lastFiveUsers}))
            })
        })
    })
})

app.get('/messages', (req,res) => {
    fs.readFile('./messages.json', 'utf8', (err,content)=>{
        let lastFiveUsers = JSON.parse(content).slice(-5);
        lastFiveUsers.reverse();
        res.send(JSON.stringify({status : "super", data : lastFiveUsers}))
    })
})

app.listen(3000, () => {
    console.log("Listening on PORT 3000.......");
})