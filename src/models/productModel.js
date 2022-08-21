const path = require("path");
const { v4: uuidv4 } = require("uuid");
let products = require("../../data/products.json");
const { writeDataToFile } = require("../utils/fileUtils");

const getAll = () => {
    return new Promise((resolve, reject) => {
        resolve(products);
    });
};

const getById = (id) => {
    return new Promise((resolve, reject) => {
        const product = products.find((product) => product.id === id);
        resolve(product);
    });
};

const create = (product) => {
    return new Promise((resolve, reject) => {
        const newProduct = { id: uuidv4(), ...product };
        products.push(newProduct);
        const reqPath = path.join(__dirname, "../../data/products.json");
        //TODO handle the error from write
        writeDataToFile(reqPath, products);
        resolve(newProduct);
    });
};

const update = (id, product) => {
    return new Promise((resolve, reject) => {
        const index = products.findIndex((product) => product.id === id);
        products[index] = { id, ...product };
        const reqPath = path.join(__dirname, "../../data/products.json");
        //TODO handle the error from write
        writeDataToFile(reqPath, products);
        resolve(products[index]);
    });
};

const _delete = (id) => {
    return new Promise((resolve, reject) => {
        products = products.filter((product) => product.id === id);
        const reqPath = path.join(__dirname, "../../data/products.json");
        //TODO handle the error from write
        writeDataToFile(reqPath, products);
        resolve(true);
    });
};

module.exports = {
    getAll,
    getById,
    create,
    update,
    _delete,
};
