const Product = require("../models/productModel");
const { getBodyData } = require("../utils/bodyUtils");

const getProducts = async (req, res) => {
  try {
    const products = await Product.getAll();
    res.writeHead(200, { "Content-Type": "application-json" });
    res.end(JSON.stringify(products));
  } catch (err) {
    console.error(err);
  }
};

const getProductById = async (req, res, id) => {
    try{
        const product = await Product.getById(id);
        if(!product){
            res.writeHead(404, { "Content-Type": "application-json" });
            res.end(JSON.stringify({ message: `Product not found` }));
        }else{
            res.writeHead(200, { "Content-Type": "application-json" });
            res.end(JSON.stringify(product));
        }
    }catch (err) {
        console.error(err);
    }
};

const createProduct = async (req, res) => {
    try{
        const body = await getBodyData(req);
        const { title, description, price } = JSON.parse(body)
        const product = {
            title,
            description,
            price
        }
        const newProduct = await Product.create(product);
        if(!newProduct){
            res.writeHead(404, { "Content-Type": "application-json" });
            res.end(JSON.stringify({ message: `Product not created` }));
        }else{
            res.writeHead(201, { "Content-Type": "application-json" });
            res.end(JSON.stringify(newProduct));
        }
    }catch(err){
        console.error(err);
    }
};

const updateProduct = async (req, res, id) => {
    try{
        const product = await Product.getById(id);
        if(!product){
            res.writeHead(404, { "Content-Type": "application-json" });
            res.end(JSON.stringify({ message: `Product not found` }));
        }else{
            const body = await getBodyData(req);
            const { title, description, price } = JSON.parse(body)
            const newProduct = {
                title: title || product.title,
                description: description || product.description,
                price: price || product.price
            }
            const updatedProduct = await Product.update(id, newProduct); 
            if(!updatedProduct){
                res.writeHead(404, { "Content-Type": "application-json" });
                res.end(JSON.stringify({ message: `Product not updated` }));
            }else{
                res.writeHead(200, { "Content-Type": "application-json" });
                res.end(JSON.stringify(updatedProduct));           
            }
        }
    }catch(err){
        console.error(err);
    }
};

const deleteProduct = async (req, res, id) => {
    try{
        const product = await Product.getById(id);
        if(!product){
            res.writeHead(404, { "Content-Type": "application-json" });
            res.end(JSON.stringify({ message: `Product not found` }));
        }else{
            const deletedStatus = await Product._delete(id); 
            if(!deletedStatus){
                res.writeHead(404, { "Content-Type": "application-json" });
                res.end(JSON.stringify({ message: `Product not deleted` }));
            }else{
                res.writeHead(200, { "Content-Type": "application-json" });
                res.end(JSON.stringify({ message: `Product deleted with id: ${id}`}));           
            }
        }
    }catch(err){
        console.error(err);
    }
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
};
