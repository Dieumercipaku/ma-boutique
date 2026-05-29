import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../styles/dashboard.css";

function POS() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [search, setSearch] = useState("");
  const [cash, setCash] = useState("");


  useEffect(() => {
    loadProducts();
  }, []);

const loadProducts = async () => {
  try {

    const res = await axios.get(
      "https://ma-boutique-npcs.onrender.com/api/products"
    );

    console.log("PRODUITS :", res.data);

    setProducts(
      Array.isArray(res.data)
        ? res.data
        : []
    );

  } catch (err) {

    console.log("ERREUR PRODUITS", err);
  }
};

  const addToCart = (product) => {
    const existing = cart.find(
      (item) => item.id === product.id
    );

    if (existing) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item
        )
      );
    } else {
      setCart([
        ...cart,
        {
          ...product,
          quantity: 1,
        },
      ]);
    }
  };

  const removeItem = (id) => {
    setCart(
      cart.filter((item) => item.id !== id)
    );
  };

  const total = cart.reduce(
    (sum, item) =>
      sum + item.price * item.quantity,
    0
  );

  const validateSale = async () => {
    if (cart.length === 0) {
      alert("Panier vide ❌");
      return;
    }

    try {
      const user = JSON.parse(
        localStorage.getItem("user")
      );

      await axios.post(
        "https://ma-boutique-npcs.onrender.com/api/sales",
        {
          total,
          seller: user?.name || "Caissier",
          items: cart,
        }
      );

      alert("Vente enregistrée ✅");

      setCart([]);
      setCash("");

      loadProducts();
    } catch (err) {
      console.log(err);
      alert("Erreur serveur ❌");
    }
  };

  const imprimerFacture = () => {
    if (cart.length === 0) {
      alert("Panier vide ❌");
      return;
    }

    window.print();
  };

  return (
    <div className="pos-container">

      <div className="top-bar">
        <Link to="/dashboard">
          <button className="back-btn">
            ⬅ Retour Dashboard
          </button>
        </Link>
      </div>

      <div className="pos-products">

        <div className="top-pos">
          <h2>🛒 Vente Boutique</h2>

          <input
            type="text"
            placeholder="Recherche produit..."
            className="search-input"
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />
        </div>

        <div className="product-grid">
          {products
            .filter((p) =>
              p?.name
                ?.toLowerCase()
                .includes(
                  search.toLowerCase()
                )
            )
            .map((p) => (
              <div
                key={p.id}
                className="product-card"
                onClick={() => addToCart(p)}
              >
                <h3>{p.name}</h3>
                <p>{p.price} FC</p>
                <p>Stock : {p.stock}</p>
              </div>
            ))}
        </div>

      </div>

      <div className="cart">

        <h2>🧾 Panier</h2>

        {cart.length === 0 && (
          <p>Aucun produit</p>
        )}

        {cart.map((item) => (
          <div
            key={item.id}
            className="cart-item"
          >
            <div>
              <strong>{item.name}</strong>
              <p>
                {item.quantity} x {item.price} FC
              </p>
            </div>

            <div>
              <strong>
                {item.quantity * item.price} FC
              </strong>

              <button
                className="delete-btn"
                onClick={() =>
                  removeItem(item.id)
                }
              >
                X
              </button>
            </div>
          </div>
        ))}

        <div className="total-box">

          <h2>Total : {total} FC</h2>

          <input
            type="number"
            placeholder="Montant reçu"
            className="cash-input"
            value={cash}
            onChange={(e) =>
              setCash(e.target.value)
            }
          />

          <h3>
            Monnaie : {(cash || 0) - total} FC
          </h3>

        </div>

        <button
          className="save-btn"
          onClick={validateSale}
        >
          ✅ Valider Vente
        </button>

        <button
          className="save-btn"
          onClick={imprimerFacture}
          style={{ marginTop: "10px" }}
        >
          🖨️ Imprimer Facture
        </button>

      </div>

    </div>
  );
}

export default POS;