import React from "react";
import Tilt from "react-parallax-tilt";
import LogoImage from "../../assets/logo.png";
import "./Logo.css";

const Logo = () => {
    return (
        <Tilt>
            <img className="logo" src={LogoImage} alt="logo"/>
        </Tilt>
    )
}

export default Logo;