import { Link } from "react-router-dom"

import { Delete } from "@mui/icons-material"
import { Button, IconButton } from "@mui/material"



export function ToyPreview({ toy, onRemoveToy }) {
    return (
        <article className=" toy-preview ">
            <h3>{toy.name}</h3>
            <div className="toy-info">
                <p>Price: <span>${toy.price.toLocaleString()}</span></p>
                <h4>{`${toy.inStock ? 'In Stock' : 'Out of stock'}`}</h4>
            </div>
            <div className="actions-btns flex">
                <Link to={`/toy/edit/${toy._id}`}className="edit-link" >Edit</Link> &nbsp; | &nbsp;
                <Link to={`/toy/${toy._id}`} className="details-link">Details</Link>
                <button className="remove-btn btn" onClick={() => { onRemoveToy(toy._id) }}>X</button>
            </div>

        </article>
    )
}

