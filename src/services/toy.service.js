import { storageService } from "./async-storage.service.js"
import { utilService } from "./util.service.js"


const STORAGE_KEY = 'toyDB'
_createToys()
console.log("🚀 ~ _createToys():", _createToys())

const labels = ['On wheels', 'Box game', 'Art', 'Baby', 'Doll', 'Puzzle',
    'Outdoor', 'Battery Powered']

export const toyService = {
    query,
    getToyById,
    remove,
    save,
    getEmptyToy,
}


function query() {
    return storageService.query(STORAGE_KEY)
}

function getToyById(id) {
    return storageService.get(STORAGE_KEY, id)
}

function remove(toyId) {
    return storageService.remove(STORAGE_KEY, toyId)

}

function save(toy) {
    if (toy._id) {
        return storageService.put(STORAGE_KEY, toy)

    } else {
        return storageService.post(STORAGE_KEY, toy)

    }
}

function getEmptyToy() {
    return {
        name: '',
        price: 0,
        labels: labels[utilService.getRandomIntInclusive(0, labels.length - 1)],
        createdAt: Date.now(),
        inStock: Math.random() > 0.5 ? true : false,
    }

}

function _createToys() {
    let toys = utilService.loadFromStorage(STORAGE_KEY)

    if (!toys || !toys.length) {
        toys = [

            {
                _id: utilService.makeId(),
                name: 'Puzzle',
                price: 13,
                labels: ['Box game', 'Puzzle', 'Baby'],
                createdAt: 1631231801011,
                inStock: Math.random() > 0.5 ? true : false,
            },
            {
                _id: utilService.makeId(),
                name: 'Toy train ',
                price: 51,
                labels: ['On wheels', 'Battery Powered', 'Baby'],
                createdAt: 1631031841011,
                inStock: Math.random() > 0.5 ? true : false,
            },
            {
                _id: utilService.makeId(),
                name: 'Talking Doll',
                price: 123,
                labels: ['Doll', 'Battery Powered', 'Baby'],
                createdAt: 1631031781011,
                inStock: Math.random() > 0.5 ? true : false,
            },
            {
                _id: utilService.makeId(),
                name: 'Hot Wheels cars',
                price: 99,
                labels: ['On wheels', 'Battery Powered', 'Baby'],
                createdAt: 1631035601011,
                inStock: Math.random() > 0.5 ? true : false,
            },
            {
                _id: utilService.makeId(),
                name: 'Scooter',
                price: 101,
                labels: ['Outdoor', 'Battery Powered', 'On wheels'],
                createdAt: 1631034401011,
                inStock: Math.random() > 0.5 ? true : false,
            },
            {
                _id: utilService.makeId(),
                name: 'Teddy bear',
                price: 123,
                labels: ['Doll', 'Battery Powered', 'Baby'],
                createdAt: 1631031823011,
                inStock: Math.random() > 0.5 ? true : false,
            },


        ]
    }
    utilService.saveToStorage(STORAGE_KEY, toys)


    return toys
}
