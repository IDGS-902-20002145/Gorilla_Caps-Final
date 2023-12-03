import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./ShoppingCartPage.css";

const ShoppingCartPage = () => {
    // Método para obtener los productos del carrito del localStorage
    const getProducts = () => {
        const products = JSON.parse(localStorage.getItem('carrito'));
        return products || [];
    };

    const [products, setProducts] = useState(getProducts());

    const fromB64 = (b64) => {
        return "data:image/jpeg;base64," + b64;
    };

    const addQuantity = (id) => {
        const updatedProducts = products.map((producto) => {
            if (producto.id === id && producto.cantidad < producto.stock_existencia) {
                return { ...producto, cantidad: producto.cantidad + 1 };
            } else {
                return producto;
            }
        });
        setProducts(updatedProducts);
    };

    const removeQuantity = (id) => {
        const updatedProducts = products.map((producto) => {
            if (producto.id === id && producto.cantidad > 1) {
                return { ...producto, cantidad: producto.cantidad - 1 };
            } else {
                return producto;
            }
        });
        setProducts(updatedProducts);
    };

    const eliminarProducto = (id) => {
        const updatedProducts = products.filter(producto => producto.id !== id);
        setProducts(updatedProducts);
    };

    useEffect(() => {
        localStorage.setItem("carrito", JSON.stringify(products));
    }, [products]);

    return (
        <div className="cartPage-containerPrincipal">
            <div className="row cartPage-header">
                <div className="col-2">
                    <Link to="/Catalogo" className="btn btn-primary"><i className="fa-solid fa-arrow-left"></i>Volver</Link>
                </div>
                <div className="col-8">
                    <h1>Carrito de compras</h1>
                </div>
            </div>

            {products && products.length > 0 ? (
                <div className="container-comprar-flotante">
                    <button className="btn-comprar"><i className="fa-solid fa-dolly"></i>Comprar</button>
                </div>
            ) : (
                <div className="container-comprar-flotante">
                    <button className="btn-comprar" hidden>Comprar</button>
                </div>
            )}
            <table className="cartPage-table">
                <thead>
                    <tr className="cartPage-tr">
                        <th className="cartPage-th">Imagen</th>
                        <th className="cartPage-th">Nombre</th>
                        <th className="cartPage-th">Precio</th>
                        <th className="cartPage-th">Cantidad</th>
                        <th className="cartPage-th">Agregar</th>
                        <th className="cartPage-th">Eliminar</th>
                    </tr>
                </thead>
                <tbody>
                    {products && products.length > 0 ? (
                        products.map((producto) => (
                            <tr className="cartPage-tr" key={producto.id}>
                                <td className="cartPage-td">
                                    <img src={fromB64(producto.imagen)} alt={producto.nombre}
                                        className="cartPage-images" />
                                </td>
                                <td className="cartPage-td">{producto.nombre}</td>
                                <td className="cartPage-td">${producto.precio}</td>
                                <td className="cartPage-td">{producto.cantidad}</td>
                                <td className="cartPage-td td-wd">
                                    <button className="quantity-buttons"
                                        onClick={() => addQuantity(producto.id)}>+</button>
                                    <button className="quantity-buttons"
                                        onClick={() => removeQuantity(producto.id)}>-</button>
                                </td>
                                <td className="cartPage-td"><button className="cartPage-delete-item"
                                    onClick={() => eliminarProducto(producto.id)}>Eliminar</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr className="cartPage-tr">
                            <td className="cartPage-td" colSpan="6">No hay productos en el carrito</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default ShoppingCartPage;
