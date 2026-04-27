import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export async function exportInvoicePDF(element: HTMLElement, name = "invoice.pdf") {
  const canvas = await html2canvas(element, { scale: 2, useCORS: true, backgroundColor: "#ffffff" });
  const imgData = canvas.toDataURL("image/png");
  const pdf = new jsPDF("p", "mm", "a4");
  const width = 210;
  const height = (canvas.height * width) / canvas.width;
  pdf.addImage(imgData, "PNG", 0, 0, width, height);
  pdf.save(name);
}
