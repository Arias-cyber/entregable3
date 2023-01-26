import express, { response } from 'express'
//import fs from 'fs'
import ProductManager from "./ProductManager.js";


const app = express()
const PORT = 8080


app.use(express.urlencoded({extended:true}))


const productManager = new ProductManager('./files/Products1.json') 
const Productos = await productManager.getProducts();

app.get('/products',  async (req, res) => {

//    console.log(Productos)
    res.send(Productos)
}) 


app.get('/products/query',  async (req, res) => {

    const {limit} = req.query
    if (!limit || limit ===0 ){
        //console.log(Productos)
       return  res.send(Productos)
    }
    
    let limitProducts = Productos.slice(0,limit)

    console.log(limitProducts)
    res.send(limitProducts)

}) 


app.get('/products/:pid', async (req, res) => {

    const {pid} = req.params
    console.log(pid)
    let id = parseInt(pid);
    const productDb= Productos.find(product => product.id === id)
    if(!productDb) {
        return res.send('No existe el producto')
    }
        
    res.send(productDb)

})


app.listen(PORT,err =>{
    if (err)  console.log(err)
    console.log(`Escuchando en el puerto ${PORT}`)
})
