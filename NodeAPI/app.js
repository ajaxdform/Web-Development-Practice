import express from "express";
import users from './MOCK_DATA.json' assert { type: "json" };
import fs from "fs";
const app = express();
const port = 8000;

app.use(express.urlencoded({extended: false}));

app.get("/api/users", (req, res) => {
    res.json(users);
});

app.get('/users', (req, res) => {
    res.send(`<ul>${users.map((users) => `<li>${users.first_name}</li>`).join("")}</ul>`)
});

app.get('/api/users/:id', (req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    res.json(user);
});

app.post('/api/users', (req, res) => {
    const body = req.body;
    users.push({id: users.length + 1, ...body});
    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err, data) => {
        res.json({status: "Success", id: users.length});
    });
});

app.patch('/api/users/:id', (req, res) => {
    const id = Number(req.params.id);
    const {first_name, last_name, email, gender, Job_Title} = req.body;

    const user = users.find((user) => user.id === id);
    if(!user) {
        res.status(404).json({message: 'User Not Found'});
    }
    if (first_name) {
        user.first_name = first_name;
    }
    if (last_name) {
        user.last_name = last_name;
    }
    if (email) {
        user.email = email;
    }
    if(gender) {
        user.gender = gender;
    }
    if(Job_Title) {
        user.Job_Title = Job_Title;
    }
    res.json({message: 'User Updated', user: user});

});

app.delete('/api/users/:id', (req, res) => {
    const id = Number(req.params.id);
    const index = users.findIndex((user => user.id === id));
    if(index !== -1) {
        users.splice(index, 1);
        res.status(200).json({message: 'User Deleted'});
    } else {
        res.status(404).json({message: 'User Not Found'});
    }
});

app.listen(port, () => {
    console.log("server is running");
});