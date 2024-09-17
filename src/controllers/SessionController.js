import User from '../models/User';
import * as Yup from 'yup';

class SessionController{
    async store(req, res){

        const schema = Yup.object().shape({
            email: Yup.string().email().required(),
        });
        const { email } = req.body;

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({error: 'Falha na validação!'});
        }
        // Verificando se o usuario existe
        let user = await User.findOne({ email });

        // Se não, cadastra
        if(!user){
            user = await User.create({ email });
        }

        return res.json(user);
    }
}

export default new SessionController();