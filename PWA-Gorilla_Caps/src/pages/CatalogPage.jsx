import { useState } from "react";
import CatalogList from "../components/CatalogList/CatalogList";

const CatalogPage = () => {
  const initialCart = JSON.parse(localStorage.getItem("carrito")) || [];
  const [carrito, setCarrito] = useState(initialCart);


  return (
    <>
      <CatalogList carrito={carrito} setCarrito={setCarrito} />
    </>
  );
};

export default CatalogPage;
