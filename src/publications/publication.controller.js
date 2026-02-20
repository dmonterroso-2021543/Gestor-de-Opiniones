import Publication from './publication.model.js';

export const getPublications = async (req, res) => {
    const { limite = 10, desde = 0 } = req.query;
    const query = { state: true };

    const [total, publications] = await Promise.all([
        Publication.countDocuments(query),
        Publication.find(query)
            .populate('author', 'username')
            .skip(Number(desde))
            .limit(Number(limite))
    ]);

    res.json({ total, publications });
}

export const createPublication = async (req, res) => {
    const { title, category, text } = req.body;
    const publication = new Publication({ title, category, text, author: req.user._id });
    await publication.save();
    res.status(201).json(publication);
}

export const updatePublication = async (req, res) => {
    const { id } = req.params;
    const { state, author, ...data } = req.body;
    const publication = await Publication.findById(id);

    if (!publication) {
        return res.status(404).json({ msg: 'Publicación no encontrada' });
    }
    if (publication.author.toString() !== req.user._id.toString()) {
        return res.status(401).json({ msg: 'No tiene permiso para editar esta publicación' });
    }

    const updatedPublication = await Publication.findByIdAndUpdate(id, data, { new: true });
    res.json(updatedPublication);
}

export const deletePublication = async (req, res) => {
    const { id } = req.params;
    const publication = await Publication.findById(id);

    if (!publication) {
        return res.status(404).json({ msg: 'Publicación no encontrada' });
    }
    if (publication.author.toString() !== req.user._id.toString()) {
        return res.status(401).json({ msg: 'No tiene permiso para eliminar esta publicación' });
    }

    const deletedPublication = await Publication.findByIdAndUpdate(id, { state: false }, { new: true });
    res.json(deletedPublication);
}