import { Router } from 'express';
import { check } from 'express-validator';
import { createPublication, getPublications, updatePublication, deletePublication } from './publication.controller.js';
import { validateFields } from '../../middlewares/validate-fields.js';
import { validateJWT } from '../../middlewares/validate-jwt.js';

//Permisos de cada routes
const router = Router();
router.get('/', getPublications);

router.post('/', [
    validateJWT,
    check('title', 'El título es de carácter obligatorio').not().isEmpty(),
    check('category', 'La categoría es de carácter obligatorio').not().isEmpty(),
    check('text', 'El texto es de carácter obligatorio').not().isEmpty(),
    validateFields
], createPublication);

router.put('/:id', [
    validateJWT,
    check('id', 'No es un ID válido').isMongoId(),
    validateFields
], updatePublication);

router.delete('/:id', [
    validateJWT,
    check('id', 'No es un ID válido').isMongoId(),
    validateFields
], deletePublication);

export default router;