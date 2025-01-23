import AcademicSemester from "../pages/admin/AcademicSemester";
import AdminDashboard from "../pages/admin/AdminDashboard";
import CreateAdmin from "../pages/admin/CreateAdmin";
import CreateFaculty from "../pages/admin/CreateFaculty";
import CreateStudent from "../pages/admin/CreateStudent";

export const adminPaths = [
    {
        name: "Dashboard",
        path: "dashboard",
        element: <AdminDashboard />,
    },
    {
        name: "Academic Management",
        children: [
            {
                name: "Academic Semester",
                path: "academic-semester",
                element: <AcademicSemester />,
            },
        ],
    },
    {
        name: "User Management",
        children: [
            {
                name: "Create Admin",
                path: "create-admin",
                element: <CreateAdmin />,
            },
            {
                name: "Create Faculty",
                path: "create-faculty",
                element: <CreateFaculty />,
            },
            {
                name: "Create Student",
                path: "create-student",
                element: <CreateStudent />,
            },
            {
                name: "Create Member",
                path: "create-member",
                element: <CreateStudent />,
            },
        ],
    },
];

// Hard Coded Way

// export const adminPaths = [
//     {
//         index: true,
//         element: <AdminDashboard />,
//     },
//     {
//         path: "dashboard",
//         element: <AdminDashboard />,
//     },
//     {
//         path: "create-admin",
//         element: <CreateAdmin />,
//     },
//     {
//         path: "create-faculty",
//         element: <CreateFaculty />,
//     },
//     {
//         path: "create-student",
//         element: <CreateStudent />,
//     },
// ];
