import {useState } from "react"
import { toyService } from "../services/toy.service"


export function LabelsSelect({ onSetLabel, toyToEdit }) {

    const [isOptionsModalOpen, setIsOptionsModalOpen] = useState(false)
    const labels = toyService.getLabels()


    return <section className="multi-select" onMouseLeave={() => setIsOptionsModalOpen(false)}>
        <div className="selected-options-container" onClick={() => setIsOptionsModalOpen(prev => !prev)}>
            Labels :
            {!!toyToEdit.labels.length && toyToEdit.labels.map(label => <div key={label}>{label},</div>)}
            {!toyToEdit.labels.length && <div> no labels yet</div>}
        </div>

        <div className={`options-container  ${isOptionsModalOpen ? ' open' : ''}`}>
            {labels.map(label => <div onClick={() => onSetLabel(label)} key={label}>
                {label} {toyToEdit.labels?.includes(label) ? '🟢' : ''}
            </div>
            )}
        </div>
    </section >
}