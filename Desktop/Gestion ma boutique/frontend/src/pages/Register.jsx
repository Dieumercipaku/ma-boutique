import { useState } from "react";

import axios from "axios";

import API from "../services/api";

import {
  useNavigate
} from "react-router-dom";

function Register() {

  const navigate = useNavigate();

  // ================= STATES =================

  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  // ================= REGISTER =================

  const register = async () => {

    if (
      !name ||
      !email ||
      !password
    ) {

      setError(
        "Veuillez remplir tous les champs"
      );

      return;
    }

    try {

      setLoading(true);

      setError("");

      const res = await API.post("/auth/register", {
  name,
  email,
  password
});

      // ================= SAVE TOKEN =================

      localStorage.setItem(
        "token",
        res.data.token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(res.data.user)
      );

      alert(
        "Compte créé avec succès ✅"
      );

      navigate("/dashboard");

    } catch (err) {

      console.log(err);

      setError(

        err.response?.data?.error ||

        "Erreur serveur"
      );

    } finally {

      setLoading(false);
    }
  };

  // ================= RETURN =================

  return (

    <div className="
      min-h-screen
      flex
      items-center
      justify-center
      bg-gradient-to-br
      from-black
      via-slate-950
      to-blue-950
      px-6
    ">

      <div className="
        w-full
        max-w-md
        bg-white/10
        backdrop-blur-xl
        border
        border-white/10
        rounded-[35px]
        p-8
        shadow-2xl
      ">

        {/* ================= TITLE ================= */}

        <div className="text-center mb-8">

          <h1 className="
            text-4xl
            font-extrabold
            text-cyan-400
            mb-3
          ">
            Créer un compte
          </h1>

          <p className="
            text-slate-300
            text-lg
          ">
            Rejoignez Ma Boutique RDC
          </p>

        </div>

        {/* ================= ERROR ================= */}

        {error && (

          <div className="
            bg-red-500/20
            border
            border-red-500/40
            text-red-300
            p-4
            rounded-2xl
            mb-5
            text-center
          ">
            {error}
          </div>

        )}

        {/* ================= NAME ================= */}

        <div className="mb-5">

          <label className="
            block
            text-slate-300
            mb-2
          ">
            Nom
          </label>

          <input
            type="text"
            placeholder="Votre nom"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            className="
              w-full
              bg-black/30
              border
              border-white/10
              rounded-2xl
              px-5
              py-4
              text-white
              placeholder-slate-400
              focus:outline-none
              focus:border-cyan-400
            "
          />

        </div>

        {/* ================= EMAIL ================= */}

        <div className="mb-5">

          <label className="
            block
            text-slate-300
            mb-2
          ">
            Email
          </label>

          <input
            type="email"
            placeholder="Votre email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            className="
              w-full
              bg-black/30
              border
              border-white/10
              rounded-2xl
              px-5
              py-4
              text-white
              placeholder-slate-400
              focus:outline-none
              focus:border-cyan-400
            "
          />

        </div>

        {/* ================= PASSWORD ================= */}

        <div className="mb-6">

          <label className="
            block
            text-slate-300
            mb-2
          ">
            Mot de passe
          </label>

          <input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            className="
              w-full
              bg-black/30
              border
              border-white/10
              rounded-2xl
              px-5
              py-4
              text-white
              placeholder-slate-400
              focus:outline-none
              focus:border-cyan-400
            "
          />

        </div>

        {/* ================= BUTTON ================= */}

        <button
          onClick={register}
          disabled={loading}
          className="
            w-full
            bg-cyan-500
            hover:bg-cyan-600
            py-4
            rounded-2xl
            font-bold
            text-lg
            transition
            disabled:opacity-50
          "
        >

          {loading
            ? "Création..."
            : "Créer un compte"
          }

        </button>

        {/* ================= LOGIN ================= */}

        <button
          onClick={() => navigate("/login")}
          className="
            w-full
            mt-4
            border
            border-white/10
            hover:bg-white/10
            py-4
            rounded-2xl
            font-bold
            transition
          "
        >
          Déjà un compte ?
        </button>

      </div>

    </div>
  );
}

export default Register;