import axios from "axios";
import Link from "next/link";
import { useRouter } from 'next/router';
import { useEffect, useState } from "react";

export default () => {

    const [aula, setAula] = useState(null);
    const { query } = useRouter();

    useEffect(() => {
        loadAula()
    }, [])

    const loadAula = async () => {
        try {
            const { data } = await axios.get(`/api/aulas/${query.id}?questoes=1&disciplina=1&registros=1`);

            setAula(data)
        } catch (error) {

        }
    }
    return (
        <div>
            <h1>{aula?.name}</h1>
            <Link href={`/disciplinas/${aula?.disciplina?._id}`}>
                <a>
                    {aula?.disciplina?.name}
                </a>
            </Link>
            <p>

                {aula?.questoes.length}
            </p>
        </div>
    )
}
