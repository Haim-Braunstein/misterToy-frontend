import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"

import { showErrorMsg } from "../services/event-bus.service"
import { loadToys, removeToy, saveToy, setFilterBy, setSortBy } from "../store/actions/toy.actions"
import { toyService } from "../services/toy.service"
import { ToyList } from "../cmps/ToyList"
import { ToyFilter } from "../cmps/ToyFilter"
import { ToySort } from "../cmps/ToySort"


export function ToyIndex() {
    const dispatch = useDispatch()
    const toys = useSelector(storeState => storeState.toyModule.toys)
    console.log("🚀 ~ ToyIndex ~ toys:", toys)
    const filterBy = useSelector(storeState => storeState.toyModule.filterBy)
    const sortBy = useSelector(state => state.toyModule.sortBy)



    useEffect(() => {
        loadToys(filterBy, sortBy)
            .catch(err => {
                showErrorMsg('cannot load toys')
            })
    }, [filterBy, sortBy])

    function onRemoveToy(toyId) {
        removeToy(toyId)
            .then(() => {
                showSuccessMsg('Toy removed')
            })
            .catch(err => {
                showErrorMsg('Cannot remove toy')
            })
    }

    function onSetFilter(filterBy) {
        setFilterBy(filterBy)

    }

    function onSetSort(sort) {
        setSortBy(sort)
    }

    function onAddToy() {
        const toyName = prompt('Enter a toy\'s name')
        const toyToSave = toyService.getEmptyToy(toyName)
        saveToy(toyToSave)
            .then((savedToy) => {
                showSuccessMsg(`Toy added (id: ${savedToy._id})`)
            })
            .catch(err => {
                showErrorMsg('Cannot add toy')
            })
    }

    function onEditToy(toy) {
        const price = +prompt('New price?')
        const toyToSave = { ...toy, price }

        saveToy(toyToSave)
            .then((savedToy) => {
                showSuccessMsg(`Toy updated to price: ${savedToy.price}`)
            })
            .catch(err => {
                showErrorMsg('Cannot update toy')
            })
    }

    if (!toys) return <h2>loading...</h2>
    return (
        <div>
            <h3>Toy Kingdom</h3>
            <Link to="/toy/edit">Add Toy</Link>
            <button className='add-btn' onClick={onAddToy}>Add Toy</button>
            <main className="toy-layout">
                <ToyFilter
                    filterBy={filterBy}
                    onSetFilter={onSetFilter} />
                <ToySort sortBy={sortBy} onSetSort={onSetSort} />
                <ToyList
                    toys={toys}
                    onRemoveToy={onRemoveToy}
                    onEditToy={onEditToy}
                />
                <hr />
            </main>
        </div>
    )

}