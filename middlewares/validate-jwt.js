import jwt from 'jsonwebtoken';
import User from '../src/users/user.model.js';

export const validateJWT = async (req, res, next) => {
    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({ msg: 'No hay token en la petición' });
    }

    try {
        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        const user = await User.findById(uid);

        if (!user) {
            return res.status(401).json({ msg: 'Token no válido - usuario no existe DB' });
        }

        if (!user.state) {
            return res.status(401).json({ msg: 'Token no válido - usuario con estado: false' });
        }

        req.user = user;
        next();

    } catch (error) {
        console.log(error);
        res.status(401).json({ msg: 'Token no válido' });
    }
}