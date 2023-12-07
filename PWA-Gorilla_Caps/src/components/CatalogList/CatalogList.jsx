/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import "./CatalogList.css";
import Cart from "./Cart";
import { Link } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import React from "react";

const CatalogList = ({ carrito, setCarrito }) => {
  const [catalog, setCatalog] = useState([]);

  //Hacemos un decode de la imagen que viene en base64
  const fromB64 = (b64) => {
    return "data:image/jpeg;base64," + b64;
  };
  const splitDescription1 = (description) => {
    return description.split(" ").slice(0, 5).join(" ");
  };
  const splitDescription2 = (description) => {
    return description.split(" ").slice(5, 10).join(" ");
  };
  const splitDescription3 = (description) => {
    return description.split(" ").slice(10, 15).join(" ");
  };
  const splitDescription4 = (description) => {
    return description.split(" ").slice(15, 20).join(" ");
  };

  useEffect(() => {
    const getCatalog = async () => {
      const response = await fetch("/api/Catalogo", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      setCatalog(data);
    };
    getCatalog();
  }, []);

  const handleAddToCart = (product) => {
    const exist = carrito.find((item) => item.id === product.id);
    if (exist) {
      setCarrito(
        carrito.map((item) =>
          item.id === product.id
            ? { ...exist, cantidad: exist.cantidad + 1 }
            : item
        )
      );
    } else {
      setCarrito([...carrito, { ...product, cantidad: 1 }]);
    }
  };

  const handleSearch = async () => {
    // @ts-ignore
    const value = document.querySelector(".filtro-input").value;
    const filtered = catalog.filter((product) => {
      // @ts-ignore
      return product.nombre.toLowerCase().includes(value.toLowerCase());
    });
    if (value !== "") {
      // @ts-ignore
      setCatalog(filtered);
    }
  };
  const handleResetCatalog = async () => {
    const response = await fetch("/api/Catalogo", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    setCatalog(data);
  };

  return (
    <div className="body">
      <div>
        <div className="Cabecera-catalogo">
          <p className="titulo-cabecera">¡Bienvenido!</p>
          <p className="subtitulo-cabecera">
            Descubre la mejor selección de gorras...
          </p>
        </div>

        {/* Logica del carrito aquí*/}
        <div className="carritoFlotante">
          <div className="floating-cart">
            <Cart carrito={carrito} setCarrito={setCarrito} />
          </div>
        </div>

        <div className="product-carousel">
          <h2>Productos destacados</h2>
          <div className="product-carousel">
            <div className="product-list-cards">
              {catalog.map((product) => (
                // @ts-ignore
                <div key={product.id} className="product-card">
                  <div className="verProdC">
                    <Link
                      to={`/Catalogo/${
                        // @ts-ignore
                        product.id
                      }`}
                    >
                      <img
                        src={fromB64(
                          // @ts-ignore
                          product.imagen
                        )}
                        className="product-image-first"
                        // @ts-ignore
                        alt={product.nombre}
                      />
                    </Link>
                    <span className="verProd-message">Ver el producto</span>
                  </div>
                  <div className="product-details">
                    <h3 className="product-name">
                      {
                        // @ts-ignore
                        product.nombre
                      }
                    </h3>
                    <p className="product-description">
                      {splitDescription1(
                        // @ts-ignore
                        product.descripcion
                      )}
                    </p>
                    <p className="product-description">
                      {splitDescription2(
                        // @ts-ignore
                        product.descripcion
                      )}
                    </p>
                    <p className="product-description">
                      {splitDescription3(
                        // @ts-ignore
                        product.descripcion
                      )}
                    </p>
                    <p className="product-description">
                      {splitDescription4(
                        // @ts-ignore
                        product.descripcion
                      )}
                    </p>
                    <p className="product-price">
                      Precio: $
                      {
                        // @ts-ignore
                        product.precio
                      }
                    </p>
                    <p className="product-stock">
                      Stock:{" "}
                      {
                        // @ts-ignore
                        product.stock_existencia
                      }
                    </p>
                    {/* Add React logic for the add to cart button */}
                    <div
                      className="center"
                      style={{ display: "flex", justifyContent: "center" }}
                    >
                      <button
                        className="btn btn-sm btn-primary cartAn"
                        onClick={() => handleAddToCart(product)}
                      >
                        <i className="fas fa-shopping-cart"></i>
                        Agregar
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <br />
        <h2 className="explorar_prod">Explora nuestros productos</h2>
        <div className="row justify-content-center">
          <div className="col-md-8">
            {/* Add React logic for the search input */}
            <input
              className="form-control filtro-input"
              type="text"
              placeholder="Buscar..."
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <button onClick={handleResetCatalog} className="btn btn-secondary">
              Limpiar
            </button>
            <button
              onClick={handleSearch}
              className="btn btn-success btn-buscar-prod"
            >
              Buscar
            </button>
          </div>
        </div>
        <br />

        <div className="product-list-cards-general" style={{ padding: "10px" }}>
          {catalog.map((product) => (
            <div
              key={
                // @ts-ignore
                product.id
              }
              className="product-card-general"
            >
              <div className="verProd" title="Click para ver producto">
                {/* Add React routing logic for the product link */}
                <Link
                  to={`/Catalogo/${
                    // @ts-ignore
                    product.id
                  }`}
                >
                  <img
                    src={fromB64(
                      // @ts-ignore
                      product.imagen
                    )}
                    className="product-image-general"
                    // @ts-ignore
                    alt={product.nombre}
                  />
                </Link>
                <span className="verProd-message">Ver el producto</span>
              </div>
              <div className="product-details-g">
                <h3 className="product-name-g">
                  {
                    // @ts-ignore
                    product.nombre
                  }
                </h3>
                <p className="product-description-g">
                  {
                    // @ts-ignore
                    product.descripcion
                  }
                </p>
                <p className="product-price-g">
                  Precio: $
                  {
                    // @ts-ignore
                    product.precio
                  }
                </p>
                <p className="product-stock-g">
                  Stock:{" "}
                  {
                    // @ts-ignore
                    product.stock_existencia
                  }
                </p>
                {/* Add React logic for the add to cart button */}
                <div>
                  <button
                    className="btn btn-lg btn-primary cartAn"
                    onClick={handleSearch}
                  >
                    <i className="fa-solid fa-cart-shopping"></i>
                    Agregar al carrito
                  </button>
                </div>
                <div className="feeds">
                  <div className="feed">
                    <div className="actions">
                      <div className="heart"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CatalogList;
