
const { MongoClient, ObjectId } = require('mongodb');
const extract = require('./utils/extract');
const md_root = "C:\\Users\\warga\\Documents\\SEFAZ-CE\\QUESTOES";
const path = require('path');
const fs = require('fs');


(async () => {
    const uri = 'mongodb+srv://wargas:wrgs2703@cluster0.frhvw.mongodb.net/concursos?retryWrites=true&w=majority';
    const client = await new MongoClient(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    await client.connect()

    const db = await client.db('concursos');

    // console.log('Updating aulas')
    // const disciplinas = await db.collection('disciplinas')
    //     .find({}).toArray();

    // disciplinas.map(async (item, index) => {
    //     await db.collection('aulas')
    //         .updateMany({disciplina_id: item.id},{$set: {
    //             disciplina_id: ObjectId(item._id)
    //         }})
    // })

    // console.log('Updating filhos aulas')
    // const aulas = await db.collection('aulas')
    //     .find({}).toArray()
    // aulas.map(async (item, index) => {
    //     const file = path.join(md_root, item.markdown);

    //     if(await fs.existsSync(file)) {
    //         const questoes = await extract(file);

    //         await db.collection('questoes').insertMany(questoes.map(questao => {
    //             questao.aula_id = ObjectId(item._id)
    //             return questao;
    //         }))

            
    //     }     
    //     await db.collection('registros').updateMany({aula_id: item.id}, {
    //         $set: {
    //             aula_id: ObjectId(item._id)
    //         }
    //     })

    //     await db.collection('respondidas').updateMany({aula_id: item.id}, {
    //         $set: {
    //             aula_id: ObjectId(item._id)
    //         }
    //     })

    //     await db.collection('comentarios').updateMany({aula_id: item.id}, {
    //         $set: {
    //             aula_id: ObjectId(item._id)
    //         }
    //     })
    // })

    console.log('Buscando questoes');    
    const questoes = await db.collection('questoes').find({}).toArray();
    
    console.log('Updating filhos questoes')
    questoes.map( async (item, index) => {
        

        await db.collection('comentarios').updateMany({
            aula_id: ObjectId(item.aula_id),
            questao: item.questao_id
        }, {$set: {
            questao_id: ObjectId(item._id)
        }})
    })

    questoes.map( async (item, index) => {
        await db.collection('respondidas').updateMany({
            aula_id: ObjectId(item.aula_id),
            questao: item.questao_id
        }, {$set: {
            questao_id: ObjectId(item._id)
        }});
    })
    console.log('finalizamos');    


})()