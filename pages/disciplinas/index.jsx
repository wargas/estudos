import axios from "axios";
import Link from 'next/link';
import { useEffect, useState } from "react";

import { useRouter } from "next/router";
import PageTitle from "../../components/layout/PageTitle";
import { Upload } from "antd";

export default (props) => {

    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);

    const {push} = useRouter()

    useEffect(() => {
        loadDisciplinas();
    }, [])

    const loadDisciplinas = async () => {
        setLoading(true)
        try {
            const { data } = await axios.get("/api/disciplinas");

            setItems(data)
        } catch (error) {

        }
        setLoading(false)
    }


    return (
        <>
            <PageTitle title="Disciplinas" subtitle="Minhas disciplinas" actions={
                <i className="zmdi zmdi-plus actions__item" />
            } />

            <div>
                {loading && (
                    <div>
                        <p>carregando...</p>
                    </div>
                )}
                <div className="row">
                    {!loading && items.map(item => (
                        <div className="col-4">
                            <div
                                style={{ cursor: 'pointer' }}
                                className="card"
                                key={item._id}>
                                <div className="card-body">
                                    <h4 className="card-title">{item.name}</h4>
                                    <h6 className="card-subtitle" onClick={() => push(`/disciplinas/${item._id}`)}>
                                        {item.aulas.length} aulas
                                    </h6>
                                </div>
                                <div className="actions">
                                    <i className="zmdi zmdi-more-vert actions__item"></i>
                                </div>
                            </div>
                        </div>
                    ))
                    }
                </div>
            </div>

        </>
    )
}
