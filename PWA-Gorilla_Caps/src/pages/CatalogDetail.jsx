import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./CatalogDetail.css";
import Cart from "../components/CatalogList/Cart";
// eslint-disable-next-line no-unused-vars
import React from "react";
import Swal from "sweetalert2";

const CatalogDetail = () => {
  // @ts-ignore
  const initialCart = JSON.parse(localStorage.getItem("carrito")) || [];
  const [carrito, setCarrito] = useState(initialCart);

  const { id } = useParams();

  const getProduct = async () => {
    const response = await fetch(`/api/Catalogo/${id}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    setProduct(data);
  };

  const [product, setProduct] = useState([]);
  const [cantidad, setCantidad] = useState(1);

  const aumentarCantidad = (max) => {
    if (cantidad < max) {
      setCantidad(cantidad + 1);
    }
  };
  const disminuirCantidad = () => {
    if (cantidad > 1) {
      setCantidad(cantidad - 1);
    }
  };

  const handleAddToCart = (product) => {
    const existingProduct = carrito.find((item) => item.id === product.id);
    if (existingProduct) {
      const updatedCart = carrito.map((item) => {
        if (item.id === product.id) {
          return { ...item, cantidad: item.cantidad + cantidad };
        }
        return item;
      });
      setCarrito(updatedCart);
      localStorage.setItem("carrito", JSON.stringify(updatedCart));
    } else {
      const cart = [...carrito, { ...product, cantidad }];
      setCarrito(cart);
      localStorage.setItem("carrito", JSON.stringify(cart));
    }
  };

  useEffect(() => {
    getProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fromB64 = (b64) => {
    return "data:image/jpeg;base64," + b64;
  };

  const sweetAlert = () => {
    Swal.fire({
      title: "Inicia sesión para comprar",
      icon: "info",
      showCancelButton: true,
      confirmButtonText: "Iniciar sesión",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.href = "/login";
      }
    });
  };

  const passToOrders = () => {
    //Pasamos el carrito a pedidos si el usuario está autenticado
    console.log("Ir a pedidos");
    if (localStorage.getItem("token") != null) {
      carrito.forEach((producto) => {
        //Construimos el producto para el pedido
        const product = {
          id: producto.id,
          nombre: producto.nombre,
          descripcion: producto.descripcion,
          precio: producto.precio,
          stock_existencia: producto.stock_existencia,
          imagen: producto.imagen,
          modelo: producto.modelo,
          color: producto.color,
          estatus: producto.estatus,
        };
        //Construimos el objeto pedidoProducto por cada producto en el carrito

        const pedidoProducto = {
          id: 0,
          UserId: localStorage.getItem("id"),
          fecha: new Date(),
          estatus: 1,
          cantidad: producto.cantidad,
          producto: product,
        };
        console.log(pedidoProducto);
        //Enviamos el pedidoProducto a la API
        fetch("/api/Pedidos", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
          body: JSON.stringify(pedidoProducto),
        })
          .then((res) => res.json())
          .then(() => {
            //Limpiamos el carrito
            setCarrito([]);

            //LLevamos a /Carrito
            window.location.href = "/Carrito";
          });
      });
    } else {
      sweetAlert();
    }
  };

  return (
    <div className="p-container">
      <div className="carritoFlotante">
        <div className="floating-cart">
          <Cart carrito={carrito} setCarrito={setCarrito} />
        </div>
      </div>
      <div className="row bg-grad">
        <div className="col-12">
          <Link to="/Catalogo">
            <button className="btn btn-secondary mb-2">Regresar</button>
          </Link>
        </div>
        <div className="col-12 col-md-6">
          <img
            src={fromB64(
              // @ts-ignore
              product.imagen
            )}
            className="img-fluid"
            alt="..."
          />
        </div>
        <div className="col-12 col-md-6">
          <img
            src={fromB64(
              // @ts-ignore
              product.imagen
            )}
            className="img-fluid-mobile"
            alt="..."
          />
          <h1>
            <b>
              {
                // @ts-ignore
                product.nombre
              }
            </b>
          </h1>
          <br className="br-mobile"></br>
          <p>
            <b>Modelo: </b>
            {
              // @ts-ignore
              product.modelo
            }
          </p>
          <p>
            <b>Descripción: </b>
            {
              // @ts-ignore
              product.descripcion
            }
          </p>
          <p>
            <b>Color: </b>
            {
              // @ts-ignore
              product.color
            }
          </p>
          <p>
            <b>Precio: </b>$
            {
              // @ts-ignore
              product.precio
            }
          </p>
          <p>
            <b>Quedan </b>
            {
              // @ts-ignore
              product.stock_existencia
            }{" "}
            en stock
          </p>

          {/*Hacemos botones para cambiar la cantidad de producto*/}
          <div className="row mg-left">
            <div className="quantity-container">
              <button
                onClick={() => disminuirCantidad()}
                className="btn btn-primary"
              >
                -
              </button>
              <input
                className="input-cantidad"
                type="text"
                disabled
                value={cantidad}
              />
              <button
                // @ts-ignore
                onClick={() => aumentarCantidad(product.stock_existencia)}
                className="btn btn-primary"
              >
                +
              </button>
            </div>
          </div>
          <button
            className="btn btn-primary btn-row mt-3"
            onClick={() => handleAddToCart(product)}
          >
            Añadir al Carrito
          </button>
          <br />
          <br />
          <button className="btn btn-info btn-row" onClick={passToOrders}>
            Comprar carrito
          </button>
        </div>
      </div>
    </div>
  );
};

export default CatalogDetail;
