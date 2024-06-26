import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"

import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service"
import { loadToys, removeToy, saveToy, setFilterBy, setSortBy } from "../store/actions/toy.actions"
import { toyService } from "../services/toy.service"
import { ToyList } from "../cmps/ToyList"
import { ToyFilter } from "../cmps/ToyFilter"
import { ToySort } from "../cmps/ToySort"



export function ToyIndex() {
    const toys = useSelector(storeState => storeState.toyModule.toys)
    const user = useSelector(storeState => storeState.userModule.loggedInUser)

    const filterBy = useSelector(storeState => storeState.toyModule.filterBy)
    const sortBy = useSelector(state => state.toyModule.sortBy)

    useEffect(() => {
        loadToys(filterBy, sortBy)
            .catch(err => {
                showErrorMsg('cannot load toys')
            })
    }, [filterBy, sortBy])

    async function onRemoveToy(toyId) {
        try {
            await removeToy(toyId)
            showSuccessMsg('Toy removed')
        } catch (err) {
            showErrorMsg('Cannot remove toy')
        }
    }

    function onSetFilter(filterBy) {
        setFilterBy(filterBy)
    }

    function onSetSort(sort) {
        setSortBy(sort)
    }

    if (!toys) return <h2>loading...</h2>
    return (
        <div>
            {/* {user && user.isAdmin ? ( */}
            {/* ) : ( */}
            <main className="toy-layout flex">
                <Link to="/toy/edit"><img className="add-toy" src="img/add-toy.png" alt="toy-img" title="add a toy" />

                </Link>
                <ToyFilter
                    filterBy={filterBy}
                    onSetFilter={onSetFilter} />
                <ToySort sortBy={sortBy} onSetSort={onSetSort} />
                <ToyList
                    toys={toys}
                    onRemoveToy={onRemoveToy}
                />
            </main>
            {/* ) */}
            {/* } */}
            {(!toys.length) && <div className="no-toys">No toys to show...</div>}
        </div >
    )
}


