import express  from 'express'
import ProductManager from "./ProductManager.js";


const app = express()
const PORT = 8080

app.use(express.json())
app.use(express.urlencoded({extended:true}))


const productManager = new ProductManager('./files/Products1.json') 


app.get('/products',  async (req, res) => {
    const products = await productManager.getProducts();
    res.send(products)
}) 


app.get('/products/query',  async (req, res) => {
    const products = await productManager.getProducts();
    const {limit} = req.query
    if (!limit || limit ===0 ){
       return  res.send(products)
    }
    
    let limitProducts = products.slice(0,limit)
    res.send(limitProducts)
}) 


app.get('/products/:pid', async (req, res) => {
    const {pid} = req.params
    let id = parseInt(pid);
    const product = await productManager.getProductById(id)      
    res.send(product)
})


app.listen(PORT,err =>{
    if (err)  console.log(err)
})
