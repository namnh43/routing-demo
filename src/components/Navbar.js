import React from "react";
import {Link} from "react-router-dom";

export function Navbar() {
    return (
        <>
            <h1>
                <Link to='/'>Home</Link>|
                <Link to='/admin'>Admin</Link>
            </h1>
            <hr/>
        </>
    )
}