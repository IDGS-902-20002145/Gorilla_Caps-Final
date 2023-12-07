import { useState } from "react";
import CatalogList from "../components/CatalogList/CatalogList";
// eslint-disable-next-line no-unused-vars
import React from "react";

const CatalogPage = () => {
  // @ts-ignore
  const initialCart = JSON.parse(localStorage.getItem("carrito")) || [];
  const [carrito, setCarrito] = useState(initialCart);

  return (
    <>
      <CatalogList carrito={carrito} setCarrito={setCarrito} />
    </>
  );
};

export default CatalogPage;
