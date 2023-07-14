import {Header} from "../components/Header";
import {Navbar} from "../components/Navbar";
import {Footer} from "../components/Footer";
import {Link, Outlet} from "react-router-dom";

export function Home() {
    return (
        <>
            <Header></Header>
            <Navbar></Navbar>

            <Outlet></Outlet>
            <Footer></Footer>
        </>
    )
}