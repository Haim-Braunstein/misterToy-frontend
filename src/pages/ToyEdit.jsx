import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { toyService } from "../services/toy.service"
import { saveToy } from "../store/actions/toy.actions"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service"
import { LabelsSelect } from "../cmps/LabelsSelect"

export function ToyEdit() {
    const [toyToEdit, setToyToEdit] = useState(toyService.getEmptyToy())

    const { toyId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if (!toyId) return
        toyService.getToyById(toyId).then(toy => {
            setToyToEdit(toy)
        })
    }, [])

    function handleChange(e) {
        const field = e.target.name
        const value = e.target.type === 'number' ? +e.target.value : e.target.value
        setToyToEdit(prevToy => ({ ...prevToy, [field]: value }))
    }

    function onSetLabel(label) {
        const labels = toyToEdit.labels.includes(label) ? toyToEdit.labels.filter(l => l !== label) : [label, ...toyToEdit.labels]
        setToyToEdit(prevToy => ({ ...prevToy, labels }))
    }

    async function onSave(e) {
        e.preventDefault()
    
        const newToy = {
            ...toyToEdit,
            inStock: (toyToEdit.inStock === 'true') ? true : false
        }
    
        try {
            await saveToy(newToy);
            showSuccessMsg('Toy saved successfully')
            navigate('/toy')
        } catch (err) {
            showErrorMsg('Failed save toy, please try again')
        }
    }

    function isInStock() {
        return toyToEdit.inStock
    }

    if (!toyToEdit) return <div>Loading...</div>

    return (
        <form onSubmit={onSave} className=" edit-form" action="">
            <div>
                <label>
                    <span>Name</span>
                    <input
                        className="edit-input name-input"
                        value={toyToEdit.name}
                        onChange={handleChange}
                        type="text"
                        name="name" />
                </label>
            </div>
            <div>
                <label>
                    <span>Price</span>
                    <input
                        className="edit-input price-input"
                        value={toyToEdit.price}
                        onChange={handleChange}
                        type="number"
                        name="price" />
                </label>
            </div>
            <div>
                <LabelsSelect onSetLabel={onSetLabel} toyToEdit={toyToEdit} />
              
            </div>
            <div>
            In stock ?
                <select value={isInStock()} onChange={handleChange} name="inStock" className="edit-input">
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                </select>
            </div>
            <button onClick={onSave} className="save-toy-btn">Save</button>
        </form>
    )
}