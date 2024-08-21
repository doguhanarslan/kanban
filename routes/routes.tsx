import { RouteObject } from "react-router";
import Layout from "../layout/Layout";
import Boards from "../pages/Boards";


const routes: RouteObject[] = [
    {
        path: "/",
        element: <Layout />,
        children: [{
            children: [
                {
                    path: "",
                    element: <Boards />
                }
            ]
        }]
    }
];

export default routes;