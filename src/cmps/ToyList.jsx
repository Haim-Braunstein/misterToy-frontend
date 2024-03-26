import { ToyPreview } from "./ToyPreview"


export function ToyList({ toys, onRemoveToy, onEditToy }) {

    return (
        <section>
            <ul className="toy-list">
                {
                    toys.map(toy => (
                        <li className=" clean-list" key={toy._id}>
                            <div>
                                <ToyPreview toy={toy} />
                                <button className="remove-btn btn" onClick={() => { onRemoveToy(toy._id) }}>X</button>
                                <button className="remove-btn btn" onClick={() => { onEditToy(toy) }}>Edit</button>
                            </div>
                        </li>
                    ))
                }
            </ul>
        </section>
    )
}
