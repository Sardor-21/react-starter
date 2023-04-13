const menu = [
	{
		id: "films",
		title: "Фильмы",
		access: ["super_admin", "moderator", "admin"],
		icon: "menu-i-dashboard",
		submenu: [
			// {
			// 	id: "type",
			// 	link: "/types",
			// 	title: "Типы",
			// 	access: ["super_admin", "admin"]
			// },

			{
				id: "season",
				link: "/season",
				title: "Сезоны",
				access: ["super_admin", "admin"]
			},
			{
				id: "genres",
				link: "/genres",
				title: "Жанры",
				access: ["super_admin", "admin"]
			},
			{
				id: "format",
				link: "/formats",
				title: "Форматы",
				access: ["super_admin", "admin"]
			},
			{
				id: "actors",
				link: "/actors",
				title: "Актёр",
				access: ["super_admin", "admin"]
			},
			{
				id: "makers",
				link: "/makers",
				title: "Режиссеры",
				access: ["super_admin", "admin"]
			}
		]
	},
	{
		id: "media",
		link: "/",
		title: "Медиа",
		icon: "menu-i-dashboard",
		access: ["super_admin", "admin"]
	},
	{
		id: "series",
		link: "/series",
		title: "Серии",
		icon: "menu-i-dashboard",
		access: ["super_admin", "admin"]
	},
	{
		id: "banners",
		link: "/banners",
		title: "Баннеры",
		icon: "menu-i-dashboard",
		access: ["super_admin", "admin"]
	},
	{
		id: "categories",
		link: "/categories",
		title: "Категории",
		icon: "menu-i-dashboard",
		access: ["super_admin", "admin"]
	},
	{
		id: "pages",
		link: "/pages",
		title: "Страницы",
		icon: "menu-i-dashboard",
		access: ["super_admin", "admin"]
	},
	{
		id: "posts",
		link: "/posts",
		title: "Посты",
		icon: "menu-i-dashboard",
		access: ["super_admin", "admin"]
	},
	{
		id: "users",
		title: "Пользователи",
		icon: "menu-i-dashboard",
		access: ["super_admin", "admin"],
		submenu: [
			{
				id: "admin",
				link: "/admin",
				title: "Админ",
				icon: "menu-i-dashboard",
				access: ["super_admin", "admin"]
			},
			{
				id: "user",
				link: "/users",
				title: "Пользователи",
				icon: "menu-i-dashboard",
				access: ["super_admin", "admin"]
			}
		]
	},
	{
		id: "promocode",
		link: "/promocode",
		title: "Промокод",
		icon: "menu-i-dashboard",
		access: ["super_admin", "admin"]
	},
	{
		id: "tarif",
		link: "/tarif",
		title: "Тариф",
		icon: "menu-i-dashboard",
		access: ["super_admin", "admin"]
	},
	{
		id: "radio",
		link: "/radio",
		title: "Радио",
		icon: "menu-i-dashboard",
		access: ["super_admin", "admin"]
	},
	{
		id: "menu",
		link: "/menu",
		title: "Меню",
		icon: "menu-i-dashboard",
		access: ["super_admin", "admin"]
	},
	{
		id: "logs",
		link: "/logs",
		title: "Логс",
		icon: "menu-i-dashboard",
		access: ["super_admin", "admin"]
	},
	{
		id: "comments",
		link: "/comments",
		title: "Комментарии",
		icon: "menu-i-dashboard",
		access: ["super_admin", "admin"]
	},
	{
		id: "channels",
		link: "/channels",
		title: "Каналы",
		icon: "menu-i-dashboard",
		access: ["super_admin", "admin"]
	},
	{
		id: "studios",
		link: "/studios",
		title: "Студии",
		icon: "menu-i-dashboard",
		access: ["super_admin", "admin"]
	},

	{
		id: "companies",
		link: "/companies",
		title: "Компании",
		icon: "menu-i-dashboard",
		access: ["super_admin", "admin"]
	},

	{
		id: "reklama",
		link: "/reklama",
		title: "Реклама",
		icon: "menu-i-dashboard",
		access: ["super_admin", "admin"]
	},
	{
		id: "franchise",
		link: "/franchise",
		title: "Франшиза",
		icon: "menu-i-dashboard",
		access: ["super_admin", "admin"]
	},
	{
		id: "faqs",
		link: "/faqs",
		title: "FAQ",
		icon: "menu-i-dashboard",
		access: ["super_admin", "admin"]
	},

	{
		id: "notification",
		link: "/notification",
		title: "Уведомление",
		icon: "menu-i-dashboard",
		access: ["super_admin", "admin"]
	},
	{
		id: "settings",
		link: "/settings",
		title: "Настройки",
		icon: "menu-i-dashboard",
		access: ["super_admin", "admin"]
	},
	{
		id: "reason",
		link: "/reason",
		title: "Причина",
		icon: "menu-i-dashboard",
		access: ["super_admin", "admin"]
	},
	// {
	// 	id: "dinamic",
	// 	link: "/dinamic",
	// 	title: "Logout",
	// 	icon: "menu-i-dashboard",
	// 	access: ["super_admin", "admin"]
	// },
	{
		id: "languages",
		link: "/languages",
		title: "Язык филм",
		icon: "menu-i-dashboard",
		access: ["super_admin", "admin"]
	},
	{
		id: "translation",
		link: "/translation",
		title: "Переводы",
		icon: "menu-i-dashboard",
		access: ["super_admin", "admin"]
	}
	// {
	// 	id: "about",
	// 	path: "/about",
	// 	title: "About",
	// 	access: ["super_admin"]
	// },
	// {
	// 	path: "/contact",
	// 	title: "Contact",
	// 	access: ["super_admin", "moderator"]
	// },
	// {
	// 	path: "/tabs",
	// 	title: "Table",
	// 	access: ["super_admin", "moderator"]
	// }
];
export default menu;
