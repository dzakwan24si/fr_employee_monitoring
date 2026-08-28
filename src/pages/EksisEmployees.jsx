import { useState } from "react";
import { DataTable } from "../components/EmployeeTable/DataTable";
import { EmployeeFormModal } from "../components/EmployeeForm/EmployeeFormModal";
import { dummyEmployees } from "../data/dummyEmployees";

export default function EksisEmployees() {
  const [data, setData] = useState(dummyEmployees);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);

  const handleAdd = () => {
    setEditingEmployee(null);
    setIsModalOpen(true);
  };

  const handleEdit = (employee) => {
    setEditingEmployee(employee);
    setIsModalOpen(true);
  };

  const handleSubmit = (payload) => {
    if (editingEmployee) {
      setData((prev) => prev.map((item) => (item.id === payload.id ? payload : item)));
    } else {
      setData((prev) => [payload, ...prev]);
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800">Data Staf Eksis</h2>
        <p className="text-gray-500 mt-2">Daftar staf aktif yang sedang beroperasi di berbagai region.</p>
      </div>

      <DataTable 
        data={data} 
        statusFilter="Eksis" 
        onAdd={handleAdd} 
        onEdit={handleEdit} 
      />

      <EmployeeFormModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialData={editingEmployee}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
