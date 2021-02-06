import axios from "axios";
import Link from "next/link";
import { useRouter } from 'next/router';
import { useEffect, useState } from "react";
import PageTitle from "../../components/layout/PageTitle";

export default (props) => {
    const [disciplina, setDisciplina] = useState(null)
    const { query, push } = useRouter();

    useEffect(() => {
        loadDisciplina()
    }, [])

    const loadDisciplina = async () => {
        try {
            const { data } = await axios.get(`/api/disciplinas/${query.id}`);
            // const { data } = await axios.get(`/api/disciplinas/60195270997703550c77e1c6`);
            setDisciplina(data)
        } catch (e) {
        }

    }

    return (
        <div>

            <PageTitle 
                title={disciplina?.name} 
                subtitle={`${disciplina?.aulas?.length} aulas`} 
                actions={<i className="zmdi zmdi-more-vert actions__item" />}/>

            <div className="card">
                <div className="listview listview--bordered">
                    {disciplina?.aulas.map(aula => (
                        <div key={aula._id} className="listview__item" style={{cursor: 'pointer'}}>
                            <div className="listview__content" onClick={() => push(`/aulas/${aula._id}`)}>
                                <div className="listview__heading">
                                    {aula.name}
                                </div>
                                <p>{aula.questoes} questões</p>
                            </div>
                            <div className="actions listview__actions">
                                <i className="zmdi zmdi-more-vert actions__item" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
