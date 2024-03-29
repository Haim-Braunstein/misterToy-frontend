import { httpService } from './http.service'
import { utilService } from './util.service'

const BASE_URL = 'auth/'
const STORAGE_KEY_LOGGEDIN = 'loggedinUser'

export const userService = {
    login,
    logout,
    signup,
    getById,
    getLoggedinUser,
    getEmptyCredentials,
    addToyMsg
}


function login({ username, password }) {

    return httpService.post(BASE_URL + 'login', { username, password })
        .then(user => {
            if (user) return _setLoggedinUser(user)
            else return Promise.reject('Invalid login')
        })
}

function signup({ username, password, fullname }) {
    const user = { username, password, fullname }
    return httpService.post(BASE_URL + 'signup', user)
        .then(user => {
            if (user) return _setLoggedinUser(user)
            else return Promise.reject('Invalid signup')
        })
}


function logout() {
    return httpService.post(BASE_URL + 'logout')
        .then(() => {
            sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN)
        })
}

function getById(userId) {
    return httpService.get('user/' + userId)
}


function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN))
}

function _setLoggedinUser(user) {
    const userToSave = { _id: user._id, fullname: user.fullname }
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, JSON.stringify(userToSave))
    return userToSave
}


function getEmptyCredentials() {
    return {
        username: '',
        password: '',
        fullname: ''
    }
}

async function addToyMsg(txt, toyId) {
    const loggedinUser = getLoggedinUser()

    if (!loggedinUser) return;

    const msg = {
        id: utilService.makeId(),
        txt: txt,
        by: {
            _id: loggedinUser._id,
            fullname: loggedinUser.fullname
        }
    }

    try {
        const user = await getById(loggedinUser._id)

        if (!user.msgs) user.msgs = []
        user.msgs.unshift(msg);

        const savedUser = await httpService.put('toy/' + toyId + '/msg', user)
        _setLoggedinUser(savedUser);
        return savedUser;
    } catch (error) {
        console.error('Failed to add toy message:', error)
        throw error
    }
}




