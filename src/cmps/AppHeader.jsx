import { useEffect, useState } from "react"
import { NavLink } from "react-router-dom"






export function AppHeader() {

    return (
        <header className="app-header full main-layout">
            <section className="header-container">
                <h1>Mister Toy</h1>
                <nav className="app-nav">
                    <NavLink to="/" >Home</NavLink>
                    {/* <NavLink to="/about" >About</NavLink> */}
                    <NavLink to='/toy' >Toys</NavLink>
                    <NavLink to='/toy/dashboard' >Dashboard</NavLink>

                </nav>
            </section>
        </header>
    )

}