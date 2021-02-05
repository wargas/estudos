import { ObjectId } from 'mongodb';
import connect from '../../../utils/database';

export default async (req, res) => {
    const { disciplina = null } = req.query;
    const { db } = await connect();

    const aggregates = [];

    if(disciplina) {
        aggregates.push({
            $match: {disciplina_id: ObjectId(disciplina)}
        })
    }

    aggregates.push({
        $sort: { ordem: 1}
    })

    const disciplinas = await db.collection('aulas')
        .aggregate(aggregates)
        .toArray();

    res.send(disciplinas)
}