import fs from 'fs';
const content = fs.readFileSync('d:\\ProjectFR\\Monitoring\\fr_employee_monitoring\\src\\components\\DataManagement\\RegionalKpi.jsx', 'utf8');
console.log(content.includes('regionStats.allocation += 1'));
console.log(content.slice(content.indexOf('const stats ='), content.indexOf('const alumniData =')));
