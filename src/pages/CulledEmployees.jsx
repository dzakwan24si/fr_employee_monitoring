import { useState, useEffect } from "react";
import { CulledTable } from "../components/DataManagement/CulledTable";
import { CulledFormModal } from "../components/DataManagement/CulledFormModal";
import { AngkatanFormModal } from "../components/DataManagement/AngkatanFormModal";
import { useCulled } from "../hooks/useCulled";
import { useAngkatan } from "../hooks/useAngkatan";

export default function CulledEmployees() {
  const { data, angkatanList, loading, error, addCulled, updateCulled, deleteCulled, refetch: refetchCulled } = useCulled();
  const { addAngkatan } = useAngkatan();
  
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  
  const [isAngkatanModalOpen, setIsAngkatanModalOpen] = useState(false);

  useEffect(() => {
    const handleOpenAngkatanModal = () => setIsAngkatanModalOpen(true);
    window.addEventListener('openAngkatanModal', handleOpenAngkatanModal);
    return () => window.removeEventListener('openAngkatanModal', handleOpenAngkatanModal);
  }, []);

  const handleAdd = () => {
    setEditingEmployee(null);
    setIsFormOpen(true);
  };

  const handleEdit = (employee) => {
    setEditingEmployee(employee);
    setIsFormOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await deleteCulled(id);
    } catch (err) {
      alert("Gagal menghapus data: " + err.message);
    }
  };

  const handleSubmitForm = async (formData) => {
    const payload = { 
      nama: formData.nama,
      id_angkatan: formData.id_angkatan,
      kategori_status: formData.kategori_status,
      alasan: formData.alasan
    };

    if (editingEmployee) {
      await updateCulled(editingEmployee.id_culled, payload);
    } else {
      await addCulled(payload);
    }
  };

  const handleAddAngkatan = async (formData) => {
    try {
      await addAngkatan(formData);
      // Refetch culled data so the angkatanList gets updated in the dropdown
      await refetchCulled();
    } catch (err) {
      throw err;
    }
  };

  if (error) {
    return <div className="p-4 bg-red-50 text-red-600 rounded-xl">Error loading data: {error}</div>;
  }

  return (
    <div className="h-full">
      <CulledTable 
        data={data}
        loading={loading}
        title="Data Staf Culled"
        description="Daftar karyawan FR Academy yang diberhentikan atau resign di luar prosedur reguler."
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <CulledFormModal 
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleSubmitForm}
        initialData={editingEmployee}
        angkatanList={angkatanList}
      />

      {/* Quick Add Angkatan Modal */}
      <AngkatanFormModal 
        isOpen={isAngkatanModalOpen}
        onClose={() => setIsAngkatanModalOpen(false)}
        onSubmit={handleAddAngkatan}
      />
    </div>
  );
}
