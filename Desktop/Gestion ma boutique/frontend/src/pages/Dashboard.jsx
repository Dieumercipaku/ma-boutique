import {
  Home,
  Users,
  BarChart3,
  ShoppingCart,
  Moon,
  RefreshCcw,
  Plus,
  Package,
  AlertTriangle,
  Calendar,
  Wallet
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import { useState } from "react";

import "../styles/dashboard.css";
import api from "../services/api";

export default function Dashboard() {

  const navigate = useNavigate();

  const [showAddModal, setShowAddModal] =
    useState(false);
const [product, setProduct] = useState({
  name: "",
  price: "",
  stock: ""
});

const addProduct = async () => {

  try {

    await api.post("/products", {
      shop_id: 1,
      name: product.name,
      price: Number(product.price),
      stock: Number(product.stock)
    });

    alert("Produit ajouté ✅");

    setShowAddModal(false);

    setProduct({
      name: "",
      price: "",
      stock: ""
    });

  } catch (err) {

    console.log(err);

    alert("Erreur ajout produit ❌");

  }

  try {

    await api.post("/products", {
      shop_id: 1,
      name: product.name,
      price: Number(product.price),
      stock: Number(product.stock)
    });

    alert("Produit ajouté ✅");

    setShowAddModal(false);

    setProduct({
      name: "",
      price: "",
      stock: ""
    });

  } catch (err) {

    console.log(err);

    alert("Erreur ajout produit ❌");
  }
};

  return (

    <div className="dashboard">

      {/* ================= SIDEBAR ================= */}

      <div className="sidebar">

        <h1 className="logo">
          🛍️ Ma Boutique
        </h1>

        {/* MENU */}

        <div className="menu">

          <button
            className="menu-btn active"
            onClick={() =>
              navigate("/dashboard")
            }
          >
            <Home size={20} />
            Tableau de bord
          </button>

          <button
            className="menu-btn"
            onClick={() =>
              navigate("/employees")
            }
          >
            <Users size={20} />
            Employés
          </button>

          <button
            className="menu-btn"
            onClick={() =>
              navigate("/rh")
            }
          >
            <BarChart3 size={20} />
            RH
          </button>

          <button
            className="menu-btn"
            onClick={() =>
              navigate("/pos")
            }
          >
            <ShoppingCart size={20} />
            Ventes
          </button>

        </div>

        {/* ACTIONS */}

        <div className="actions">

          <button
            className="action-btn green"
            onClick={() =>
              window.location.reload()
            }
          >
            <RefreshCcw size={18} />
            Actualiser
          </button>

          <button
            className="action-btn blue"
            onClick={() =>
              navigate("/rh")
            }
          >
            <BarChart3 size={18} />
            Tableau RH
          </button>

          <button
            className="action-btn green"
            onClick={() =>
              setShowAddModal(true)
            }
          >
            <Plus size={18} />
            Ajouter produit
          </button>

        </div>

        {/* DARK MODE */}

        <button className="dark-btn">

          <Moon size={18} />

          Sombre

        </button>

        {/* USER */}

        <div className="user-card">

          <div className="avatar">
            👤
          </div>

          <div>

            <p>Connecté</p>

            <strong>
              utilisateur
            </strong>

            <br />

            <span className="online">
              ● En ligne
            </span>

          </div>

        </div>

      </div>

      {/* ================= CONTENT ================= */}

      <div className="content">

        <h1 className="title">
          Tableau de bord 👋
        </h1>

        <p className="connected">
          👤 Connecté :
          {" "}
          <span>utilisateur</span>
        </p>

        {/* STATS */}

        <div className="cards">

          <div className="card">

            <div className="icon blue-icon">
              <Wallet />
            </div>

            <h3>Total ventes</h3>

            <h1>0 FC</h1>

            <p>Total général</p>

          </div>

          <div className="card">

            <div className="icon purple-icon">
              <Package />
            </div>

            <h3>Produits</h3>

            <h1>0</h1>

            <p>Total produits</p>

          </div>

          <div className="card">

            <div className="icon orange-icon">
              <ShoppingCart />
            </div>

            <h3>Commandes</h3>

            <h1>0</h1>

            <p>Total commandes</p>

          </div>

          <div className="card">

            <div className="icon red-icon">
              <AlertTriangle />
            </div>

            <h3>Stock faible</h3>

            <h1>0</h1>

            <p>Produits critiques</p>

          </div>

          <div className="card">

            <div className="icon cyan-icon">
              <BarChart3 />
            </div>

            <h3>Journalier</h3>

            <h1>0 FC</h1>

            <p>Ventes du jour</p>

          </div>

        </div>

        {/* SECOND CARDS */}

        <div className="cards small-cards">

          <div className="card">

            <div className="icon blue-icon">
              <Calendar />
            </div>

            <h3>Hebdomadaire</h3>

            <h1>0 FC</h1>

            <p>7 derniers jours</p>

          </div>

          <div className="card">

            <div className="icon green-icon">
              <Calendar />
            </div>

            <h3>Mensuel</h3>

            <h1>0 FC</h1>

            <p>Ce mois-ci</p>

          </div>

          <div className="card">

            <div className="icon purple-icon">
              <Calendar />
            </div>

            <h3>Annuel</h3>

            <h1>0 FC</h1>

            <p>Cette année</p>

          </div>

        </div>

      </div>

      {/* ================= MODAL ================= */}

      {
        showAddModal && (

          <div className="modal-overlay">

            <div className="modal">

              <h2>
                Ajouter Produit
              </h2>

              <input
                type="text"
                placeholder="Nom produit"
                value={product.name}
                onChange={(e) =>
                  setProduct({
                    ...product,
                    name: e.target.value
                  })
                }
              />

              <input
                type="number"
                placeholder="Prix"
                value={product.price}
                onChange={(e) =>
                  setProduct({
                    ...product,
                    price: e.target.value
                  })
                }
              />

              <input
                type="number"
                placeholder="Stock"
                value={product.stock}
                onChange={(e) =>
                  setProduct({
                    ...product,
                    stock: e.target.value
                  })
                }
              />

              <div className="modal-buttons">

                <button
                  className="save-btn"
                  onClick={addProduct}
                >
                  Ajouter
                </button>

                <button
                  className="delete-btn"
                  onClick={() =>
                    setShowAddModal(false)
                  }
                >
                  Fermer
                </button>

              </div>

            </div>

          </div>

        )
      }

    </div>
  );
}