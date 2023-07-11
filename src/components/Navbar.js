import React from "react";
import {Link} from "react-router-dom";

export function Navbar() {
    return (
        <>
            <nav className="navbar navbar-light bg-light">
                <div className="container-fluid">
                    <a className="navbar-brand">Navbar</a>
                    <Link to='/' className={"ms-0"}>Home</Link>
                    <Link to='/admin'>Admin</Link>
                    <form className="d-flex">
                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                        <button className="btn btn-outline-success" type="submit">Search</button>
                    </form>
                </div>
            </nav>
            <hr/>
        </>
    )
}