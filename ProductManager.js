//const fs = require('fs')
import fs from 'fs'

class ProductManager{

    constructor(path){
        this.path = path;
    }


    auxiliar = async (products) => {
        fs.promises.writeFile(this.path, JSON.stringify(products, null, "\t"));
    }

    getProducts = async () => {
        try{
            if(fs.existsSync(this.path)){
                const data = await fs.promises.readFile(this.path,'utf-8');
                const products = JSON.parse(data);
                return products;
            }
            await fs.promises.writeFile(this.path,'[]','utf-8')
            return []
        } catch(error){
            console.log(error)
        }
    }

    addProduct = async(newProduct) => {
        const products = await this.getProducts();

        if (newProduct.title === '' || newProduct.description === '' || newProduct.price === '' || newProduct.thumbnail === '' || newProduct.code === '' || newProduct.stock === '') {
            return 'Falta completar campos';
        }
        const existingProduct = products.find(product => product.code === newProduct.code);
        if (existingProduct) {
            return 'Error codigo ya cargado';
        }
        newProduct.id = products.length ? products[products.length - 1].id + 1 : 1;
        products.push(newProduct);
        await productManager.auxiliar(products);
        return 'Saved';
    }

    getProductById = async (id) =>{
        const products = await this.getProducts();

        const productDb= products.find(product => product.id ===id)
        if(!productDb){

            return `Not found`;
        } 
        return productDb

    }

    updateProduct = async(upProduct) =>{
        const products = await this.getProducts();

        const index= products.findIndex(product => product.id ===upProduct.id)
        if(index === -1){

            return `Not found`;
        } 
        products.splice(index,1,upProduct);
        await fs.promises.unlink(this.path);
        await productManager.auxiliar(products);
        return `modified`;
    }

    deleteProduct = async(id) =>{
        const products = await this.getProducts();

        const index= products.findIndex(product => product.id ===id)
        if(index === -1){

            return `Not found`;
        } 
        products.splice(index,1);
        await fs.promises.unlink(this.path);
        await productManager.auxiliar(products);
        return `Delete`;        
        
    }

}


const productManager = new ProductManager('./files/Products1.json') 


const env = async() =>{

    let product ={
        title: 'Play Station 5',
        description: 'Sony',
        price:120000,
        thumbnail:'ruta',
        code:96, 
        stock:7,
//        id:7
        
    }

/*
      //Cargar productos
   let result = await productManager.addProduct(product);
   console.log(result);
*/

/*
    //Obtener productos
    let response = await productManager.getProducts();
    console.log(response);
*/

/*
    //Obtener un producto por id
     let response2= await productManager.getProductById(1);
     console.log (response2)
*/

/*
    //Modificar un producto 
     let modifie = await productManager.updateProduct(product);
     console.log(modifie);
*/

/*
    //Eliminar un producto
     let deleteP = await productManager.deleteProduct(3);
     console.log(deleteP);
*/

}
env();

export default ProductManager;