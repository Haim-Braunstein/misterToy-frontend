import { useDispatch, useSelector } from "react-redux"
import { NavLink } from "react-router-dom"

import { LoginSignup } from "./LoginSignup"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service"
import { logout } from "../store/actions/user.actions"


export function AppHeader() {

    const dispatch = useDispatch()
    const user = useSelector(storeState => storeState.userModule.loggedInUser)

    async function onLogout() {
        try {
            await logout()
            showSuccessMsg('Logout successfully')
        } catch (err) {
            showErrorMsg('Oops try again')
        }
    }

    return (
        <header className="app-header full main-layout">
            <section className="header-container">
                <h1>Mister Toy</h1>
                <nav className="app-nav">
                    <NavLink to="/" >Home</NavLink>
                    <NavLink to="/about" >About</NavLink>
                    <NavLink to='/toy' >Toys</NavLink>
                    <NavLink to='/toy/dashboard' >Dashboard</NavLink>

                </nav>
            </section>
            {user ? (
                < section >
                    <span to={`/user/${user._id}`}>Hello {user.fullname}</span>
                    <button onClick={onLogout}>Logout</button>
                </ section >
            ) : (
                <section>
                    <LoginSignup />
                </section>
            )}
        </header>
    )

}