const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const puerto = 3002;

app.use(bodyParser.json());

app.use("/laptops",(request,response,next)=>{
    console.log("headers: ", request.headers);
    console.log("body: ", request.body);
    next();
});

app.post("/laptops",(req,resp)=>{
    req.body.id=101;
    resp.send(req.body);
});

app.get("/laptops/:id",(req,resp)=>{
    const idParams = req.params.id;
    const laptops=[
        { id: 1, marca: "Asus", procesador: "Intel core i7", memoria: "8 GB", disco: "1 TB" },
        { id: 2, marca: "HP", procesador: "Intel core i3", memoria: "4 GB", disco: "250 GB" },
        { id: 3, marca: "Dell", procesador: "Intel core i5", memoria: "16 GB", disco: "500 GB" },
        { id: 4, marca: "Lenovo", procesador: "AMD Ryzen 5", memoria: "8 GB", disco: "512 GB" },
        { id: 5, marca: "Acer", procesador: "Intel core i9", memoria: "32 GB", disco: "2 TB" }
    ];
    for(let i=0; i<laptops.length;i++){
        if(idParams == laptops[i].id){
            let laptop = laptops[i];
            delete laptop.id;
            resp.send(laptop);
        }
    }
});

app.get("/laptops",(req,resp)=>{
    const laptops=[
        { id: 1, marca: "Asus", procesador: "Intel core i7", memoria: "8 GB", disco: "1 TB" },
        { id: 2, marca: "HP", procesador: "Intel core i3", memoria: "4 GB", disco: "250 GB" },
        { id: 3, marca: "Dell", procesador: "Intel core i5", memoria: "16 GB", disco: "500 GB" },
        { id: 4, marca: "Lenovo", procesador: "AMD Ryzen 5", memoria: "8 GB", disco: "512 GB" },
        { id: 5, marca: "Acer", procesador: "Intel core i9", memoria: "32 GB", disco: "2 TB" }
    ];
    resp.send(laptops);
});


app.put("/laptops/:idParam",(req,resp)=>{
    const id = req.params.idParam;
    console.log("id:",id);
    resp.send(req.body);
});

app.delete("/laptops/:id",(req,resp)=>{
    const id = req.params.id;
    console.log("id:",id);
    resp.send({id:id});
});

app.listen(puerto,()=>{
    console.log("Servidor listo en el puerto " + puerto);
});
