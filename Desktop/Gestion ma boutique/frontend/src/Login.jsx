import { useState } from "react";
import axios from "axios";

export default function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async (e) => {
    e.preventDefault();

    try {

      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email,
          password
        }
      );

      localStorage.setItem("token", res.data.token);

      alert("Connexion réussie ✅");

      window.location.href = "/dashboard";

    } catch (err) {

      alert(
        err.response?.data?.error || "Erreur login"
      );
    }
  };

  return (
    <div className="login-page">

      <form onSubmit={login} className="login-box">

        <h1>Connexion Boutique</h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <button type="submit">
          Se connecter
        </button>

      </form>

    </div>
  );
}