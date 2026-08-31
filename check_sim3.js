async function check() {
  const url = 'https://dhqdnvuvtraugifpwlpc.supabase.co/rest/v1';
  const headers = {
    'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRocWRudnV2dHJhdWdpZnB3bHBjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODc4NjcxODQsImV4cCI6MjEwMzQ0MzE4NH0.ZPznTg47YLu9atU2wTJbIzWlKC4Q2eUQJdJ50Yr1u3I',
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRocWRudnV2dHJhdWdpZnB3bHBjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODc4NjcxODQsImV4cCI6MjEwMzQ0MzE4NH0.ZPznTg47YLu9atU2wTJbIzWlKC4Q2eUQJdJ50Yr1u3I'
  };

  const res = await fetch(`${url}/employees?select=NAMA,STATUS,KATEGORI,ALUMNI,REGION%20TERAKHIR,REGION%20AWAL%20PENEMPATAN,ANGKATAN%20FR%20ACADEMY`, { headers });
  const data = await res.json();
  
  const res2 = await fetch(`${url}/angkatan`, { headers });
  const summaryData = await res2.json();

  const normalizeBatchName = (name) => {
    if (!name) return "";
    let n = String(name).trim();
    if (n.match(/Field Assistant/i)) n = n.replace(/Field Assistant\s*-\s*/i, 'FAT ');
    else if (n.match(/Estate Cadet Trainee/i)) n = n.replace(/Estate Cadet Trainee\s*-\s*/i, 'ECT ');
    n = n.replace(/\//g, ' ');
    return n.replace(/\s+/g, ' ').toUpperCase();
  };

  const validBatches = new Set(summaryData.map(item => normalizeBatchName(item.angkatan)));
  
  const getProgramName = (employee) => String(employee["ANGKATAN FR ACADEMY"] || employee["ANGKATAN"] || employee.angkatan || "Tidak diketahui").trim() || "Tidak diketahui";
  const isGraduate = (employee) => {
    if (employee.KATEGORI?.trim().toLowerCase() !== "alumni") return false;
    const pName = getProgramName(employee);
    if (pName === "Tidak diketahui") return false;
    return validBatches.has(normalizeBatchName(pName));
  };

  const REGIONS = ["Riau", "Kalbar", "Kubar", "Corp"];
  const normalizeRegion = (value = "") => {
    const region = String(value).toLowerCase();
    if (region.includes("riau")) return "Riau";
    if (region.includes("kalbar") || region.includes("kalimantan barat")) return "Kalbar";
    if (region.includes("kubar") || region.includes("kalimantan timur")) return "Kubar";
    if (region.includes("corp") || region.includes("pusat") || region.includes("jakarta")) return "Corp";
    return null;
  };
  const isActive = (employee) => employee.STATUS === "Eksis" || employee.STATUS === "Aktif";

  const stats = REGIONS.reduce((result, region) => {
    result[region] = { allocation: 0, active: 0, resigned: 0, graduates: 0 };
    return result;
  }, {});
  
  data.forEach((employee) => {
    if (!isGraduate(employee)) return;
    const region = normalizeRegion(employee["REGION TERAKHIR"]);
    if (!region) return;

    const regionStats = stats[region];
    regionStats.allocation += 1;
    if (isActive(employee)) regionStats.active += 1;
    else regionStats.resigned += 1;
  });

  console.log("Riau Allocation (strict):", stats["Riau"].allocation);
}
check();
