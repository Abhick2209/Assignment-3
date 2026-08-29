import { useState } from "react";

import Header from "./components/Header";
import EmployeeForm from "./components/EmployeeForm";
import EmployeeList from "./components/EmployeeList";
import Footer from "./components/Footer";

import "./App.css";

function App() {

  const [employees, setEmployees] = useState([
    {
      id: 1,
      name: "Rahul Sharma",
      employeeId: "EMP001",
      department: "Agriculture",
      gender: "Male",
      phone: "9876543210",
      localAddress: "Village Road, Pune",
      permanentAddress: "Main Road, Nashik"
    },

    {
      id: 2,
      name: "Priya Singh",
      employeeId: "EMP002",
      department: "Accounts",
      gender: "Female",
      phone: "9876501234",
      localAddress: "Station Road, Pune",
      permanentAddress: "MG Road, Mumbai"
    },

    {
      id: 3,
      name: "Amit Kumar",
      employeeId: "EMP003",
      department: "Marketing",
      gender: "Male",
      phone: "9123456780",
      localAddress: "Market Road, Pune",
      permanentAddress: "City Road, Nagpur"
    }
  ]);

  const [formData, setFormData] = useState({
    name: "",
    employeeId: "",
    department: "",
    gender: "",
    phone: "",
    localAddress: "",
    permanentAddress: ""
  });

  const [editingId, setEditingId] = useState(null);

  const [search, setSearch] = useState("");

  const [departmentFilter, setDepartmentFilter] = useState("All");


  // Add / Update Employee
  const handleSubmit = (event) => {

    event.preventDefault();

    if (editingId) {

      setEmployees(
        employees.map((employee) =>
          employee.id === editingId
            ? {
                ...employee,
                ...formData
              }
            : employee
        )
      );

      setEditingId(null);

    } else {

      const newEmployee = {
        id: Date.now(),
        ...formData
      };

      setEmployees([
        ...employees,
        newEmployee
      ]);
    }

    // Clear form
    setFormData({
      name: "",
      employeeId: "",
      department: "",
      gender: "",
      phone: "",
      localAddress: "",
      permanentAddress: ""
    });
  };


  // Delete Employee
  const handleDelete = (id) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this employee?"
    );

    if (confirmDelete) {
      setEmployees(
        employees.filter(
          (employee) => employee.id !== id
        )
      );
    }
  };


  // Edit Employee
  const handleEdit = (employee) => {

    setFormData({
      name: employee.name,
      employeeId: employee.employeeId,
      department: employee.department,
      gender: employee.gender,
      phone: employee.phone,
      localAddress: employee.localAddress,
      permanentAddress: employee.permanentAddress
    });

    setEditingId(employee.id);

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };


  // Cancel Edit
  const cancelEdit = () => {

    setEditingId(null);

    setFormData({
      name: "",
      employeeId: "",
      department: "",
      gender: "",
      phone: "",
      localAddress: "",
      permanentAddress: ""
    });
  };


  // Search + Department Filter
  const filteredEmployees = employees.filter((employee) => {

    const searchText =
      search.toLowerCase();

    const matchesSearch =
      employee.name
        .toLowerCase()
        .includes(searchText) ||
      employee.employeeId
        .toLowerCase()
        .includes(searchText) ||
      employee.phone
        .includes(searchText);

    const matchesDepartment =
      departmentFilter === "All" ||
      employee.department === departmentFilter;

    return matchesSearch && matchesDepartment;
  });


  return (
    <>
      <Header />

      <main>

        <EmployeeForm
          formData={formData}
          setFormData={setFormData}
          handleSubmit={handleSubmit}
          editingId={editingId}
          cancelEdit={cancelEdit}
        />


        {/* Search and Filter */}

        <section className="filter-section">

          <input
            type="text"
            placeholder="Search by name, ID or phone..."
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
          />

          <select
            value={departmentFilter}
            onChange={(event) =>
              setDepartmentFilter(event.target.value)
            }
          >
            <option value="All">
              All Departments
            </option>

            <option value="Agriculture">
              Agriculture
            </option>

            <option value="Accounts">
              Accounts
            </option>

            <option value="Marketing">
              Marketing
            </option>

            <option value="Human Resources">
              Human Resources
            </option>

            <option value="Management">
              Management
            </option>

          </select>

        </section>


        {/* Employee Count */}

        <div className="count-box">

          <h2>
            Total Employees: {employees.length}
          </h2>

          <p>
            Showing: {filteredEmployees.length}
          </p>

        </div>


        <EmployeeList
          employees={filteredEmployees}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

      </main>

      <Footer />
    </>
  );
}

export default App;