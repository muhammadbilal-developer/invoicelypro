import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export async function exportInvoicePDF(filename = "invoice.pdf") {
  const node = document.querySelector<HTMLElement>("[data-invoice-frame]");
  if (!node) throw new Error("Invoice frame not found");

  const sandbox = document.createElement("div");
  sandbox.style.position = "fixed";
  sandbox.style.left = "-99999px";
  sandbox.style.top = "0";
  sandbox.style.width = "210mm";
  sandbox.style.background = "#fff";
  sandbox.style.zIndex = "-1";

  const clone = node.cloneNode(true) as HTMLElement;
  clone.style.width = "210mm";
  clone.style.maxWidth = "210mm";
  clone.style.minHeight = "297mm";
  clone.style.margin = "0";
  clone.style.transform = "none";
  clone.style.boxShadow = "none";

  sandbox.appendChild(clone);
  document.body.appendChild(sandbox);

  const canvas = await html2canvas(clone, {
    scale: 2,
    useCORS: true,
    backgroundColor: "#FFFFFF",
    logging: false,
    windowWidth: clone.scrollWidth,
    windowHeight: clone.scrollHeight,
  });

  document.body.removeChild(sandbox);

  const imgData = canvas.toDataURL("image/jpeg", 0.95);
  const pdf = new jsPDF({ unit: "mm", format: "a4", orientation: "portrait" });
  const pageW = 210;
  const pageH = 297;
  const imgW = pageW;
  const imgH = (canvas.height * imgW) / canvas.width;
  let position = 0;
  let heightLeft = imgH;
  pdf.addImage(imgData, "JPEG", 0, position, imgW, imgH);
  heightLeft -= pageH;
  while (heightLeft > 0) {
    position = heightLeft - imgH;
    pdf.addPage();
    pdf.addImage(imgData, "JPEG", 0, position, imgW, imgH);
    heightLeft -= pageH;
  }
  pdf.save(filename);
}
