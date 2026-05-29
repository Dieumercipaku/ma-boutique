import { useNavigate } from "react-router-dom";

export default function Home() {

  const navigate = useNavigate();

  return (

    <div className="min-h-screen bg-gradient-to-br from-black via-slate-950 to-blue-950 text-white overflow-hidden">

      {/* ================= HEADER ================= */}

      <header className="
        flex
        flex-col
        lg:flex-row
        items-center
        justify-between
        gap-6
        px-6
        lg:px-12
        py-6
        border-b
        border-white/10
      ">

        <div className="text-center lg:text-left">

          <h1 className="
            text-4xl
            lg:text-5xl
            font-extrabold
            text-cyan-400
          ">
            Ma Boutique RDC
          </h1>

          <p className="
            text-slate-300
            mt-2
            text-lg
          ">
            Gérez vos ventes facilement
          </p>

        </div>

        <div className="
          flex
          flex-wrap
          justify-center
          gap-4
        ">

          {/* ================= LOGIN BUTTON ================= */}

          <button
            onClick={() => navigate("/login")}
            className="
              bg-white
              text-black
              px-6
              py-3
              rounded-2xl
              font-bold
              hover:scale-105
              transition
            "
          >
            Connexion
          </button>

          {/* ================= APK BUTTON ================= */}

          <button
            onClick={() =>
              alert("APK bientôt disponible 🚀")
            }
            className="
              bg-cyan-500
              hover:bg-cyan-600
              px-6
              py-3
              rounded-2xl
              font-bold
              transition
            "
          >
            Télécharger APK
          </button>

        </div>

      </header>

      {/* ================= HERO ================= */}

      <section className="
        grid
        lg:grid-cols-2
        gap-12
        items-center
        px-6
        lg:px-12
        py-16
        max-w-7xl
        mx-auto
        min-h-[85vh]
      ">

        {/* ================= LEFT ================= */}

        <div className="text-center lg:text-left">

          <div className="
            inline-block
            bg-cyan-500/20
            text-cyan-300
            px-5
            py-2
            rounded-full
            text-sm
            mb-8
          ">
            Logiciel de gestion moderne
          </div>

          <h2 className="
            text-4xl
            lg:text-6xl
            font-extrabold
            leading-tight
            mb-8
          ">
            Gérez votre boutique comme un professionnel
          </h2>

          <p className="
            text-slate-300
            text-lg
            leading-9
            max-w-2xl
            mb-10
          ">
            Ma Boutique RDC vous aide à gérer vos ventes,
            votre stock, vos statistiques et vos rapports
            journaliers facilement depuis votre téléphone
            ou votre ordinateur.
          </p>

          <div className="
            flex
            flex-wrap
            justify-center
            lg:justify-start
            gap-5
          ">

            {/* ================= START BUTTON ================= */}

            <button
              onClick={() => navigate("/login")}
              className="
                bg-cyan-500
                hover:bg-cyan-600
                px-8
                py-4
                rounded-2xl
                font-bold
                text-lg
                transition
              "
            >
              Commencer
            </button>

            {/* ================= DEMO BUTTON ================= */}

            <button
              onClick={() =>
                alert("Démo bientôt disponible 🚀")
              }
              className="
                border
                border-white/20
                hover:bg-white/10
                px-8
                py-4
                rounded-2xl
                font-bold
                text-lg
                transition
              "
            >
              Voir Démo
            </button>

          </div>

        </div>

        {/* ================= RIGHT ================= */}

        <div className="
          bg-white/10
          backdrop-blur-xl
          border
          border-white/10
          rounded-[35px]
          p-6
          shadow-2xl
          w-full
          max-w-lg
          mx-auto
        ">

          <div className="
            grid
            grid-cols-1
            sm:grid-cols-2
            gap-5
            mb-6
          ">

            <div className="
              bg-black/30
              rounded-3xl
              p-6
            ">

              <p className="
                text-slate-300
                text-sm
                mb-2
              ">
                Ventes Aujourd'hui
              </p>

              <h3 className="
                text-3xl
                font-bold
                text-cyan-400
              ">
                250 000 FC
              </h3>

            </div>

            <div className="
              bg-black/30
              rounded-3xl
              p-6
            ">

              <p className="
                text-slate-300
                text-sm
                mb-2
              ">
                Produits
              </p>

              <h3 className="
                text-3xl
                font-bold
                text-cyan-400
              ">
                150
              </h3>

            </div>

          </div>

          <div className="
            bg-black/30
            rounded-3xl
            p-6
            mb-6
          ">

            <div className="flex justify-between mb-4">
              <span className="text-slate-300">Riz</span>
              <span className="font-bold">25 000 FC</span>
            </div>

            <div className="flex justify-between mb-4">
              <span className="text-slate-300">Huile</span>
              <span className="font-bold">32 000 FC</span>
            </div>

            <div className="flex justify-between">
              <span className="text-slate-300">Sucre</span>
              <span className="font-bold">15 000 FC</span>
            </div>

          </div>

          <button
            onClick={() => navigate("/ventes")}
            className="
              w-full
              bg-cyan-500
              hover:bg-cyan-600
              py-4
              rounded-2xl
              font-bold
              text-lg
              transition
            "
          >
            Nouvelle Vente
          </button>

        </div>

      </section>

      {/* ================= FEATURES ================= */}

      <section className="
        max-w-7xl
        mx-auto
        px-6
        lg:px-12
        pb-24
      ">

        <div className="
          text-center
          mb-16
        ">

          <h2 className="
            text-4xl
            font-bold
            mb-4
          ">
            Fonctionnalités Professionnelles
          </h2>

          <p className="
            text-slate-300
            text-lg
          ">
            Tout ce dont vous avez besoin pour gérer votre boutique.
          </p>

        </div>

        <div className="
          grid
          sm:grid-cols-2
          lg:grid-cols-4
          gap-6
        ">

          <div className="
            bg-white/10
            border
            border-white/10
            rounded-3xl
            p-7
            hover:scale-105
            transition
          ">
            <div className="text-5xl mb-5">🛒</div>

            <h3 className="
              text-xl
              font-bold
              mb-3
            ">
              Gestion des ventes
            </h3>

            <p className="text-slate-300">
              Enregistrez rapidement toutes vos ventes.
            </p>
          </div>

          <div className="
            bg-white/10
            border
            border-white/10
            rounded-3xl
            p-7
            hover:scale-105
            transition
          ">
            <div className="text-5xl mb-5">📦</div>

            <h3 className="
              text-xl
              font-bold
              mb-3
            ">
              Gestion du stock
            </h3>

            <p className="text-slate-300">
              Contrôlez automatiquement vos produits.
            </p>
          </div>

          <div className="
            bg-white/10
            border
            border-white/10
            rounded-3xl
            p-7
            hover:scale-105
            transition
          ">
            <div className="text-5xl mb-5">📊</div>

            <h3 className="
              text-xl
              font-bold
              mb-3
            ">
              Statistiques
            </h3>

            <p className="text-slate-300">
              Rapports journaliers, mensuels et annuels.
            </p>
          </div>

          <div className="
            bg-white/10
            border
            border-white/10
            rounded-3xl
            p-7
            hover:scale-105
            transition
          ">
            <div className="text-5xl mb-5">🖨️</div>

            <h3 className="
              text-xl
              font-bold
              mb-3
            ">
              Factures
            </h3>

            <p className="text-slate-300">
              Impression rapide des tickets clients.
            </p>
          </div>

        </div>

      </section>

      {/* ================= FOOTER ================= */}

      <footer className="
        border-t
        border-white/10
        py-8
        text-center
        text-slate-400
      ">
        © 2026 Ma Boutique RDC — Gérez vos ventes facilement
      </footer>

    </div>
  );
}