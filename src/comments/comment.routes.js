import { Router } from 'express';
import { check } from 'express-validator';
import { getComments, createComment, updateComment, deleteComment } from './comment.controller.js';
import { validateFields } from '../../middlewares/validate-fields.js';
import { validateJWT } from '../../middlewares/validate-jwt.js';
import { existsPublicationById } from '../../helpers/db-validators.js';

const router = Router();
router.get('/:publicationId', getComments);

router.post('/', [
    validateJWT,
    check('content', 'El contenido es obligatorio').not().isEmpty(),
    check('publicationId', 'No es un ID válido').isMongoId(),
    check('publicationId').custom(existsPublicationById),
    validateFields
], createComment);

router.put('/:id', [
    validateJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('content', 'El contenido es de carácter obligatorio').not().isEmpty(),
    validateFields
], updateComment);

router.delete('/:id', [
    validateJWT,
    check('id', 'No es un ID válido').isMongoId(),
    validateFields
], deleteComment);

export default router;