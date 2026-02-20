import bcryptjs from 'bcryptjs';
import User from './user.model.js';

export const updateUser = async (req, res) => {
    const { id } = req.params;
    const { _id, password, email, role, ...resto } = req.body;

    if (id !== req.user.id) {
        return res.status(401).json({ msg: 'No tiene permiso para actualizar este perfil' });
    }

    if (password) {
        if (!resto.oldPassword) {
            return res.status(400).json({ msg: 'Para cambiar la contraseña debe ingresar la contraseña anterior (oldPassword)' });
        }

        const userDB = await User.findById(id);
        const validOldPassword = bcryptjs.compareSync(resto.oldPassword, userDB.password);

        if (!validOldPassword) {
            return res.status(400).json({ msg: 'La contraseña anterior no coincide' });
        }

        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);
    }

    delete resto.oldPassword;

    const user = await User.findByIdAndUpdate(id, resto, { new: true });
    res.json(user);
}