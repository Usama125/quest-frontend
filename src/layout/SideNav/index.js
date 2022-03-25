import React, { useContext } from 'react'
import { getRoutes } from '../../Utills/SideNavItems'
import { useHistory } from 'react-router-dom';
import { RootContext } from "../../contextApi/index";

function SideNav() {

    const { selectedNav, setSelectedNav, user } = useContext(RootContext);

    const history = useHistory();
    const href = ""

    const onNavClick = (item) => {
        setSelectedNav(item.name);
        history.push(item.route);
    }

    let navLinks = getRoutes();

    return (
        <ul class="sidebar-nav">
            {navLinks.map((item, index) => (
                <li class={selectedNav === item.name && "active"} key={index} onClick={onNavClick.bind(this, item)}>
                    <a href={href} onClick={(e) => e.preventDefault()}><span class={item.icon}></span> {item.name}</a>
                </li>
            ))}
        </ul>
    )
}

export default SideNav
