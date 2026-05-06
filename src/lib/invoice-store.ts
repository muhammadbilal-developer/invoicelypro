import { create } from "zustand";
import { persist } from "zustand/middleware";

export type LineItem = {
  id: string;
  description: string;
  quantity: number;
  rate: number;
  taxPercent?: number;
};

export type InvoiceData = {
  templateId: string;
  documentType: "invoice" | "estimate" | "receipt" | "quote" | "credit-note" | "po";
  invoiceNumber: string;
  issueDate: string;
  dueDate: string;
  companyName: string;
  currency: string;
  logo?: string;
  brandColor: string;
  fromName: string;
  fromAddress: string;
  fromEmail: string;
  fromPhone: string;
  fromTaxId?: string;
  toName: string;
  toAddress: string;
  toEmail: string;
  toPhone: string;
  toTaxId?: string;
  shipToName: string;
  shipToAddress: string;
  shipToEmail: string;
  shipToPhone: string;
  items: LineItem[];
  taxMode: "percent" | "flat" | "off";
  taxValue: number;
  taxLabel: string;
  discountMode: "percent" | "flat" | "off";
  discountValue: number;
  shippingValue: number;
  amountPaid: number;
  notes: string;
  terms: string;
  paymentInstructions: string;
};

type InvoiceStore = {
  data: InvoiceData;
  setData: (patch: Partial<InvoiceData>) => void;
  setItems: (items: LineItem[]) => void;
  reset: () => void;
};

const initialData: InvoiceData = {
  templateId: "default-template",
  documentType: "invoice",
  invoiceNumber: `INV-${new Date().toISOString().slice(0, 10).replaceAll("-", "")}-1001`,
  issueDate: new Date().toISOString().slice(0, 10),
  dueDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 14).toISOString().slice(0, 10),
  companyName: "",
  currency: "USD",
  brandColor: "#B7DED7",
  fromName: "",
  fromAddress: "",
  fromEmail: "",
  fromPhone: "",
  toName: "",
  toAddress: "",
  toEmail: "",
  toPhone: "",
  shipToName: "",
  shipToAddress: "",
  shipToEmail: "",
  shipToPhone: "",
  items: [{ id: crypto.randomUUID(), description: "Service", quantity: 1, rate: 100 }],
  taxMode: "off",
  taxValue: 0,
  taxLabel: "Tax",
  discountMode: "off",
  discountValue: 0,
  shippingValue: 0,
  amountPaid: 0,
  notes: "",
  terms: "",
  paymentInstructions: "",
};

export const useInvoiceStore = create<InvoiceStore>()(
  persist(
    (set) => ({
      data: initialData,
      setData: (patch) => set((state) => ({ data: { ...state.data, ...patch } })),
      setItems: (items) => set((state) => ({ data: { ...state.data, items } })),
      reset: () => set({ data: initialData }),
    }),
    { name: "invoicelypro-data" },
  ),
);
