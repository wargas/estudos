import connect from '../../../utils/database';

export default async (req, res) => {
    const { db } = await connect();

    const disciplinas = await db.collection('disciplinas')
        .aggregate([
            {$sort: {name: 1}},
            {$match: {arquivada: false}},
            {$lookup: {
                as: 'aulas',
                from: 'aulas',
                localField: '_id',
                foreignField: 'disciplina_id'
            }}
        ])
        .toArray();

    res.send(disciplinas)
}