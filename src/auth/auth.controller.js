import bcryptjs from 'bcryptjs';
import User from '../users/user.model.js';
import { generateJWT } from '../../helpers/generate-jwt.js';

export const login = async (req, res) => {
    const { identifier, password } = req.body;

    try {
        const user = await User.findOne({
            $or: [{ email: identifier }, { username: identifier }]
        });

        if (!user) {
            return res.status(400).json({ msg: 'Usuario / Password no son correctos - correo/user' });
        }

        if (!user.state) {
            return res.status(400).json({ msg: 'Usuario / Password no son correctos - estado: false' });
        }

        const validPassword = bcryptjs.compareSync(password, user.password);
        if (!validPassword) {
            return res.status(400).json({ msg: 'Usuario / Password no son correctos - password' });
        }

        const token = await generateJWT(user.id);

        res.json({
            user,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Hable con el administrador' });
    }
}

export const register = async (req, res) => {
    const { name, username, email, password } = req.body;
    const user = new User({ name, username, email, password });

    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);

    await user.save();

    res.json({
        user
    });
}