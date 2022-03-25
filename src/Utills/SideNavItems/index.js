export const getRoutes = (role) => {
    let routes = [
        {
            name: "Quests",
            icon: "icon-hospital",
            route: "/admin/quests"
        },
        {
            name: "Cities",
            icon: "icon-qr-code",
            route: "/admin/cities"
        },
        {
            name: "Games",
            icon: "icon-qr-code",
            route: "/admin/games"
        },
        {
            name: "Clues",
            icon: "icon-qr-code",
            route: "/admin/clues"
        }
    ];

    return routes;
}