import React from "react";
import "./Navigation.css";
import Logo from "../Logo/Logo";

const Navigation = () => {
    return (
        <nav>
            <Logo/>
            <p className="sign-in link">Sign Out</p>
        </nav>
    )
}

export default Navigation;