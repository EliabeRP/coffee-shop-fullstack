import jwt from 'jsonwebtoken';
import { UserModel } from '../models/UserModel.js';

class Auth {
  async authClient(req, res, next) {
    try {
      const { authorization } = req.headers;
      const token = authorization.split(' ')[1];
      const { id, email, role } = await jwt.verify(token, process.env.TOKEN_SECRET);
      req.user = { id, email, role };
      next();
    } catch (error) {
      return res.status(401).json({ message: 'Sua sessão expirou. Faça login novamente.' });
    }
  };

  async authAdmin(req, res, next) {
    try {
      const { authorization } = req.headers;
      const token = authorization.split(' ')[1];
      const { id, email, role } = await jwt.verify(token, process.env.TOKEN_SECRET);
      if (role !== 'admin') {
        return res.status(403).json({ message: 'Você não possui a permissão necessária para acessar esta rota.' });
      }
      req.user = { id, email, role };
      next();
    } catch (error) {
      return res.status(401).json({ message: 'Sua sessão expirou. Faça login novamente.' });
    }
  };

};

export default new Auth();