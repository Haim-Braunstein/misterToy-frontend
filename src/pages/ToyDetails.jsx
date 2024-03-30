import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { toyService } from "../services/toy.service"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service"

export function ToyDetails() {
    const params = useParams()
    const navigate = useNavigate()
    const [currToy, setCurrToy] = useState(null)
    const [msgsToy, setMsgsToy] = useState([])
    const [inputMsg, setInputMsg] = useState('');


    useEffect(() => {
        const { id } = params
        toyService.getToyById(id)
            .then(toy => {
                if (!toy) return navigate('/toy')
                setCurrToy(toy)
            })
            .catch(() => {
                showErrorMsg('Had issues loading toy')
            })
    }, [msgsToy])

    async function onAddMsg(toyId) {
        if (inputMsg !== '') {
            try {
                await toyService.AddToyMsg(toyId, inputMsg)
                setMsgsToy(prevMsgs => [...prevMsgs, inputMsg])
                showSuccessMsg('Added message successfully ')
                setInputMsg('')
            } catch (error) {
                console.error('Failed to add toy message:', error)
                showErrorMsg('Failed to add toy message')
            }
        }
    }
    async function onRemoveToyMsg(toyId, msgId) {
        try {
            await toyService.RemoveToyMsg(toyId, msgId)
            setMsgsToy(prevMsgs => [...prevMsgs, toyId])
            showSuccessMsg('Removed message successfully ')
        } catch (error) {
            console.error('Failed to remove toy message:', error)
            showErrorMsg('Failed to remove toy message')
        }

    }

    function handleSubmit(event) {
        event.preventDefault()
        onAddMsg(_id)
    }


    if (!currToy) return <h4>loading...</h4>
    const { _id, name, price, labels, inStock, createdAt, msgs } = currToy
    const formattedDate = new Date(createdAt).toLocaleString('he')
    return (
        <div className="toy-details flex ">
            <div className="toy-data-container">
                <h1>{name}</h1>
                <p>Price: <span>${price.toLocaleString()}</span></p>
                <img src={`https://robohash.org/${name}?set=set2`} alt="" />
                <h3>Added at: {formattedDate}</h3>
                <h4>{`${inStock ? 'In Stock' : 'Out of stock'}`}</h4>
                <h2>Category:</h2>
                <ul>
                    {labels.map((label, idx) => (
                        <li key={idx}>{label}</li>
                    ))}
                </ul>
                <h2>Id: {_id}</h2>
                {/* <button onClick={() => { onAddMsg(_id) }}>Add msg</button> */}
                <div className="msg-input">
                    <form onSubmit={handleSubmit}>
                        <input
                            className="msg-input"
                            placeholder="Enter a message"
                            name="txt"
                            value={inputMsg}
                            onChange={(ev) => setInputMsg(ev.target.value)}
                        />
                    </form>
                </div>

                {msgs && (
                    <div>
                        <h3>User message</h3>
                        {msgs.map(msg => (
                            <div className="msg-container" key={msg.id}>
                                <p className=""> {msg.by.fullname}: {msg.txt}</p>
                                <button className="remove-msg-btn btn" onClick={() => { onRemoveToyMsg(_id, msg.id) }}>X</button>
                            </div>
                        ))}
                    </div>
                )}

                <Link className="edit-toy-details" to={`/toy/edit/${_id}`}>Edit</Link>
                <button className="back-btn" onClick={() => navigate('/toy')}>
                    Back to toy's list
                </button>
            </div>
        </div>
    )
}

