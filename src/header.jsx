import logo from "./assets/Logo.png"
export default function () {
    return (
        <header>
            <nav className="navbar">
                <img className="Logo" src={logo}/>
                <div className="AppName">
                    <p>My Habit Tracker</p>
                </div>
            </nav>
        </header>
    )
}