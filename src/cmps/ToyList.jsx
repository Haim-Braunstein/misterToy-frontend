
import { ToyPreview } from "./ToyPreview"



export function ToyList({ toys, onRemoveToy }) {



    return (
        <section>
            <ul className="toy-list flex">
                {
                    toys.map(toy => (
                        <li className=" clean-list" key={toy._id}>
                            <div>
                                <ToyPreview toy={toy}
                                    onRemoveToy={onRemoveToy} />
                            </div>
                        </li>

                    ))
                }
            </ul>
        </section>
    )
}
