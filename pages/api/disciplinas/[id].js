import { ObjectId } from "mongodb";
import connect from "../../../utils/database"

export default async (req, res) => {
    const { id } = req.query;
    const { db } = await connect();

    const aulas = await db.collection('aulas')
        .aggregate([
            {
                $match: { disciplina_id: ObjectId(id) }
            },
            {
                $lookup: {
                    from: 'view_respondidas_por_aula',
                    localField: '_id',
                    foreignField: 'aula_id',
                    as: 'respondidas'
                }
            }
        ]).toArray()

    const disciplina = await db.collection('disciplinas')
        .findOne({ _id: ObjectId(id) });

    disciplina.aulas = aulas

    res.send(disciplina);
}