import React, { useState, useEffect } from "react";
import "../css/PortalNav.css";

import FilledHomeIcon from "@mui/icons-material/Home";
import OutlinedHomeIcon from "@mui/icons-material/HomeOutlined";
import SearchIcon from "@mui/icons-material/Search";
import OutlinedProfileIcon from '@mui/icons-material/AccountCircleOutlined';
import FilledProfileIcon from '@mui/icons-material/AccountCircle';

import { Link } from "react-router-dom";

import { useDb } from '../contexts/DatabaseContext'


function PortalNav() {
    const [currentPage, setCurrentPage] = useState(0);
    const [prevSelecElement, setPrevSelecElement] = useState();
    const selecPosArray = [0, 78, 156];
    const selecIconArray = ["home-icon", "search-icon", "profile-icon"];

    const { userInfo } = useDb();

    function moveSelector() {
        document.getElementById("purple-selector").style.left =
            selecPosArray[currentPage] + "px";
        document.getElementById(selecIconArray[currentPage]).style.color = "white";
        if (prevSelecElement) {
            prevSelecElement.style.color = "gray";
        }
    }

    function updateCurrentPage() {
        switch (window.location.pathname) {
            case "/feed":
                setCurrentPage(0);
                break;
            case "/search":
                setCurrentPage(1);
                break;
            case `/profile`:
                setCurrentPage(2);
                break;
        }
    }

    useEffect(updateCurrentPage, [window.location.pathname])
    useEffect(moveSelector, [currentPage]);


    function updateSelecElement() {
        setPrevSelecElement(document.getElementById(selecIconArray[currentPage]));
    }

    return (
        <div id="PortalNav">
            <div id="purple-selector"></div>
            <Link onClick={() => updateSelecElement()} to="/feed">
                {currentPage === 0 ? <FilledHomeIcon
                    id="home-icon"
                    className="icon"
                ></FilledHomeIcon> : <OutlinedHomeIcon
                    id="home-icon"
                    className="icon"
                    onClick={() => updateSelecElement(0)}
                ></OutlinedHomeIcon>}
            </Link>
            <Link onClick={() => updateSelecElement()} to="/search">
                <SearchIcon
                    id="search-icon"
                    className="icon"
                ></SearchIcon>
            </Link>
            <Link onClick={() => updateSelecElement()} to={`/profile`}>
                {currentPage === 2 ? <FilledProfileIcon
                    className="icon"
                    id="profile-icon"
                /> : <OutlinedProfileIcon
                    className="icon"
                    id="profile-icon"
                />}
            </Link>
        </div>
    );
}

export default PortalNav;
