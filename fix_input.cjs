const fs = require('fs');
const file = 'd:/ProjectFR/Monitoring/fr_employee_monitoring/src/components/DataManagement/DatabaseFormModal.jsx';
let content = fs.readFileSync(file, 'utf8');

// Remove the old InputField inside the component
content = content.replace(/  const InputField = \(\{.*?\}\) => \([\s\S]*?  \);\n/, '');

// Add the new InputField outside the component
const newComponent = `
const InputField = ({ label, name, type = 'text', placeholder, readOnly = false, formData, handleChange }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-xs font-bold text-gray-700">{label}</label>
    <input
      type={type}
      name={name}
      value={formData[name] || ''}
      onChange={handleChange}
      readOnly={readOnly}
      placeholder={placeholder || \`Masukkan \${label}\`}
      className={\`px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#2c8f42] outline-none transition-all \${readOnly ? 'bg-gray-100 text-gray-500 cursor-not-allowed' : 'bg-gray-50'}\`}
    />
  </div>
);

export function DatabaseFormModal`;

content = content.replace('export function DatabaseFormModal', newComponent);

// Inject formData and handleChange into all <InputField usages
content = content.replace(/<InputField /g, '<InputField formData={formData} handleChange={handleChange} ');

fs.writeFileSync(file, content);
console.log("Done");
