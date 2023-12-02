// eslint-disable-next-line no-unused-vars
import React from "react";
import CatalogPage from "./pages/CatalogPage";
import { Route, Routes, BrowserRouter } from 'react-router-dom'

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/Catalogo" element={<CatalogPage />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
