import { Router } from 'express';
import { check } from 'express-validator';
import { updateUser } from './user.controller.js';
import { validateFields } from '../../middlewares/validate-fields.js';
import { validateJWT } from '../../middlewares/validate-jwt.js';

const router = Router();

router.put('/:id', [
    validateJWT,
    check('id', 'No es un ID válido').isMongoId(),
    validateFields
], updateUser);

export default router;