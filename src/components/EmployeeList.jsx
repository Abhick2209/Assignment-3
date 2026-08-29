import EmployeeCard from "./EmployeeCard";

function EmployeeList({ employees, onEdit, onDelete }) {
  return (
    <section className="employee-section">

      <h2>Employee List</h2>

      {employees.length === 0 ? (
        <p className="no-data">
          No employees found.
        </p>
      ) : (
        <div className="employee-grid">

          {employees.map((employee) => (
            <EmployeeCard
              key={employee.id}
              employee={employee}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}

        </div>
      )}

    </section>
  );
}

export default EmployeeList;