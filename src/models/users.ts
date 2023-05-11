import { Document, model, Schema } from 'mongoose';
import validator from 'validator';

export interface UserDocumentInterface extends Document {
  nombre: string,
  correoElectronico: string,
  nombreUsuario: string,
  preferenciasCompra: 'deporte'| 'videojuegos' | 'moda' | 'cocina',
}

const UserSchema = new Schema<UserDocumentInterface>({
  nombre: {
    type: String,
    required: true,
  },
  correoElectronico: {
    type: String,
    required: true,
    unique: true,
  },
  nombreUsuario: {
    type: String,
    required: true,
    unique: true,
  },
  preferenciasCompra: {
    type: String,
    required: true,
  },
});

export const User = model<UserDocumentInterface>('User', UserSchema);

