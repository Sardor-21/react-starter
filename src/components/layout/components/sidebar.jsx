import React, { useState } from "react";
import menu from "./menu";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { helpers, storage } from "services";
import { useDispatch, useSelector } from "react-redux";
import IconUser from "assets/images/icons/user.png";
import { signOut } from "store/features/auth";
import { get } from "lodash";

const Sidebar = ({ isCollapsed, setCollapse }) => {
	const location = useLocation();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const currentPath = location.pathname.split("/")[1];
	const fullPath = location.pathname;
	const [toggledSubmenu, setToggleSubmenu] = useState(null);
	const { role, photo } = useSelector(state => state?.auth?.data);
	const toggleSubmenu = id => {
		if (id === toggledSubmenu) {
			setToggleSubmenu(null);
		} else {
			setToggleSubmenu(id);
		}
	};

	const logOut = () => {
		dispatch(signOut());
		storage.remove("token");
		navigate("/");
	};
	const toggle = () => {
		if (isCollapsed) {
			setCollapse(false);
		} else setCollapse(true);
	};

	return (
		<div className="m-sidebar">
			<div className="m-sidebar-wrapper">
				<div className="m-sidebar-head">
					<a href="#/" className="m-sidebar-logo">
						<span>Shakhzod</span>
					</a>

					<div className="menu-collapse-btn" onClick={toggle} />
				</div>

				<ul className="m-menu">
					{helpers.getAccess(role, menu)?.map((m, i) => {
						if (m.submenu) {
							return (
								<li key={i} className={`has-submenu ${m.id === toggledSubmenu ? "submenu-visible" : ""}`}>
									<div className={`m-menu-link ${"/" + currentPath === m.link ? "active-menu" : ""}`} onClick={() => toggleSubmenu(m.id)}>
										<div>
											<img src={require(`assets/images/base/${m.icon}.svg`)} alt="" />
											<span>{m.title}</span>
											<span className="toggle-submenu" />
										</div>
									</div>
									<div className="submenu">
										{m.submenu.map((sm, i) => (
											<Link key={i} to={sm.link} className={fullPath === sm.link ? "active" : ""}>
												{sm.title}
											</Link>
										))}
									</div>
								</li>
							);
						} else {
							return (
								<li key={i}>
									<Link to={m.link} className={`m-menu-link ${"/" + currentPath === m.link ? "active-menu" : ""}`}>
										<div>
											<img src={require(`assets/images/base/${m.icon}.svg`)} alt="" />
											<span>{m.title}</span>
										</div>
									</Link>
								</li>
							);
						}
					})}
				</ul>

				<div className="m-sidebar-user">
					<div className="profile-dropdown cm-dropdown">
						<div className="profile-dropdown-avatar">
							{/* <UserOutlined /> */}
							<div className="img">
								<img src={get(photo, "thumbnails.low.src") ? get(photo, "thumbnails.low.src") : IconUser} alt="" />
							</div>
							<p className="text">{role}</p>
						</div>
						<div className="cm-dropdown-list-wrapper">
							<div className="cm-dropdown-list">
								{/* <div className="profile-info">
									{/* <span>{profile.name}</span> */}
								{/* <span>{helpers.getUserRole(profile.role)}</span> 
								</div> */}
								<Link to={"/profile"} className="cm-dropdown-item">
									Профиль
								</Link>
								<div onClick={logOut} className="cm-dropdown-item">
									Выход
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Sidebar;
