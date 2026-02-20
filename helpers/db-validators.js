import User from '../src/users/user.model.js';

export const existsEmail = async (email = '') => {
    const emailExists = await User.findOne({ email });
    if (emailExists) {
        throw new Error(`El correo ${email} ya está registrado, usa otro`);
    }
}

export const existsUsername = async (username = '') => {
    const usernameExists = await User.findOne({ username });
    if (usernameExists) {
        throw new Error(`El username ${username} ya está registrado, usa otro`);
    }
}