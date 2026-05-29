import { useState } from "react";

import axios from "axios";

import {
  useNavigate
} from "react-router-dom";

import {
  Eye,
  EyeOff
} from "lucide-react";

function Login() {

  const navigate = useNavigate();

  // ================= STATES =================

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  // ================= LOGIN =================

  const login = async () => {

    if (!email || !password) {

      setError(
        "Veuillez remplir tous les champs"
      );

      return;
    }

    try {

      setLoading(true);

      setError("");

      const res = await axios.post(
        "https://ma-boutique-npcs.onrender.com/api/auth/login",
        {
          email,
          password
        }
      );

      // ================= SAVE TOKEN =================

      localStorage.setItem(
        "token",
        res.data.token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(res.data.user)
      );

      // ================= SUCCESS =================

      alert("Connexion réussie ✅");

      navigate("/dashboard");

    } catch (err) {

      console.log(err);

      setError(
        err.response?.data?.error ||
        "Erreur de connexion"
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
      px-4
      py-10
    ">

      <div className="
        w-full
        max-w-md
        bg-white/10
        backdrop-blur-xl
        border
        border-white/10
        rounded-[30px]
        p-6
        sm:p-8
        shadow-2xl
      ">

        {/* ================= TITLE ================= */}

        <div className="text-center mb-8">

          <h1 className="
            text-3xl
            sm:text-4xl
            font-extrabold
            text-cyan-400
            mb-3
          ">
            Ma Boutique RDC
          </h1>

          <p className="
            text-slate-300
            text-base
            sm:text-lg
          ">
            Connectez-vous à votre compte
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
            placeholder="Entrez votre email"
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

          <div className="relative">

            <input
              type={
                showPassword
                  ? "text"
                  : "password"
              }
              placeholder="Entrez votre mot de passe"
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

            <button
              type="button"
              onClick={() =>
                setShowPassword(
                  !showPassword
                )
              }
              className="
                absolute
                right-4
                top-1/2
                -translate-y-1/2
                text-slate-300
              "
            >

              {showPassword
                ? <EyeOff size={22} />
                : <Eye size={22} />
              }

            </button>

          </div>

        </div>

        {/* ================= BUTTONS ================= */}

        <div className="flex flex-col gap-4">

          {/* LOGIN */}

          <button
            onClick={login}
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
              ? "Connexion..."
              : "Connexion"
            }

          </button>

          {/* CREATE ACCOUNT */}

          <button
            onClick={() =>
              navigate("/register")
            }
            className="
              w-full
              border
              border-cyan-400/30
              text-cyan-400
              hover:bg-cyan-500/10
              py-4
              rounded-2xl
              font-bold
              text-lg
              transition
            "
          >
            Créer un compte
          </button>

          {/* HOME */}

          <button
            onClick={() => navigate("/")}
            className="
              w-full
              border
              border-white/10
              hover:bg-white/10
              py-4
              rounded-2xl
              font-bold
              transition
            "
          >
            Retour Accueil
          </button>

        </div>

      </div>

    </div>
  );
}

export default Login;