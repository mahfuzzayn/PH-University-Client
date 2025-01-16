const adminPaths = [
    {
        name: "Dashboard",
        path: "dashboard",
        element: "ADMIN_DASHBOARD",
    },
    {
        name: "User Management",
        children: [
            {
                name: "Create Admin",
                path: "create-admin",
                element: "CREATE_ADMIN",
            },
            {
                name: "Create Faculty",
                path: "create-faculty",
                element: "CREATE_FACULTY",
            },
            {
                name: "Create Student",
                path: "create-student",
                element: "CREATE-STUDENT",
            },
        ],
    },
];

const adminRoutes = adminPaths.reduce((acc, item) => {
    if (item.path && item.name) {
        acc.push({
            key: item.name,
            label: "NAVLINK",
        });
    }

    if (item.children) {
        acc.push({
            key: item.name,
            label: item.name,
            children: item.children.map(child => ({
                key: child.name,
                label: child.name,
                path: child.path,
                element: child.element,
            }))
        });
    }

    return acc;
}, []);

console.log(JSON.stringify(adminRoutes));
