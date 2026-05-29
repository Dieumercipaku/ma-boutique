import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

export default function RH() {

  const [stats, setStats] = useState({
    presents: 0,
    absents: 0,
    retards: 0,
    worked_hours: []
  });

  useEffect(() => {
    fetchRH();
  }, []);

  const fetchRH = async () => {

    try {

      const res = await api.get("/rh/dashboard");

      setStats(res.data);

    } catch (err) {

      console.log(err);
    }
  };

  return (

    <div className="p-6">

      {/* NAVIGATION */}

      <div className="flex flex-wrap gap-3 mb-6">

        <Link to="/dashboard">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">
            ⬅ Dashboard
          </button>
        </Link>

        <Link to="/pos">
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg">
            🛒 Vente
          </button>
        </Link>

        <Link to="/employees">
          <button className="bg-purple-600 text-white px-4 py-2 rounded-lg">
            👥 Employés
          </button>
        </Link>

        <Link to="/">
          <button className="bg-gray-700 text-white px-4 py-2 rounded-lg">
            🏠 Accueil
          </button>
        </Link>

      </div>

      <h1 className="text-3xl font-bold mb-6">
        Dashboard RH 👥
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

        <div className="bg-green-500 text-white p-5 rounded-xl">
          <h2 className="text-xl">Présents</h2>
          <p className="text-4xl">
            {stats.presents}
          </p>
        </div>

        <div className="bg-red-500 text-white p-5 rounded-xl">
          <h2 className="text-xl">Absents</h2>
          <p className="text-4xl">
            {stats.absents}
          </p>
        </div>

        <div className="bg-yellow-500 text-white p-5 rounded-xl">
          <h2 className="text-xl">Retards</h2>
          <p className="text-4xl">
            {stats.retards}
          </p>
        </div>

      </div>

      <div className="mt-8">

        <h2 className="text-2xl font-bold mb-4">
          Heures travaillées 🕒
        </h2>

        <table className="w-full border">

          <thead>

            <tr className="bg-gray-200">

              <th className="p-2 border">
                Employé
              </th>

              <th className="p-2 border">
                Heures
              </th>

            </tr>

          </thead>

          <tbody>

            {stats.worked_hours?.map((item, index) => (

              <tr key={index}>

                <td className="p-2 border">
                  {item.employee_id}
                </td>

                <td className="p-2 border">
                  {item.worked_hours}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}