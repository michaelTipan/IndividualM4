/*
COMANDOS ESENCIALES:
npm init --y 
npm install express 
npm install body-parser 
node app.js
*/

const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const puerto = 3001;

//contacto: id, nombre, apellido, celular

app.use(bodyParser.json());

app.use("/contactos",(request,response,next)=>{
    console.log("headers: ", request.headers);
    console.log("body: ", request.body);
    next();
});

app.get("/contactos",(request,response)=>{
    const contactos=[
        {id:1,nombre:"Santiago",apellido:"Mosquera",celular:"0996305488"},
        {id:2,nombre:"Jonathan",apellido:"Tipán",celular:"0960108122"},
        {id:3,nombre:"Carlos",apellido:"Bayas",celular:"0986614845"},
    ];
    console.log("Ingresa a get");
    response.send(contactos);
});

app.post("/contactos",(req,resp)=>{
    req.body.id=99;
    resp.send(req.body);
});

app.put("/contactos/:idParam",(req,resp)=>{
    const id = req.params.idParam;
    console.log("id:",id);
    resp.send(req.body);
});

app.delete("/contactos/:id",(req,resp)=>{
    const id = req.params.id;
    console.log("id:",id);
    resp.send();
});

app.listen(puerto,()=>{
    console.log("Servidor listo en el puerto " + puerto);
});
