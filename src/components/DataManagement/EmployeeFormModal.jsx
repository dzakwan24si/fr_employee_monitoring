import { useState, useEffect } from "react";
import { X, Save, Loader2 } from "lucide-react";

const initialFormState = {
  "NIK": "", 
  "NAMA": "", 
  "JOIN DATE": "", 
  "JABATAN": "", 
  "LEVEL JABATAN": "", 
  "ANGKATAN FR ACADEMY": "", 
  "KATEGORI": "", 
  "ALUMNI": "", 
  "SUKU": "", 
  "AGAMA": "", 
  "LOKASI TERAKHIR": "", 
  "REGION TERAKHIR": "", 
  "STATUS": "Eksis", 
  "DATE TERMINATE": "", 
  "BULAN TERMINATE": "", 
  "TAHUN TERMINATE": "", 
  "LAMA BEKERJA (BULAN)": "", 
  "LAMA BEKERJA (TAHUN)": "", 
  "LAMA BEKERJA": "", 
  "Alasan Resign": "", 
  "Detail": "", 
  "LOKASI AWAL PENEMPATAN": "", 
  "REGION AWAL PENEMPATAN": "", 
  "GM": "", 
  "MK": ""
};

export function EmployeeFormModal({ isOpen, onClose, onSubmit, initialData }) {
  const [formData, setFormData] = useState(initialFormState);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Load initial data if editing
  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData(initialFormState);
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // For numbers, parse them correctly or allow strings
    let finalValue = value;
    if (name === "TAHUN TERMINATE" || name === "LAMA BEKERJA (BULAN)" || name === "LAMA BEKERJA (TAHUN)") {
      finalValue = value === "" ? null : Number(value);
    }

    setFormData((prev) => ({ ...prev, [name]: finalValue }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await onSubmit(formData);
      onClose();
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Terjadi kesalahan saat menyimpan data: " + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderInput = (label, name, type = "text", required = false) => (
    <div>
      <label className="block text-xs font-semibold text-gray-600 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        name={name}
        value={formData[name] === null ? "" : formData[name] || ""}
        onChange={handleChange}
        required={required}
        className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#2c8f42] focus:border-transparent outline-none transition-all"
      />
    </div>
  );

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-[2rem] shadow-xl w-full max-w-5xl max-h-[90vh] flex flex-col overflow-hidden animate-in slide-in-from-bottom-4 duration-300">
        
        {/* Header */}
        <div className="px-8 py-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50 shrink-0">
          <div>
            <h2 className="text-xl font-bold text-gray-800">
              {initialData ? "Edit Data Karyawan" : "Tambah Karyawan Baru"}
            </h2>
            <p className="text-sm text-gray-500 font-medium">Lengkapi formulir di bawah ini</p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-200 rounded-full text-gray-500 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Form Content */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-8">
          <div className="space-y-8">
            
            {/* Bagian 1: Data Utama */}
            <section>
              <h3 className="text-sm font-bold text-[#2c8f42] uppercase tracking-wider border-b border-gray-100 pb-2 mb-4">
                1. Data Utama
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {renderInput("NIK", "NIK", "text", true)}
                {renderInput("Nama Lengkap", "NAMA", "text", true)}
                {renderInput("Join Date", "JOIN DATE", "date")}
                {renderInput("Jabatan", "JABATAN")}
                {renderInput("Level Jabatan", "LEVEL JABATAN")}
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Status Karyawan <span className="text-red-500">*</span></label>
                  <select name="STATUS" value={formData["STATUS"] || ""} onChange={handleChange} required className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#2c8f42] outline-none">
                    <option value="Eksis">Eksis</option>
                    <option value="Terminate">Terminate</option>
                    <option value="Culled">Culled</option>
                    <option value="Resign">Resign</option>
                  </select>
                </div>
              </div>
            </section>

            {/* Bagian 2: Data Pribadi */}
            <section>
              <h3 className="text-sm font-bold text-[#2c8f42] uppercase tracking-wider border-b border-gray-100 pb-2 mb-4">
                2. Data Pribadi
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {renderInput("Suku", "SUKU")}
                {renderInput("Agama", "AGAMA")}
                {renderInput("Alumni (Universitas)", "ALUMNI")}
                {renderInput("Kategori", "KATEGORI")}
              </div>
            </section>

            {/* Bagian 3: Penempatan & Struktur */}
            <section>
              <h3 className="text-sm font-bold text-[#2c8f42] uppercase tracking-wider border-b border-gray-100 pb-2 mb-4">
                3. Penempatan & Struktur
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {renderInput("Angkatan FR Academy", "ANGKATAN FR ACADEMY")}
                {renderInput("Lokasi Awal", "LOKASI AWAL PENEMPATAN")}
                {renderInput("Region Awal", "REGION AWAL PENEMPATAN")}
                {renderInput("Lokasi Terakhir", "LOKASI TERAKHIR")}
                {renderInput("Region Terakhir", "REGION TERAKHIR")}
                {renderInput("Lama Bekerja", "LAMA BEKERJA")}
                {renderInput("Lama Bekerja (Bulan)", "LAMA BEKERJA (BULAN)", "number")}
                {renderInput("Lama Bekerja (Tahun)", "LAMA BEKERJA (TAHUN)", "number")}
                {renderInput("Nama GM", "GM")}
                {renderInput("Nama MK", "MK")}
              </div>
            </section>

            {/* Bagian 4: Terminasi */}
            {(formData["STATUS"] === "Terminate" || formData["STATUS"] === "Culled" || formData["STATUS"] === "Resign") && (
              <section className="bg-red-50/50 p-6 rounded-2xl border border-red-100">
                <h3 className="text-sm font-bold text-red-600 uppercase tracking-wider border-b border-red-200 pb-2 mb-4">
                  4. Data Terminasi / Culled
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {renderInput("Tanggal Terminate", "DATE TERMINATE", "date")}
                  {renderInput("Bulan Terminate", "BULAN TERMINATE")}
                  {renderInput("Tahun Terminate", "TAHUN TERMINATE", "number")}
                  <div className="md:col-span-3">
                    {renderInput("Alasan Resign", "Alasan Resign")}
                  </div>
                  <div className="md:col-span-3">
                    <label className="block text-xs font-semibold text-gray-600 mb-1">Detail Tambahan</label>
                    <textarea
                      name="Detail"
                      value={formData["Detail"] || ""}
                      onChange={handleChange}
                      rows={3}
                      className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#2c8f42] outline-none"
                    ></textarea>
                  </div>
                </div>
              </section>
            )}

          </div>

          {/* Form Actions */}
          <div className="mt-8 pt-6 border-t border-gray-100 flex justify-end gap-3 sticky bottom-0 bg-white">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="px-6 py-2.5 rounded-xl text-sm font-bold text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2.5 rounded-xl text-sm font-bold text-white bg-[#2c8f42] hover:bg-[#237535] transition-colors flex items-center gap-2"
            >
              {isSubmitting ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
              {isSubmitting ? "Menyimpan..." : "Simpan Data"}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
