import { PlacementChart } from "./PlacementChart";
import { TurnoverChart } from "./TurnoverChart";

export function AnalisaTab({ data = [], summaryData = [] }) {
  const toNumber = (value) => {
    const parsed = Number(value ?? 0);
    return Number.isFinite(parsed) ? parsed : 0;
  };

  const activeStaff = data.filter(emp => emp.STATUS === 'Eksis' || emp.STATUS === 'Aktif');
  const resignStaff = data.filter(emp => emp.STATUS === 'Terminate' || emp.STATUS === 'Resign' || emp.STATUS === 'Culled');

  const hasSummary = Array.isArray(summaryData) && summaryData.length > 0;
  const summaryActiveTotal = hasSummary
    ? summaryData.reduce((sum, row) => sum + toNumber(row.lulus_calculated ?? row.lulus ?? row.Lulus ?? row["Lulus"]), 0)
    : activeStaff.length;

  const summaryResignTotal = hasSummary
    ? summaryData.reduce((sum, row) => {
        const culled = toNumber(row.culled_calculated ?? row.culled ?? row.Culled ?? row["Culled"]);
        const tidakLulus = toNumber(row.tidak_lulus_calculated ?? row.tidak_lulus ?? row["Tidak Lulus"] ?? row.tidakLulus);
        return sum + culled + tidakLulus;
      }, 0)
    : resignStaff.length;

  const lulusanAktif = activeStaff.filter(emp => emp.KATEGORI?.toLowerCase().includes('alumni'));
  const rekrutAktif = activeStaff.filter(emp => !emp.KATEGORI?.toLowerCase().includes('alumni'));

  const lulusanResign = resignStaff.filter(emp => emp.KATEGORI?.toLowerCase().includes('alumni'));
  const rekrutResign = resignStaff.filter(emp => !emp.KATEGORI?.toLowerCase().includes('alumni'));

  const lulusanAktifValue = hasSummary ? summaryActiveTotal : lulusanAktif.length;
  const rekrutAktifValue = hasSummary ? Math.max(summaryActiveTotal - lulusanAktifValue, 0) : rekrutAktif.length;

  const lulusanResignValue = hasSummary ? summaryResignTotal : lulusanResign.length;
  const rekrutResignValue = hasSummary ? Math.max(summaryResignTotal - lulusanResignValue, 0) : rekrutResign.length;

  const pctLulusanAktif = summaryActiveTotal ? Math.round((lulusanAktifValue / summaryActiveTotal) * 100) : 0;
  const pctRekrutAktif = summaryActiveTotal ? Math.round((rekrutAktifValue / summaryActiveTotal) * 100) : 0;

  const pctLulusanResign = summaryResignTotal ? Math.round((lulusanResignValue / summaryResignTotal) * 100) : 0;
  const pctRekrutResign = summaryResignTotal ? Math.round((rekrutResignValue / summaryResignTotal) * 100) : 0;

  const summaryCards = [
    { title: "Jumlah Asst All Region (Aktif)", value: summaryActiveTotal.toString(), type: "single" },
    { title: "Lulusan All Region (Aktif)", value: lulusanAktifValue.toString(), percentage: `${pctLulusanAktif}%`, type: "split" },
    { title: "Asisten Rekrut All Region (Aktif)", value: rekrutAktifValue.toString(), percentage: `${pctRekrutAktif}%`, type: "split" },
    { title: "Asisten All Region (Resign)", value: summaryResignTotal.toString(), type: "single", color: "text-red-500" },
    { title: "Lulusan All Region (Resign)", value: lulusanResignValue.toString(), percentage: `${pctLulusanResign}%`, type: "split", color: "text-red-500" },
    { title: "Asisten Rekrut All Region (Resign)", value: rekrutResignValue.toString(), percentage: `${pctRekrutResign}%`, type: "split", color: "text-red-500" },
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

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <PlacementChart data={data} />
        <TurnoverChart data={data} />
      </div>

      {/* Tables Section */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 mt-4 overflow-x-auto">
        <div className="min-w-[1200px] flex gap-6">
          
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
