import { useEffect, useRef, useState } from "react"
import { utilService } from "../services/util.service"


export function ToyFilter({ onSetFilter, filterBy }) {
    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })
    const debouncedSetFilterRef = useRef(utilService.debounce(onSetFilter, 300))

    useEffect(() => {
        debouncedSetFilterRef.current(filterByToEdit)
    }, [filterByToEdit])
    console.log("🚀 ~ ToyFilter ~ filterByToEdit:", filterByToEdit)

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
                <div className="radio-sort flex justify-center align-center">
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
                        placeholder="Search toy..."
                        name="txt"
                        value={filterByToEdit.txt}
                        onChange={handleChange}
                    />
                 <label htmlFor="maxPrice">Max price:</label>
                <input type="number"
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
