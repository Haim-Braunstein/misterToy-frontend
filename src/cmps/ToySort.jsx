
export function ToySort({ sortBy, onSetSort }) {

    function handleSortChange(by) {
        const updatedSort = { ...sortBy, by }
        onSetSort(updatedSort)
    }

    function handleToggleDirection() {
        const updatedSort = { ...sortBy, asc: !sortBy.asc }
        onSetSort(updatedSort)
    }

    return <section className="toy-sort">
        <h3>Sort by</h3>
        <div className="sort-btns flex">
        <button onClick={() => handleSortChange('name')}> name</button>
        <button onClick={() => handleSortChange('price')}> price</button>
        <button onClick={handleToggleDirection}>Change direction {sortBy.asc ? '^' : 'v'}</button>
        </div>
    </section>
}