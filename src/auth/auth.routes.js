import { Router } from 'express';
import { check } from 'express-validator';
import { login, register } from './auth.controller.js';
import { validateFields } from '../../middlewares/validate-fields.js';
import { existsEmail, existsUsername } from '../../helpers/db-validators.js';

const router = Router();

router.post('/login', [
    check('identifier', 'El correo o username es obligatorio').not().isEmpty(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    validateFields
], login);

router.post('/register', [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('username', 'El username es obligatorio').not().isEmpty(),
    check('username').custom(existsUsername),
    check('email', 'El correo no es válido').isEmail(),
    check('email').custom(existsEmail),
    check('password', 'La contraseña debe tener más de 6 letras').isLength({ min: 6 }),
    validateFields
], register);

export default router;