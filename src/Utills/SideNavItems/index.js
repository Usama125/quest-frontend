export const getRoutes = (role) => {
    let routes = [
        {
            name: "Game Types",
            icon: "icon-hospital",
            route: "/admin/game-types"
        },
        {
            name: "Towns",
            icon: "icon-qr-code",
            route: "/admin/towns"
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