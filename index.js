// Dependencias
const fs = require('fs');
const express = require('express');

// Constantes
const app = express();
const PORT = 8080;

// Clases
class Contenedor{
    constructor(fileName){
        this.fileName = fileName;
    }
    async getAll(){
        try{
            const products = await fs.promises.readFile(this.fileName, "utf-8");
            try{
                const jsonObjs = JSON.parse(products);
                return jsonObjs;
            }catch(e){
                return [];
            }
        }catch(e){
            return e.message;
        }
    }
}

const productos = new Contenedor("./productos.txt");

// Main
const server = app.listen(PORT,()=>{
    console.log("Server iniciado, escuchando en puerto: " + PORT);
});


// Peticiones
app.get("/",(request,response)=>{
    response.send("Bienvenido a la API");
});

app.get("/productos",async (request,response)=>{
    const products = await productos.getAll();
    response.send(products);
});

app.get("/productoRandom",async (request,response)=>{
    const products = await productos.getAll();
    const nRandom = numeroRandom(0,products.length-1);
    const productFinal = products[nRandom];
    response.send(productFinal);
});

// Funciones
function numeroRandom(min, max){
    return Math.round(Math.random() * (max - min) + min);
}