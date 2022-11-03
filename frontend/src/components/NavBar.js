import React, { useEffect, useState } from "react";
import "../css/NavBar.css";
import demoLogo from "../sample/posts/demo-logo.png";
import useWindowSize from "../utils/useWindowSize.js";
function NavBar() {
    const [openHam, setOpenHam] = useState(false);
    const windowSize = useWindowSize();
    
    useEffect(handleOpenHam, [openHam]);

    useEffect(() => {
      //TODO: remove 
        //console.log(windowSize.width);
        // removes open ham menu if screen width is greater than max width for ham menu
        if (windowSize.width >= 1084) {
            setOpenHam(false);
        }
    })


    function handleOpenHam() {
        // setOpenHam(!openHam);
        let hamMenu = document.getElementById("menu-btn");
        let navBar = document.getElementById("NavBar");
        let middleNav = document.getElementById("middle-nav");
        let buttonDiv = document.getElementById("button-div-2");
        if (openHam) {
            hamMenu.classList.add('open');
            navBar.classList.add('vertical');
            middleNav.classList.add('vertical');
            buttonDiv.classList.add('vertical');
        }
        else {
            hamMenu.classList.remove('open');
            navBar.classList.remove('vertical');
            middleNav.classList.remove('vertical');
            buttonDiv.classList.remove('vertical');
        }
    }
  return (<>
    <div id="top-div">
    <div id="menu-btn" onClick={() => setOpenHam(!openHam)}>
        <div className="menu-btn-burger"></div>
      </div>
      <a href="/">
      <img id="logo-img-top" src={demoLogo} />
      </a>
    </div>
    <div id="NavBar">
      <a href="/" id="logo-div-2">
        <img id="logo-img-2" src={demoLogo} />
        <div id="logo-text-2">Lasco</div>
      </a>
      <div id="middle-nav">
        <a href="/about" className="nav-link" id="about">
          About
        </a>
        <a href="/community" className="nav-link" id="community">
          Community
        </a>
        <a href="/future" className="nav-link" id="future">
          Future 
        </a>
      </div>
      <div id="button-div-2">
        <a href="/login">
          <button className="clear-btn" id="login-button">
            <span className="text-gradient">Login</span>
          </button>
        </a>
        <a href="/signup">
          <button className="filled-btn" id="signup-button">
            Signup
          </button>
        </a>
      </div>
    </div>
    </>);
}

export default NavBar;
