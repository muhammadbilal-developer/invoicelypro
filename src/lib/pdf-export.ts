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

  try {
    const canvas = await html2canvas(clone, {
      scale: 2,
      useCORS: true,
      backgroundColor: "#FFFFFF",
      logging: false,
      windowWidth: clone.scrollWidth,
      windowHeight: clone.scrollHeight,
    });

    const pdf = new jsPDF({ unit: "mm", format: "a4", orientation: "portrait" });
    const pageW = 210;
    const pageH = 297;
    const pageHeightPx = Math.floor((canvas.width * pageH) / pageW);

    let offsetY = 0;
    let pageIndex = 0;

    while (offsetY < canvas.height) {
      const sliceHeight = Math.min(pageHeightPx, canvas.height - offsetY);
      const pageCanvas = document.createElement("canvas");
      pageCanvas.width = canvas.width;
      pageCanvas.height = sliceHeight;

      const ctx = pageCanvas.getContext("2d");
      if (!ctx) throw new Error("Failed to create page render context");

      ctx.fillStyle = "#FFFFFF";
      ctx.fillRect(0, 0, pageCanvas.width, pageCanvas.height);
      ctx.drawImage(
        canvas,
        0,
        offsetY,
        canvas.width,
        sliceHeight,
        0,
        0,
        pageCanvas.width,
        pageCanvas.height,
      );

      const imgData = pageCanvas.toDataURL("image/jpeg", 0.95);
      const renderHeightMm = (sliceHeight * pageW) / canvas.width;

      if (pageIndex > 0) {
        pdf.addPage();
      }
      pdf.addImage(imgData, "JPEG", 0, 0, pageW, renderHeightMm, undefined, "FAST");

      offsetY += sliceHeight;
      pageIndex += 1;
    }

    pdf.save(filename);
  } finally {
    document.body.removeChild(sandbox);
  }
}
