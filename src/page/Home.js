import {Header} from "../components/Header";
import {Navbar} from "../components/Navbar";
import {Footer} from "../components/Footer";
import {Link, Outlet} from "react-router-dom";

export function Home() {
    return (
        <>
            <Header></Header>
            <Navbar></Navbar>
            <h5>
                <Link to='/'>List student</Link> |
                <Link to='/create-student'>Create student</Link>
            </h5>
            <Outlet></Outlet>
            <Footer></Footer>
        </>
    )
}