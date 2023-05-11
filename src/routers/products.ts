import express from 'express';
import { Product } from '../models/products.js';
import { User, UserDocumentInterface } from '../models/users.js';

export const productRouter = express.Router();

productRouter.post('/products', async (req, res) => {
    let usuariosRef: typeof User[] = [];
    let usuarios: string[] = [];

    try {
        for (let i = 0; i < usuarios.length; i++) {
            const users = await User.findOne({ID: usuarios[i]});
            if (!users) {
              return res.status(404).send({
                error: "usuario no encontrado" 
              });
            }
            usuariosRef.push(users._id);
        }
        req.body.usuarios = usuariosRef;
        const product = new Product(req.body);
        
        await product.save()
        return res.status(201).send(product);
    }catch (error) { 
    return res.status(400).send(error);
  }
})

