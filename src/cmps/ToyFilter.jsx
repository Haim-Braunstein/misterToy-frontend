import { useEffect, useRef, useState } from "react"
import { utilService } from "../services/util.service"


export function ToyFilter({ onSetFilter, filterBy }) {
    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })
    const debouncedSetFilterRef = useRef(utilService.debounce(onSetFilter, 300))

    useEffect(() => {
        debouncedSetFilterRef.current(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        let { value, name: field, type } = target
        value = (type === 'number') ? +value : value
        setFilterByToEdit((prevFilter) => {
            return ({ ...prevFilter, [field]: value })
        })
    }


    return (
        <section className="toy-filter">
            <form>
                <h3>Filter our toys</h3>
                <div className="radio-sort flex">
                    <label htmlFor="all">

                        <input defaultChecked type="radio" name="inStock" value="all" id="all" onChange={handleChange} />
                        All
                    </label>
                    <label htmlFor="in-stock">
                        <input type="radio" name="inStock" value="in-stock" id="in-stock" onChange={handleChange} />
                        In stock
                    </label>
                    <label htmlFor="out-of-stock">
                        <input type="radio" name="inStock" value="out-of-stock" id="out-of-stock" onChange={handleChange} />
                        Out of stock
                    </label>
                </div>
                <div className="search-inputs">
                    <input
                        className="filter-input"
                        placeholder="What you want to buy?"
                        name="txt"
                        value={filterByToEdit.txt}
                        onChange={handleChange}
                    />
                    <label htmlFor="maxPrice"></label>
                    <input type="number"
                        className="filter-input"
                        id="maxPrice"
                        name="maxPrice"
                        placeholder="By max price"
                        value={filterByToEdit.maxPrice || ''}
                        onChange={handleChange}
                    />
                </div>
            </form>
        </section>
    )
}
