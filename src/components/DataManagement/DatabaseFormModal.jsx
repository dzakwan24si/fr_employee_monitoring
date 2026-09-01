import { useState, useEffect } from "react";
import { X, Save, User, Briefcase, MapPin, XCircle } from "lucide-react";


const InputField = ({ label, name, type = 'text', placeholder, readOnly = false, formData, handleChange }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-xs font-bold text-gray-700">{label}</label>
    <input
      type={type}
      name={name}
      value={formData[name] || ''}
      onChange={handleChange}
      readOnly={readOnly}
      placeholder={placeholder || `Masukkan ${label}`}
      className={`px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#2c8f42] outline-none transition-all ${readOnly ? 'bg-gray-100 text-gray-500 cursor-not-allowed' : 'bg-gray-50'}`}
    />
  </div>
);

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

  // Auto-generate Bulan & Tahun Terminate from Date Terminate
  useEffect(() => {
    const dateTerminate = formData["DATE TERMINATE"];
    if (dateTerminate) {
      const dateObj = new Date(dateTerminate);
      if (!isNaN(dateObj.getTime())) {
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dec"];
        const calculatedMonth = monthNames[dateObj.getMonth()];
        const calculatedYear = String(dateObj.getFullYear());
        
        setFormData(prev => {
          if (prev["BULAN TERMINATE"] !== calculatedMonth || prev["TAHUN TERMINATE"] !== calculatedYear) {
            return { 
              ...prev, 
              "BULAN TERMINATE": calculatedMonth, 
              "TAHUN TERMINATE": calculatedYear 
            };
          }
          return prev;
        });
      }
    }
  }, [formData["DATE TERMINATE"]]);

  // Auto-calculate Lama Bekerja (Tahun & Bulan) from Join Date and Date Terminate
  useEffect(() => {
    const joinDateStr = formData["JOIN DATE"];
    const terminateDateStr = formData["DATE TERMINATE"];
    
    if (joinDateStr && terminateDateStr) {
      const joinDate = new Date(joinDateStr);
      const terminateDate = new Date(terminateDateStr);
      
      if (!isNaN(joinDate.getTime()) && !isNaN(terminateDate.getTime()) && terminateDate >= joinDate) {
        let years = terminateDate.getFullYear() - joinDate.getFullYear();
        let months = terminateDate.getMonth() - joinDate.getMonth();
        
        if (terminateDate.getDate() < joinDate.getDate()) {
          months--;
        }
        
        if (months < 0) {
          years--;
          months += 12;
        }
        
        setFormData(prev => {
          if (prev["LAMA BEKERJA (TAHUN)"] !== years || prev["LAMA BEKERJA (BULAN)"] !== months) {
            return {
              ...prev,
              "LAMA BEKERJA (TAHUN)": years,
              "LAMA BEKERJA (BULAN)": months
            };
          }
          return prev;
        });
      }
    }
  }, [formData["JOIN DATE"], formData["DATE TERMINATE"]]);

  // Auto-generate Lama Bekerja (Teks)
  useEffect(() => {
    const t = Number(formData["LAMA BEKERJA (TAHUN)"]);
    const b = Number(formData["LAMA BEKERJA (BULAN)"]);
    
    let parts = [];
    if (!isNaN(t) && t > 0) parts.push(`${t} Tahun`);
    if (!isNaN(b) && b > 0) parts.push(`${b} Bulan`);
    
    const calculatedText = parts.join(" ");
    
    if (calculatedText !== formData["LAMA BEKERJA"] && (!isNaN(t) || !isNaN(b))) {
      setFormData(prev => ({
        ...prev,
        "LAMA BEKERJA": calculatedText || ""
      }));
    }
  }, [formData["LAMA BEKERJA (TAHUN)"], formData["LAMA BEKERJA (BULAN)"]]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const sanitizedData = { ...formData };
      
      // Prevent updating primary key directly
      if (sanitizedData.ID_MONITORING) {
        delete sanitizedData.ID_MONITORING;
      }

      // Convert empty strings to null to prevent PostgreSQL type errors
      Object.keys(sanitizedData).forEach(key => {
        if (sanitizedData[key] === "") {
          sanitizedData[key] = null;
        }
      });

      await onSubmit(sanitizedData);
      onClose();
    } catch (err) {
      console.error("Error submitting form:", err);
      alert("Gagal menyimpan data: " + (err.message || "Terjadi kesalahan"));
    } finally {
      setIsSubmitting(false);
    }
  };


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
                <InputField formData={formData} handleChange={handleChange} label="NIK / NRP" name="NIK" />
                <InputField formData={formData} handleChange={handleChange} label="Nama Lengkap" name="NAMA" />
                <InputField formData={formData} handleChange={handleChange} label="Suku" name="SUKU" />
                <InputField formData={formData} handleChange={handleChange} label="Agama" name="AGAMA" />
              </div>
            </div>

            {/* Section 2: Status & Pekerjaan */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2 text-[#2c8f42] border-b border-gray-100 pb-2">
                <Briefcase size={18} strokeWidth={2.5} />
                <h3 className="font-bold">Status & Pekerjaan</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <InputField formData={formData} handleChange={handleChange} label="Join Date" name="JOIN DATE" type="date" />
                <InputField formData={formData} handleChange={handleChange} label="Jabatan" name="JABATAN" />
                <InputField formData={formData} handleChange={handleChange} label="Level Jabatan" name="LEVEL JABATAN" />
                
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-gray-700">Status</label>
                  <select
                    name="STATUS"
                    value={formData.STATUS}
                    onChange={handleChange}
                    className="px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#2c8f42] outline-none transition-all font-medium"
                  >
                    <option value="Aktif">Aktif</option>
                    <option value="Resign">Resign</option>
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

                <InputField formData={formData} handleChange={handleChange} label="Angkatan FR Academy" name="ANGKATAN FR ACADEMY" placeholder="Misal: FAT I 2026" />
                <InputField formData={formData} handleChange={handleChange} label="Keterangan Alumni" name="ALUMNI" placeholder="Misal: Ya / Tidak" />
              </div>
            </div>

            {/* Section 3: Penempatan */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2 text-[#2c8f42] border-b border-gray-100 pb-2">
                <MapPin size={18} strokeWidth={2.5} />
                <h3 className="font-bold">Penempatan</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputField formData={formData} handleChange={handleChange} label="Lokasi Awal Penempatan" name="LOKASI AWAL PENEMPATAN" />
                <InputField formData={formData} handleChange={handleChange} label="Region Awal Penempatan" name="REGION AWAL PENEMPATAN" />
                <InputField formData={formData} handleChange={handleChange} label="Lokasi Terakhir" name="LOKASI TERAKHIR" />
                <InputField formData={formData} handleChange={handleChange} label="Region Terakhir" name="REGION TERAKHIR" />
                <InputField formData={formData} handleChange={handleChange} label="Nama GM" name="GM" />
                <InputField formData={formData} handleChange={handleChange} label="Nama MK" name="MK" />
              </div>
            </div>

            {/* Section 4: Data Keluar (Resign/Terminate) */}
            {formData.STATUS === "Resign" && (
              <div className="flex flex-col gap-4 p-5 bg-red-50/50 rounded-2xl border border-red-100">
                <div className="flex items-center gap-2 text-red-500 border-b border-red-200/50 pb-2">
                  <XCircle size={18} strokeWidth={2.5} />
                  <h3 className="font-bold">Data Terminate / Resign (Jika Ada)</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <InputField formData={formData} handleChange={handleChange} label="Date Terminate" name="DATE TERMINATE" type="date" />
                  <InputField formData={formData} handleChange={handleChange} label="Bulan Terminate" name="BULAN TERMINATE" placeholder="Otomatis..." readOnly={true} />
                  <InputField formData={formData} handleChange={handleChange} label="Tahun Terminate" name="TAHUN TERMINATE" placeholder="Otomatis..." readOnly={true} />
                  <InputField formData={formData} handleChange={handleChange} label="Lama Bekerja (Bulan Angka)" name="LAMA BEKERJA (BULAN)" type="number" placeholder="Otomatis..." readOnly={true} />
                  <InputField formData={formData} handleChange={handleChange} label="Lama Bekerja (Tahun Angka)" name="LAMA BEKERJA (TAHUN)" type="number" placeholder="Otomatis..." readOnly={true} />
                  <InputField formData={formData} handleChange={handleChange} label="Lama Bekerja (Teks)" name="LAMA BEKERJA" placeholder="Otomatis terisi..." readOnly={true} />
                </div>
                <div className="grid grid-cols-1 gap-4 mt-2">
                  <InputField formData={formData} handleChange={handleChange} label="Alasan Resign" name="Alasan Resign" />
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
            )}

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
