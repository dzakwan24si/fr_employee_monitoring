export function AnalisaTab({ data = [] }) {
  
  // 1. Hitung Status
  const activeStaff = data.filter(emp => emp.STATUS === 'Eksis' || emp.STATUS === 'Aktif');
  const resignStaff = data.filter(emp => emp.STATUS === 'Terminate' || emp.STATUS === 'Resign' || emp.STATUS === 'Culled');

  // 2. Hitung Kategori (Alumni vs Non-Alumni / Rekrut)
  const lulusanAktif = activeStaff.filter(emp => emp.KATEGORI?.toLowerCase().includes('alumni'));
  const rekrutAktif = activeStaff.filter(emp => !emp.KATEGORI?.toLowerCase().includes('alumni'));
  
  const lulusanResign = resignStaff.filter(emp => emp.KATEGORI?.toLowerCase().includes('alumni'));
  const rekrutResign = resignStaff.filter(emp => !emp.KATEGORI?.toLowerCase().includes('alumni'));

  const pctLulusanAktif = activeStaff.length ? Math.round((lulusanAktif.length / activeStaff.length) * 100) : 0;
  const pctRekrutAktif = activeStaff.length ? Math.round((rekrutAktif.length / activeStaff.length) * 100) : 0;
  
  const pctLulusanResign = resignStaff.length ? Math.round((lulusanResign.length / resignStaff.length) * 100) : 0;
  const pctRekrutResign = resignStaff.length ? Math.round((rekrutResign.length / resignStaff.length) * 100) : 0;

  const summaryCards = [
    { title: "Jumlah Asst All Region (Aktif)", value: activeStaff.length.toString(), type: "single" },
    { title: "Lulusan All Region (Aktif)", value: lulusanAktif.length.toString(), percentage: `${pctLulusanAktif}%`, type: "split" },
    { title: "Asisten Rekrut All Region (Aktif)", value: rekrutAktif.length.toString(), percentage: `${pctRekrutAktif}%`, type: "split" },
    { title: "Asisten All Region (Resign)", value: resignStaff.length.toString(), type: "single", color: "text-red-500" },
    { title: "Lulusan All Region (Resign)", value: lulusanResign.length.toString(), percentage: `${pctLulusanResign}%`, type: "split", color: "text-red-500" },
    { title: "Asisten Rekrut All Region (Resign)", value: rekrutResign.length.toString(), percentage: `${pctRekrutResign}%`, type: "split", color: "text-red-500" },
  ];

  // Helper function for grouping by Region
  const getRegionStats = (dataset) => {
    let riau = 0, kalbar = 0, kubar = 0, corp = 0;
    dataset.forEach(emp => {
      const region = (emp["REGION TERAKHIR"] || "").toLowerCase();
      if (region.includes("riau")) riau++;
      else if (region.includes("kalbar") || region.includes("kalimantan barat")) kalbar++;
      else if (region.includes("kubar") || region.includes("kalimantan timur")) kubar++;
      else if (region.includes("pusat") || region.includes("corp") || region.includes("jakarta")) corp++;
      // fallback or others can be ignored or added to corp depending on logic
    });
    return { riau, kalbar, kubar, corp, total: riau + kalbar + kubar + corp };
  };

  const aktifStats = getRegionStats(activeStaff);
  const resignStats = getRegionStats(resignStaff);

  // Group by Angkatan for Training Table
  const trainingGroups = {};
  data.forEach(emp => {
    const angkatan = emp["ANGKATAN FR ACADEMY"] || "Tidak Diketahui";
    if (!trainingGroups[angkatan]) {
      trainingGroups[angkatan] = { lulus: 0, tidakLulus: 0, resignClass: 0, resignOjt: 0, total: 0 };
    }
    
    trainingGroups[angkatan].total++;
    
    if (emp.STATUS === 'Eksis' || emp.STATUS === 'Aktif') {
      trainingGroups[angkatan].lulus++;
    } else if (emp.STATUS === 'Terminate' || emp.STATUS === 'Resign' || emp.STATUS === 'Culled') {
      // Dummy logic for OJT vs Class based on Lama Bekerja
      if ((emp["LAMA BEKERJA (BULAN)"] || 0) < 3) {
        trainingGroups[angkatan].resignClass++;
      } else {
        trainingGroups[angkatan].resignOjt++;
      }
    }
  });

  const trainingData = Object.keys(trainingGroups).map(key => {
    const d = trainingGroups[key];
    const pct = d.total > 0 ? Math.round((d.lulus / d.total) * 100) : 0;
    return {
      angkatan: key,
      inClass: d.resignClass,
      ojt: d.resignOjt,
      tidakLulus: d.tidakLulus,
      lulus: d.lulus,
      pct: `${pct}%`
    };
  }).sort((a, b) => a.angkatan.localeCompare(b.angkatan));

  return (
    <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Summary Cards Row */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {summaryCards.map((card, idx) => (
          <div key={idx} className="bg-[#2c8f42] rounded-2xl p-1 shadow-sm overflow-hidden flex flex-col h-full hover:scale-105 transition-transform cursor-default">
            <div className="bg-[#2c8f42] text-white text-center p-3 text-xs font-bold leading-tight flex-1 flex items-center justify-center">
              {card.title}
            </div>
            <div className="bg-white rounded-xl p-4 flex items-center justify-center gap-4">
              {card.type === "single" ? (
                <span className={`text-3xl font-extrabold ${card.color || 'text-[#2c8f42]'}`}>{card.value}</span>
              ) : (
                <>
                  <span className={`text-2xl font-extrabold ${card.color || 'text-[#2c8f42]'}`}>{card.value}</span>
                  <div className="w-px h-8 bg-gray-200"></div>
                  <span className={`text-2xl font-extrabold ${card.color || 'text-[#2c8f42]'}`}>{card.percentage}</span>
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Tables Section */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 mt-4 overflow-x-auto">
        <div className="min-w-[1200px] flex gap-6">
          
          {/* Table Training */}
          <div className="flex-1">
            <h3 className="text-sm font-bold text-white bg-[#1e612d] py-2 px-4 rounded-t-xl mb-0 border-b border-gray-300">Training</h3>
            <table className="w-full text-center border-collapse text-xs">
              <thead>
                <tr className="bg-[#2c8f42] text-white">
                  <th className="border border-gray-300 p-2" rowSpan={2}>Angkatan</th>
                  <th className="border border-gray-300 p-2" colSpan={2}>Jumlah Culling / Resign</th>
                  <th className="border border-gray-300 p-2" rowSpan={2}>Tidak Lulus</th>
                  <th className="border border-gray-300 p-2" rowSpan={2}>Lulus</th>
                  <th className="border border-gray-300 p-2" rowSpan={2}>%</th>
                </tr>
                <tr className="bg-[#2c8f42] text-white">
                  <th className="border border-gray-300 p-2">In Class</th>
                  <th className="border border-gray-300 p-2">OJT</th>
                </tr>
              </thead>
              <tbody className="text-gray-700 bg-gray-50/50">
                {trainingData.length > 0 ? trainingData.map((row, i) => (
                  <tr key={i} className="hover:bg-gray-100 transition-colors">
                    <td className="border border-gray-300 p-2 font-bold text-left">{row.angkatan}</td>
                    <td className="border border-gray-300 p-2">{row.inClass}</td>
                    <td className="border border-gray-300 p-2">{row.ojt}</td>
                    <td className="border border-gray-300 p-2">{row.tidakLulus}</td>
                    <td className="border border-gray-300 p-2 font-medium">{row.lulus}</td>
                    <td className="border border-gray-300 p-2">{row.pct}</td>
                  </tr>
                )) : (
                  <tr><td colSpan={6} className="p-4 text-gray-400">Tidak ada data pelatihan</td></tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Table Aktif */}
          <div className="flex-[0.7]">
            <h3 className="text-sm font-bold text-white bg-[#0e4475] py-2 px-4 rounded-t-xl mb-0 border-b border-gray-300">Aktif</h3>
            <table className="w-full text-center border-collapse text-xs">
              <thead>
                <tr className="bg-[#1464a8] text-white">
                  <th className="border border-gray-300 p-2" rowSpan={2}>Riau</th>
                  <th className="border border-gray-300 p-2" rowSpan={2}>Kalbar</th>
                  <th className="border border-gray-300 p-2" rowSpan={2}>Kubar</th>
                  <th className="border border-gray-300 p-2" rowSpan={2}>Corp</th>
                  <th className="border border-gray-300 p-2" rowSpan={2}>Total</th>
                </tr>
                <tr className="bg-[#1464a8] text-white invisible"><th colSpan={5} className="p-2">Spacer</th></tr>
              </thead>
              <tbody className="text-gray-700 bg-gray-50/50">
                <tr className="hover:bg-gray-100 transition-colors">
                  <td className="border border-gray-300 p-2 text-lg">{aktifStats.riau}</td>
                  <td className="border border-gray-300 p-2 text-lg">{aktifStats.kalbar}</td>
                  <td className="border border-gray-300 p-2 text-lg">{aktifStats.kubar}</td>
                  <td className="border border-gray-300 p-2 text-lg">{aktifStats.corp}</td>
                  <td className="border border-gray-300 p-2 font-bold text-blue-700 text-lg">{aktifStats.total}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Table Resign */}
          <div className="flex-[0.7]">
            <h3 className="text-sm font-bold text-white bg-[#961e1e] py-2 px-4 rounded-t-xl mb-0 border-b border-gray-300">Resign</h3>
            <table className="w-full text-center border-collapse text-xs">
              <thead>
                <tr className="bg-[#d93838] text-white">
                  <th className="border border-gray-300 p-2" rowSpan={2}>Riau</th>
                  <th className="border border-gray-300 p-2" rowSpan={2}>Kalbar</th>
                  <th className="border border-gray-300 p-2" rowSpan={2}>Kubar</th>
                  <th className="border border-gray-300 p-2" rowSpan={2}>Corp</th>
                  <th className="border border-gray-300 p-2" rowSpan={2}>Total</th>
                </tr>
                <tr className="bg-[#d93838] text-white invisible"><th colSpan={5} className="p-2">Spacer</th></tr>
              </thead>
              <tbody className="text-gray-700 bg-gray-50/50">
                <tr className="hover:bg-gray-100 transition-colors">
                  <td className="border border-gray-300 p-2 text-lg">{resignStats.riau}</td>
                  <td className="border border-gray-300 p-2 text-lg">{resignStats.kalbar}</td>
                  <td className="border border-gray-300 p-2 text-lg">{resignStats.kubar}</td>
                  <td className="border border-gray-300 p-2 text-lg">{resignStats.corp}</td>
                  <td className="border border-gray-300 p-2 font-bold text-red-600 text-lg">{resignStats.total}</td>
                </tr>
              </tbody>
            </table>
          </div>

        </div>
      </div>
      
    </div>
  );
}
