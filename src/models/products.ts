import { Document, model, Schema } from 'mongoose';
import { UserDocumentInterface } from './users.js';

export interface ProductDocumentInterface extends Document {
  nombre: string,
  descripcion: string,
  categoria: 'deporte'| 'videojuegos' | 'moda' | 'cocina',
  usuarios: UserDocumentInterface[],
}

const ProductSchema = new Schema<ProductDocumentInterface>({
  nombre: {
    type: String,
    required: true,
  },
  descripcion: {
    type: String,
    required: true,
  },
  categoria: {
    type: String,
    required: true,
  },
  usuarios: {
    type: [Schema.Types.ObjectId],
    required: true,
    ref: 'User',
  },
});

export const Product = model<ProductDocumentInterface>('Product', ProductSchema);

