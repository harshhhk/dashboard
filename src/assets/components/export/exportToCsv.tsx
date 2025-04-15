const exportToCsv = (
  headers: string[],
  data: (string | number)[][],
  fileName: string
) => {
  const csvContent = [headers, ...data] // Combine headers with data
    .map(
      (row) =>
        row
          .map((cell) =>
            typeof cell === "string" && cell.includes(",")
              ? `"${cell}"` // Escape commas in string values
              : cell
          )
          .join(",") // Join cells with a comma
    )
    .join("\n"); // Join rows with new line

  // Create a Blob from the CSV string
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
    
  // Trigger the download of the CSV file
  link.href = URL.createObjectURL(blob);
  link.setAttribute("download", fileName);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export default exportToCsv;
