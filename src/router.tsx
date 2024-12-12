import {createBrowserRouter} from "react-router-dom";
import NotFound from "./pages/NotFound/NotFound.tsx";
import Home from "./pages/Home/Home.tsx";
import Catalog from "./pages/Catalog/Catalog.tsx";
import ProductPage from "./pages/ProductPage/ProductPage.tsx";
import CreateProduct from "./pages/CreateProduct/CreateProduct.tsx";

const router = createBrowserRouter([
    { path: "*", element: <NotFound /> },

    {
        path: "/",
        element: <Home/>,
    },

    {
        path: "/catalog",
        element: <Catalog/>,
    },
    {
        path: "/catalog/:id",
        element: <ProductPage/>,
    },
    {
        path: "/create-product",
        element: <CreateProduct/>,
    },
]);

export default router;

export const navigate = router.navigate;