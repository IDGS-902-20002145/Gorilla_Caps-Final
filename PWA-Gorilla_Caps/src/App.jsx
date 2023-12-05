// eslint-disable-next-line no-unused-vars
import React from "react";
import CatalogPage from "./pages/CatalogPage";
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import ShoppingCartPage from "./pages/ShoppingCartPage";
import CatalogDetail from "./pages/CatalogDetail";

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/Catalogo" element={<CatalogPage />} />
                <Route path="/Catalogo/:id" element={<CatalogDetail />} />
                <Route path="/Carrito" element={<ShoppingCartPage />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
