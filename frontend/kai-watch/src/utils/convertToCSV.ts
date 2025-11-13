export const convertToCSV = (data: any[]) => {
  if (!data || !data.length) return '';

  // Get headers
  const headers = Object.keys(data[0]);
  const csvRows = [
    headers.join(','), // header row
    ...data.map(row =>
      headers.map(field => `"${row[field] ?? ''}"`).join(',')
    )
  ];

  return csvRows.join('\n');
};
