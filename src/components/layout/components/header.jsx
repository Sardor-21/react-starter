import { Button, Dropdown, Menu } from "antd";
import React from "react";
import { Breadcrumb } from "components";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const Header = () => {
	const { t } = useTranslation();
	const menu = (
		<Menu>
			<Menu.Item>
				<Link to={`/posts/create`}>{t("Посты")}</Link>
			</Menu.Item>
			<Menu.Item>
				<Link to={`/pages/create`}>{t("Страницы")}</Link>
			</Menu.Item>
		</Menu>
	);
	return (
		<div className="m-header">
			<div className="m-header-wrapper">
				<div className="d-flex align-items-center">
					<Breadcrumb className="mb-0 bb-breadcrumb--outline" />
					<Dropdown overlay={menu}>
						<Button>+ Новый</Button>
					</Dropdown>
				</div>
				<div className="d-flex align-items-center">
					<div className="cm-dropdown">
						{/* <div className="cm-dropdown-label">{t(currentLangTitle)}</div> */}
						<div className="cm-dropdown-list-wrapper">
							<div className="cm-dropdown-list">
								{/* {config.API_LANGUAGES.map(lang => (
									<span className="cm-dropdown-item" key={lang.id} onClick={() => changeLang(lang.code)}>
										{t(lang.title)}
									</span>
								))} */}
							</div>
						</div>
					</div>
					<div className="profile-dropdown cm-dropdown">
						<div className="profile-dropdown-avatar">{/* <img src={defaultAvatar} alt="" /> */}</div>
						<div className="cm-dropdown-list-wrapper">
							<div className="cm-dropdown-list">
								<div className="profile-info">
									{/* <span>{profile.name}</span> */}
									{/* <span>{helpers.getUserRole(profile.role)}</span> */}
								</div>
								<Link to={"/settings"} className="cm-dropdown-item">
									Настройки
								</Link>
								<Link to={"/logout"} className="cm-dropdown-item">
									Выход
								</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Header;
