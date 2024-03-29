import { httpService } from "./http.service";

export const toyService = {
    query,
    getToyById,
    remove,
    save,
    getEmptyToy,
    getDefaultSort,
    getLabels,
    AddToyMsg,
    RemoveToyMsg,
}

const labels = ["On wheels", "Box game", "Art", "Baby", "Doll", "Puzzle", "Outdoor", "Battery Powered"]

function query(filterBy, sortBy) {
    return httpService.get('toy', { params: { filterBy, sortBy } })
}

function getLabels() {
    return [...labels]
}

function getToyById(toyId) {
    return httpService.get(`toy/${toyId}`)
}

function remove(toyId) {
    return httpService.delete(`toy/${toyId}`)
}

function save(toy) {
    if (toy._id) {
        return httpService.put(`toy/${toy._id}`, toy)
    } else {
        return httpService.post('toy', toy)
    }
}

function AddToyMsg(toyId, msg) {

    return httpService.post(`toy/${toyId}/msg`, { data: msg });
}

function RemoveToyMsg(toyId, msgId) {

    return httpService.delete(`toy/${toyId}/msg/${msgId}`)
}


function getEmptyToy(toyName) {
    return {
        name: toyName,
        price: 0,
        labels: labels[utilService.getRandomIntInclusive(0, labels.length - 1)],
        createdAt: Date.now(),
        inStock: Math.random() > 0.5 ? true : false,
    }

}

// function getDefaultFilterBy() {
//     return {
//         txt: '',
//         maxPrice: Infinity,
//         labels: [],
//         inStock: null
//     }
// }

function getDefaultSort() {
    return {
        // 
        by: 'name',
        asc: true
    }
}
