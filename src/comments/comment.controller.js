import Comment from './comment.model.js';
import Publication from '../publications/publication.model.js';

export const getComments = async (req, res) => {
    const { publicationId } = req.params;

    const publication = await Publication.findById(publicationId);
    if (!publication) {
        return res.status(404).json({ msg: 'Publicación no encontrada' });
    }

    const comments = await Comment.find({ publication: publicationId, state: true }).populate('author', 'name');
    res.json(comments);
}

export const createComment = async (req, res) => {
    const { content, publicationId } = req.body;

    const publication = await Publication.findById(publicationId);
    if (!publication) {
        return res.status(404).json({ msg: 'Publicación no encontrada' });
    }

    const comment = new Comment({
        content,
        publication: publicationId,
        author: req.user._id
    });

    await comment.save();
    res.status(201).json(comment);
}

export const updateComment = async (req, res) => {
    const { id } = req.params;
    const { content } = req.body;

    const comment = await Comment.findById(id);

    if (!comment) {
        return res.status(404).json({ msg: 'Comentario no encontrado' });
    }

    if (comment.author.toString() !== req.user._id.toString()) {
        return res.status(401).json({ msg: 'No tiene permiso para editar este comentario' });
    }

    const updatedComment = await Comment.findByIdAndUpdate(id, { content }, { new: true });
    res.json(updatedComment);
}

export const deleteComment = async (req, res) => {
    const { id } = req.params;
    const comment = await Comment.findById(id);

    if (!comment) {
        return res.status(404).json({ msg: 'Comentario no encontrado' });
    }

    if (comment.author.toString() !== req.user._id.toString()) {
        return res.status(401).json({ msg: 'No tiene permiso para eliminar este comentario' });
    }

    const deletedComment = await Comment.findByIdAndUpdate(id, { state: false }, { new: true });
    res.json(deletedComment);
}