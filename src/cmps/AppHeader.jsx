import { Link, NavLink, withRouter } from "react-router-dom";


function _AppHeader(props) {

    function onBack() {
        props.history.goBack()
    }


    return (
        <header className="app-header">
            <section className="container">
                <h1 className="logo">Robots</h1>
                <section className="back">
                    <button onClick={onBack} >Back</button>
                </section>
                <nav>
                    <NavLink exact to="/" >Home</NavLink>
                    <NavLink to="/contacts">contact list</NavLink>
                </nav>
            </section>
        </header>
    )
}

export const AppHeader = withRouter(_AppHeader)