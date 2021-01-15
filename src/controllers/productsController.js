import Product from '../models/Product';
import {messageOut,messageErrorCatch} from '../libs/helper';


const createProduct = async (req,res) => {
    try {
        const { name, category, price, imgUrl } = req.body;
        const newProduct = Product({name, category, price, imgUrl});
        const productSaved = await newProduct.save();

        if(!productSaved) return res.status(400).json(messageOut(1,'Error al crear producto, Reintente'));

        res.status(201).json(messageOut(0,'Producto creado',productSaved));

    } catch (error) {
        messageErrorCatch(error,res,'createProduct');
    }
};

const getProduct = async (req,res) => {
    try {
        const products = await Product.find();
        if(!products) return res.status(400).json(messageOut(1,'Error al obtener productos, Reintente'));
        res.json(products);
    } catch (error) {
        messageErrorCatch(error,res,'getProduct');
    }
};

const getProductById = async (req,res) => {
    try {
        const product = await Product.findById(req.params.productId);
        if(!product) return res.status(400).json(messageOut(1,'Producto no encontrado'));
        res.status(200).json(messageOut(0,'Producto encontrado',product));
    } catch (error) {
        messageErrorCatch(error,res,'getProductById');
    }
};

const updateProductById = async (req,res) => {
   try {
        const updateProduct = await Product.findByIdAndUpdate(req.params.productId, req.body, { new: true}); //el param new:true es para que devuelva el product ya actualizado
        if(!updateProduct) return res.status(400).json(messageOut(1,'Error al guardar Producto, Reintente '));
        res.status(204).json(messageOut(0,'Producto Actulizado Correctamente',updateProduct));
   } catch (error) {
    messageErrorCatch(error,res,'updateProductById');
   }

};

const deleteProductById = async (req,res) => {
    try {
        const deleteProduct  = await Product.findByIdAndDelete(req.params.productId);
        if(!deleteProduct) return res.status(400).json(messageOut(1,'Error al eliminar Producto, Reintente '));
        res.status(204).json(messageOut(0,'Product Eliminado correctamente'));
    } catch (error) {
        messageErrorCatch(error,res,'deleteProductById');
    }
};

module.exports = {
    createProduct,
    getProduct,
    getProductById,
    updateProductById,
    deleteProductById
}