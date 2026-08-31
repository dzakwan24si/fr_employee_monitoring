import { useState, useEffect } from "react";
import { X, Save, User, Briefcase, MapPin, XCircle } from "lucide-react";

export function DatabaseFormModal({ isOpen, onClose, onSubmit, initialData }) {
  const [formData, setFormData] = useState({
    NIK: "",
    NAMA: "",
    SUKU: "",
    AGAMA: "",
    "JOIN DATE": "",
    JABATAN: "",
    "LEVEL JABATAN": "",
    "ANGKATAN FR ACADEMY": "",
    KATEGORI: "",
    ALUMNI: "",
    STATUS: "Aktif",
    "LOKASI AWAL PENEMPATAN": "",
    "REGION AWAL PENEMPATAN": "",
    "LOKASI TERAKHIR": "",
    "REGION TERAKHIR": "",
    GM: "",
    MK: "",
    "DATE TERMINATE": "",
    "BULAN TERMINATE": "",
    "TAHUN TERMINATE": "",
    "LAMA BEKERJA (BULAN)": "",
    "LAMA BEKERJA (TAHUN)": "",
    "LAMA BEKERJA": "",
    "Alasan Resign": "",
    Detail: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData({
        ...formData,
        ...initialData
      });
    } else {
      setFormData({
        NIK: "",
        NAMA: "",
        SUKU: "",
        AGAMA: "",
        "JOIN DATE": "",
        JABATAN: "",
        "LEVEL JABATAN": "",
        "ANGKATAN FR ACADEMY": "",
        KATEGORI: "",
        ALUMNI: "",
        STATUS: "Aktif",
        "LOKASI AWAL PENEMPATAN": "",
        "REGION AWAL PENEMPATAN": "",
        "LOKASI TERAKHIR": "",
        "REGION TERAKHIR": "",
        GM: "",
        MK: "",
        "DATE TERMINATE": "",
        "BULAN TERMINATE": "",
        "TAHUN TERMINATE": "",
        "LAMA BEKERJA (BULAN)": "",
        "LAMA BEKERJA (TAHUN)": "",
        "LAMA BEKERJA": "",
        "Alasan Resign": "",
        Detail: ""
      });
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await onSubmit(formData);
      onClose();
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const InputField = ({ label, name, type = "text", placeholder }) => (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-bold text-gray-700">{label}</label>
      <input
        type={type}
        name={name}
        value={formData[name] || ""}
        onChange={handleChange}
        placeholder={placeholder || `Masukkan ${label}`}
        className="px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#2c8f42] outline-none transition-all"
      />
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="bg-white rounded-3xl w-full max-w-4xl max-h-[90vh] flex flex-col relative shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="p-6 border-b border-gray-100 flex items-center justify-between shrink-0">
          <div>
            <h2 className="text-xl font-bold text-gray-800">
              {initialData ? "Edit Data Karyawan" : "Tambah Data Karyawan"}
            </h2>
            <p className="text-sm text-gray-500 mt-1">Lengkapi form di bawah ini untuk menyimpan data ke database.</p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-xl transition-colors"
          >
            <X size={20} strokeWidth={2.5} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto flex-1">
          <form id="database-form" onSubmit={handleSubmit} className="flex flex-col gap-8">
            
            {/* Section 1: Data Pribadi */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2 text-[#2c8f42] border-b border-gray-100 pb-2">
                <User size={18} strokeWidth={2.5} />
                <h3 className="font-bold">Data Pribadi</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputField label="NIK / NRP" name="NIK" />
                <InputField label="Nama Lengkap" name="NAMA" />
                <InputField label="Suku" name="SUKU" />
                <InputField label="Agama" name="AGAMA" />
              </div>
            </div>

            {/* Section 2: Status & Pekerjaan */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2 text-[#2c8f42] border-b border-gray-100 pb-2">
                <Briefcase size={18} strokeWidth={2.5} />
                <h3 className="font-bold">Status & Pekerjaan</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <InputField label="Join Date" name="JOIN DATE" placeholder="Misal: 10 Jan 2024" />
                <InputField label="Jabatan" name="JABATAN" />
                <InputField label="Level Jabatan" name="LEVEL JABATAN" />
                
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-gray-700">Status</label>
                  <select
                    name="STATUS"
                    value={formData.STATUS}
                    onChange={handleChange}
                    className="px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#2c8f42] outline-none transition-all font-medium"
                  >
                    <option value="Aktif">Aktif</option>
                    <option value="Eksis">Eksis</option>
                    <option value="Resign">Resign</option>
                    <option value="Terminate">Terminate</option>
                    <option value="Culled">Culled</option>
                    <option value="Tidak Lulus">Tidak Lulus</option>
                  </select>
                </div>
                
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-gray-700">Kategori</label>
                  <select
                    name="KATEGORI"
                    value={formData.KATEGORI}
                    onChange={handleChange}
                    className="px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#2c8f42] outline-none transition-all"
                  >
                    <option value="">Pilih Kategori...</option>
                    <option value="Alumni">Alumni</option>
                    <option value="Non Alumni">Non Alumni</option>
                  </select>
                </div>

                <InputField label="Angkatan FR Academy" name="ANGKATAN FR ACADEMY" placeholder="Misal: FAT I 2026" />
                <InputField label="Keterangan Alumni" name="ALUMNI" placeholder="Misal: Ya / Tidak" />
              </div>
            </div>

            {/* Section 3: Penempatan */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2 text-[#2c8f42] border-b border-gray-100 pb-2">
                <MapPin size={18} strokeWidth={2.5} />
                <h3 className="font-bold">Penempatan</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputField label="Lokasi Awal Penempatan" name="LOKASI AWAL PENEMPATAN" />
                <InputField label="Region Awal Penempatan" name="REGION AWAL PENEMPATAN" />
                <InputField label="Lokasi Terakhir" name="LOKASI TERAKHIR" />
                <InputField label="Region Terakhir" name="REGION TERAKHIR" />
                <InputField label="Nama GM" name="GM" />
                <InputField label="Nama MK" name="MK" />
              </div>
            </div>

            {/* Section 4: Data Keluar (Resign/Terminate) */}
            <div className="flex flex-col gap-4 p-5 bg-red-50/50 rounded-2xl border border-red-100">
              <div className="flex items-center gap-2 text-red-500 border-b border-red-200/50 pb-2">
                <XCircle size={18} strokeWidth={2.5} />
                <h3 className="font-bold">Data Terminate / Resign (Jika Ada)</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <InputField label="Date Terminate" name="DATE TERMINATE" />
                <InputField label="Bulan Terminate" name="BULAN TERMINATE" />
                <InputField label="Tahun Terminate" name="TAHUN TERMINATE" />
                <InputField label="Lama Bekerja (Bulan Angka)" name="LAMA BEKERJA (BULAN)" type="number" />
                <InputField label="Lama Bekerja (Tahun Angka)" name="LAMA BEKERJA (TAHUN)" type="number" />
                <InputField label="Lama Bekerja (Teks)" name="LAMA BEKERJA" placeholder="Misal: 1 Tahun 2 Bulan" />
              </div>
              <div className="grid grid-cols-1 gap-4 mt-2">
                <InputField label="Alasan Resign" name="Alasan Resign" />
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-gray-700">Detail Alasan</label>
                  <textarea
                    name="Detail"
                    value={formData.Detail || ""}
                    onChange={handleChange}
                    placeholder="Masukkan detail..."
                    className="px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#2c8f42] outline-none transition-all resize-none h-24"
                  />
                </div>
              </div>
            </div>

          </form>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-100 flex items-center justify-end gap-3 bg-gray-50/50 shrink-0 rounded-b-3xl">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2.5 text-sm font-bold text-gray-600 hover:bg-gray-100 rounded-xl transition-colors"
          >
            Batal
          </button>
          <button
            type="submit"
            form="database-form"
            disabled={isSubmitting}
            className="flex items-center gap-2 px-6 py-2.5 bg-[#2c8f42] hover:bg-[#237535] text-white text-sm font-bold rounded-xl transition-all shadow-md shadow-[#2c8f42]/20 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <span className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></span>
            ) : (
              <Save size={16} strokeWidth={2.5} />
            )}
            Simpan Data
          </button>
        </div>
        
      </div>
    </div>
  );
}
