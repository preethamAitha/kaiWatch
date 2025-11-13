import { convertToCSV } from "./convertToCSV";


export const downloadCSV = (data: any[], filename = 'vulnerabilities.csv') => {
  const csvData = convertToCSV(data);
  const blob = new Blob([csvData], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.setAttribute('hidden', '');
  a.setAttribute('href', url);
  a.setAttribute('download', filename);
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};
