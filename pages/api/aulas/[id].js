import { ObjectId } from "mongodb";
import connect from "../../../utils/database"

export default async (req, res) => {
    const { id, questoes = '0', registros = '0', disciplina = '0' } = req.query;
    const { db } = await connect();

    const aggregates = [];

    aggregates.push({
        $match: { _id: ObjectId(id) }
    })

    if (disciplina === '1') {
        aggregates.push({
            $lookup: {
                from: 'disciplinas',
                as: 'disciplina',
                localField: 'disciplina_id',
                foreignField: '_id'
            }
        })
        aggregates.push({
            $project: {
                disciplina: {$arrayElemAt: ["$disciplina", 0]},
                name: 1,
                ordem: 1,
                disciplina_id: 1,
                questoes: 1
            }
        })
    }

    if (registros === '1') {
        aggregates.push({
            $lookup: {
                from: 'registros',
                as: 'registros',
                localField: '_id',
                foreignField: 'aula_id'
            }
        })
    }

    if (questoes === '1') {
        aggregates.push({
            $lookup: {
                from: 'questoes',
                as: 'questoes',
                localField: '_id',
                foreignField: 'aula_id'
            }
        })
    }

    const [aula] = await db.collection('aulas')
        .aggregate(aggregates).toArray();

    res.send(aula);
}