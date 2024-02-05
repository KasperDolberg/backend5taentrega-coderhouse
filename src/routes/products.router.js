import {Router} from "express"
import ProductManager from "../dao/controllers/productManager.js"
import { __dirname } from "../utils.js"


const manager=new ProductManager(__dirname+'/dao/database/products.json')

const routerP =Router()

routerP.get("/products",async(req,res)=>{
    const products= await manager.getProducts(req.query)
    res.json({products})
})



routerP.get("/products/:pid", async (req, res) => {
    const productfind = await manager.getProductbyId(req.params);
    res.json({ status: "success", productfind });
  });

  routerP.post("/products", async (req, res) => {
    const newproduct = await manager.addProduct(req.body);
     res.json({ status: "success", newproduct });
  });

  routerP.put("/products/:pid", async (req, res) => {
    const updatedproduct = await manager.updateProduct(req.params,req.body);
     res.json({ status: "success", updatedproduct });
  });

  
  routerP.delete("/products/:pid", async (req, res) => {
    const id=parseInt(req.params.pid)
    const deleteproduct = await manager.deleteProduct(id);
     res.json({ status: "success",deleteproduct });
  });



export default routerP