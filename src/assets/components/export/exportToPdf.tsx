import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const exportToPdf = (
  title: string,
  headers: string[],
  data: (string | number)[][],
  filename: string
) => {
  const doc = new jsPDF();

  doc.text(title, 14, 20);

  autoTable(doc, {
    startY: 30,
    head: [headers],
    body: data,
  });

  doc.save(filename);
};

export default exportToPdf;
