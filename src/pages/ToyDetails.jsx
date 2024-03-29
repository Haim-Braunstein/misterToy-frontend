import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { toyService } from "../services/toy.service"
import { showErrorMsg } from "../services/event-bus.service"

export function ToyDetails() {
    const params = useParams()
    const navigate = useNavigate()
    const [currToy, setCurrToy] = useState(null)

    useEffect(() => {
        const { id } = params
        toyService.getToyById(id)
            .then(toy => {
                if (!toy) return navigate('/toy')
                setCurrToy(toy)
            })
            .catch(() => {
                showErrorMsg('Had issues loading toy');
            })
    }, [])

    function onAddMsg(toyId) {
        const txt = prompt('Enter a msg')
        toyService.AddToyMsg(toyId, txt)
    }


    if (!currToy) return <h4>loading...</h4>
    const { _id, name, price, labels, inStock, createdAt } = currToy
    const formattedDate = new Date(createdAt).toLocaleString('he')
    return (
        <div className="toy-details flex ">
            <div className="toy-data-container">
                <h1>{name}</h1>
                <p>Price: <span>${price.toLocaleString()}</span></p>
                <h3>Added at: {formattedDate}</h3>
                <h4>{`${inStock ? 'In Stock' : 'Out of stock'}`}</h4>
                <h2>Category:</h2>
                <ul>
                    {labels.map((label, idx) => (
                        <li key={idx}>{label}</li>
                    ))}
                </ul>
                <h2>Id: {_id}</h2>
                <button onClick={() => { onAddMsg(_id) }}>Add msg</button>

                <button className="back-btn" onClick={() => navigate('/toy')}>
                    Back to toy's list
                </button>
            </div>
        </div>
    )
}

