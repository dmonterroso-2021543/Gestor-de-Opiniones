import e from 'express';
import User from '../src/users/user.model.js';
import Publication from '../src/publications/publication.model.js'

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

export const existsPublicationById = async (id = '') => {
    const publication = await Publication.findById(id);
    if (!publication) {
        throw new Error(`La publicación con ID ${id} no existe`);
    }
}