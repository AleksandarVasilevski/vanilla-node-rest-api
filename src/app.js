const http = require("http");

const productsController = require("./controllers/productController");

const server = http.createServer((req, res) => {
  if (req.url === "/api/products" && req.method === "GET") {
    productsController.getProducts(req, res);
  } else if (req.url.match(/\/api\/products\/([a-z0-9-]+)/) && req.method === "GET") {
    const id = req.url.split('/')[3]
    productsController.getProductById(req, res, id);
  } else if(req.url === "/api/products" && req.method === "POST") {
    productsController.createProduct(req, res);
  } else if (req.url.match(/\/api\/products\/([a-z0-9-]+)/) && req.method === "PUT") {
    const id = req.url.split('/')[3]
    productsController.updateProduct(req, res, id);
  } else if (req.url.match(/\/api\/products\/([a-z0-9-]+)/) && req.method === "DELETE") {
    const id = req.url.split('/')[3]
    productsController.deleteProduct(req, res, id);
  }else {
    res.writeHead(404, { "Content-Type": "application-json" });
    res.end(JSON.stringify({ message: "Route not found" }));
  }
});

const port = process.env.PORT || 5000;

server.listen(port, () => console.log(`Server running on port ${port}`));
