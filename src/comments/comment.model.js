import { Schema, model } from 'mongoose';

const CommentSchema = Schema({
    content: {
        type: String,
        required: [true, 'El contenido del comentario es de carácter obligatorio']
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'El autor del comentario es de carácter obligatorio']
    },
    publication: {
        type: Schema.Types.ObjectId,
        ref: 'Publication',
        required: [true, 'La publicación del comentario es de carácter obligatorio']
    },
    state: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

export default model('Comment', CommentSchema);