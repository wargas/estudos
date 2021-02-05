import axios from "axios";
import Link from "next/link";
import { useRouter } from 'next/router';
import { useEffect, useState } from "react";

export default (props) => {
    const [disciplina, setDisciplina] = useState(null)
    const { query } = useRouter();

    useEffect(() => {
        loadDisciplina()
    }, [])

    const loadDisciplina = async () => {
        try {
            // const { data } = await axios.get(`/api/disciplinas/${query.id}`);
            const { data } = await axios.get(`/api/disciplinas/60195270997703550c77e1c6`);
            setDisciplina(data)
        } catch (e) {
        }

    }

    return (
        <div>
            <h1>{disciplina?.name}</h1>
            
            <table>
                {disciplina?.aulas.map(aula => (
                    <tr>
                        <td>{aula.name}</td>
                        <td>
                            {aula.respondidas[aula.respondidas.length - 1].acertos}/
                            {aula.respondidas[aula.respondidas.length - 1].total}
                        </td>
                        <td>
                            <Link href={`/aulas/${aula._id}`}>
                                Detalhe
                            </Link>
                        </td>
                    </tr>
                ))}
            </table>
        </div>
    )
}
