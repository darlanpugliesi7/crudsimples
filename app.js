const express = require('express');
const mysql = require("mysql2");
const bodyparser = require('body-parser');

const app = express();
const port = 3001;

app.use(bodyparser.urlencoded({extended:true}));
app.use(express.static('public'));

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'cimatec',
    database: 'emaildb'
});

db.connect((err) => {
    if (err) throw err;
    console.log("Conectado ao banco de dados!")
})

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.post('/cadastro', (req, res) => {
    const { email } = req.body;
    const sql = 'insert into EMAILS (EMAIL) values (?)';

    db.query(sql, [email], (err, result) => {
        if (err) {
            if (err.code === 'ER_DUP_ENTRY') {

                return res.send("Email já cadastrado!");
            }
            res.send('Erro ao cadastrar!', err);

        }
        res.send('Email cadastrado com sucesso!');
    });
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta: http://localhost:${port}`)
})