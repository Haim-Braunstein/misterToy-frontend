import { Link } from "react-router-dom"



export function ToyPreview({ toy }) {
    return (
        <article className=" toy-preview ">
            <h3>{toy.name}</h3>
            <div className="toy-info">
                <p>Price: <span>${toy.price.toLocaleString()}</span></p>
                <h4>{`${toy.inStock ? 'In Stock' : 'Out of stock'}`}</h4>
            </div>
            <Link to={`/toy/edit/${toy._id}`}>Edit</Link> &nbsp; | &nbsp;
            <Link to={`/toy/${toy._id}`}>Details</Link>
        </article>
    )
}

