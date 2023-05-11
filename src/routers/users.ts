import express from 'express';
import { User} from '../models/users.js';

export const userRouter = express.Router();
/**
 *  crear un usuario en la base de datos.
 */
userRouter.post('/users', async (req, res) => {
    const user = new User(req.body);
  
    try {
        await user.save();
        return res.status(201).send(user);
      } catch (error) {
        return res.status(500).send(error);
      }
});

/**
 * obtener un usuario concreto de la base de datos según su nombre de usuario.
 */
userRouter.get('/users', async (req, res) => {
    const filter = req.query.username?{username: req.query.username.toString()}:{};
  
    try {
        const users = await User.find(filter);
    
        if (users.length !== 0) {
          return res.send(users);
        }
        return res.status(404).send();
      } catch (error) {
        return res.status(500).send(error);
      }
});

/**
 * actualizar un usuario concreto en la base de datos según su nombre de usuario.
 */
userRouter.patch('/users', async (req, res) => {
    if (!req.query.nombreUsuario) {
      return res.status(400).send({
        error: 'A username must be provided',
      });
    } 

      const allowedUpdates = ['nombre', 'correoElectronico', 'nombreUsuario', 'preferenciasCompra'];
      const actualUpdates = Object.keys(req.body);
      const isValidUpdate =
        actualUpdates.every((update) => allowedUpdates.includes(update));
  
      if (!isValidUpdate) {
        return res.status(400).send({
          error: 'Update is not permitted',
        });
      } 
      try {
        const user = await User.findOneAndUpdate({
          username: req.query.nombreUsuario.toString()
        },
        req.body,
        {
          new: true,
          runValidators: true
        });
    
        if (user) {
          return res.send(user);
        }
        return res.status(404).send();
      } catch (error) {
        return res.status(500).send(error);
      }
  });


  /**
   * borrar un usuario concreto de la base de datos según su nombre de usuario
   */
//   userRouter.delete('/users', async (req, res) => {
//     if (!req.query.nombreUsuario) {
//       return res.status(400).send({
//         error: 'A username must be provided',
//       });
//     }  
//     try {
//         const user = await User.findOne({
//             nombreUsuario: req.query.nombreUsuario.toString()
//         });
    
//         if (!user) {
//           return res.status(404).send();
//         }
    
//         const result = await Note.deleteMany({owner: user._id});
    
//         if (!result.acknowledged) {
//           return res.status(500).send();
//         }
    
//         await User.findByIdAndDelete(user._id);
//         return res.send(user);
//       } catch (error) {
//         return res.status(500).send(error);
//       }
// });