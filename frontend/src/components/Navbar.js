import { Link } from "react-router-dom"

const Navbar = ()=> {
    return (
        <header>
            <div>
                <Link to="/">
                <h1>To Do List</h1>
                
                </Link>
            </div>
        </header>
    )
}

export default Navbar