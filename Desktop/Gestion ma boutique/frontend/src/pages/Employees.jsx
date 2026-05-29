import { useEffect, useState } from "react";

import axios from "axios";

import { useNavigate } from "react-router-dom";

import "../styles/dashboard.css";

function Employees() {

  const navigate = useNavigate();

  // ================= STATES =================

  const [employees, setEmployees] =
    useState([]);

  const [showModal, setShowModal] =
    useState(false);

  const [newEmployee, setNewEmployee] =
    useState({
      name: "",
      email: "",
      password: "",
      role: "caissier"
    });

  // ================= LOAD =================

  useEffect(() => {

    loadEmployees();

  }, []);

  // ================= GET EMPLOYEES =================

  const loadEmployees = async () => {

    try {

      const res = await axios.get(
        "http://10.121.181.54:5000/api/employees"
      );

      setEmployees(res.data);

    } catch (err) {

      console.log(err);
    }
  };

  // ================= ADD EMPLOYEE =================

  const addEmployee = async () => {

    try {

      await axios.post(

        "http://10.121.181.54:5000/api/employees",

        newEmployee
      );

      alert(
        "Employé ajouté ✅"
      );

      setShowModal(false);

      setNewEmployee({
        name: "",
        email: "",
        password: "",
        role: "caissier"
      });

      loadEmployees();

    } catch (err) {

      console.log(err);

      alert(
        "Erreur ajout ❌"
      );
    }
  };

  // ================= BLOCK EMPLOYEE =================

  const blockEmployee = async (id) => {

    try {

      await axios.put(
        `http://10.121.181.54:5000/api/employees/${id}/block`
      );

      alert(
        "Employé bloqué ⛔"
      );

      loadEmployees();

    } catch (err) {

      console.log(err);
    }
  };

  return (

    <div className="dashboard">

      <div className="content">

        {/* ================= HEADER ================= */}

        <div className="products-header">

          <h1>
            Gestion Employés
          </h1>

          <div
            style={{
              display: "flex",
              gap: "10px",
              flexWrap: "wrap"
            }}
          >

            <button
              className="save-btn"
              onClick={() =>
                navigate("/rh")
              }
            >
              📊 Tableau RH
            </button>

            <button
              className="add-btn"
              onClick={() =>
                setShowModal(true)
              }
            >
              + Ajouter Employé
            </button>

          </div>

        </div>

        {/* ================= TABLE ================= */}

        <div
          style={{
            overflowX: "auto"
          }}
        >

          <table>

            <thead>

              <tr>

                <th>Nom</th>

                <th>Email</th>

                <th>Rôle</th>

                <th>Statut</th>

                <th>Actions</th>

              </tr>

            </thead>

            <tbody>

              {employees.map((emp) => (

                <tr key={emp.id}>

                  <td>{emp.name}</td>

                  <td>{emp.email}</td>

                  <td>{emp.role}</td>

                  <td>

                    {emp.active
                      ? "✅ Actif"
                      : "⛔ Bloqué"}

                  </td>

                  <td>

                    {emp.active && (

                      <button
                        className="delete-btn"
                        onClick={() =>
                          blockEmployee(emp.id)
                        }
                      >
                        Bloquer
                      </button>

                    )}

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

      {/* ================= MODAL ================= */}

      {showModal && (

        <div className="modal-overlay">

          <div className="modal">

            <h2>
              Ajouter Employé
            </h2>

            <input
              type="text"
              placeholder="Nom"
              value={newEmployee.name}
              onChange={(e) =>
                setNewEmployee({
                  ...newEmployee,
                  name:
                    e.target.value
                })
              }
            />

            <input
              type="email"
              placeholder="Email"
              value={newEmployee.email}
              onChange={(e) =>
                setNewEmployee({
                  ...newEmployee,
                  email:
                    e.target.value
                })
              }
            />

            <input
              type="password"
              placeholder="Mot de passe"
              value={newEmployee.password}
              onChange={(e) =>
                setNewEmployee({
                  ...newEmployee,
                  password:
                    e.target.value
                })
              }
            />

            <select
              value={newEmployee.role}
              onChange={(e) =>
                setNewEmployee({
                  ...newEmployee,
                  role:
                    e.target.value
                })
              }
            >

              <option value="caissier">
                Caissier
              </option>

              <option value="admin">
                Admin
              </option>

            </select>

            <div className="modal-buttons">

              <button
                className="save-btn"
                onClick={addEmployee}
              >
                Ajouter
              </button>

              <button
                className="delete-btn"
                onClick={() =>
                  setShowModal(false)
                }
              >
                Fermer
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}

export default Employees;