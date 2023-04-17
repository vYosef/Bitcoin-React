import { Link, NavLink, withRouter } from "react-router-dom";


function _AppHeader(props) {

    function onBack() {
        props.history.goBack()
    }


    return (
        <header className="app-header">
            <section className="container">
                <h1 className="logo">Mr Bitcoin</h1>
                <nav>
                    <NavLink exact to="/" >Home</NavLink>
                    <NavLink to="/contacts">contact list</NavLink>
                    <NavLink to="/signup">signup</NavLink>
                </nav>
            </section>
                <section className="back">
                    <button onClick={onBack} >Back</button>
                </section>
        </header>
    )
}

export const AppHeader = withRouter(_AppHeader)