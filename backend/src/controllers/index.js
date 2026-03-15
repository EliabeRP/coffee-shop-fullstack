import bcrypt from "bcryptjs";
import UserModel from "../models/UserModel";
import jwt from "jsonwebtoken";

class Login{
    async index(req,res){
        const { email, password } = req.body;
        if( !email || !password){
            return res.status(400).json({errors: ['Campos não preenchidos.']});
        }
        const user = await UserModel.findOne({where: {email}});
        if(!user || !(await bcrypt.compare(password, user.password_hash))){
            return res.status(401).json({errors: ['Email ou senha inválidos.']});
        }
    

        const token = jwt.sign({id:user.id, email:user.email, role:user.role}, process.env.TOKEN_SECRET, {expiresIn: process.env.TOKEN_EXPIRATION});
        return res.status(200).json({token})

    }
}

export default new Login();