import axios from "axios";
import Link from 'next/link';
import { useEffect, useState } from "react";

import { useRouter } from "next/router";

export default (props) => {

    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    useEffect(() => {
        loadDisciplinas();
    }, [])

    const loadDisciplinas = async () => {
        setLoading(true)
        try {
            const { data } = await axios.get("http://localhost:3000/api/disciplinas");

            setItems(data)
        } catch (error) {

        }
        setLoading(false)
    }


    return (
        <div>

            {loading && (
                <p>...carregando</p>
            )}

            {!loading && (
                <ul>
                    {items.map(item => (
                        <li key={item._id}>
                            <Link href={`/disciplinas/${item._id}`}>
                                <a>{item.name}</a>
                            </Link>
                        </li>
                    ))}
                </ul>
            )}

        </div>
    )
}
