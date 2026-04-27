import dynamic from "next/dynamic";
import type { ComponentType } from "react";
import type { InvoiceData } from "@/lib/invoice-store";

export type TemplateCategory =
  | "General"
  | "Travel & Booking"
  | "Hospitality"
  | "Healthcare"
  | "Education"
  | "Entertainment"
  | "Services"
  | "Real Estate"
  | "Finance"
  | "Freelance";

export type TemplateMeta = {
  id: string;
  name: string;
  category: TemplateCategory;
  thumb: string;
  description: string;
  Component: ComponentType<{ data: InvoiceData }>;
};

const t = (
  id: string,
  name: string,
  category: TemplateCategory,
  loader: () => Promise<{ [key: string]: ComponentType<{ data: InvoiceData }> }>,
  exportName: string,
): TemplateMeta => ({
  id,
  name,
  category,
  thumb: `/templates/thumbs/${id}.png`,
  description: `${name} template`,
  Component: dynamic(() => loader().then((m) => m[exportName])),
});

export const TEMPLATE_LIST: TemplateMeta[] = [
  t("general-invoice", "General Invoice", "General", () => import("./GeneralInvoice"), "GeneralInvoice"),
  t("hotel-booking-invoice", "Hotel Booking Invoice", "Hospitality", () => import("./HotelBookingInvoice"), "HotelBookingInvoice"),
  t("restaurant-bill-invoice", "Restaurant Bill Invoice", "Hospitality", () => import("./RestaurantBillInvoice"), "RestaurantBillInvoice"),
  t("bus-booking-invoice", "Bus Booking Invoice", "Travel & Booking", () => import("./BusBookingInvoice"), "BusBookingInvoice"),
  t("bus-booking-invoice-two", "Bus Booking Invoice Two", "Travel & Booking", () => import("./BusBookingInvoiceTwo"), "BusBookingInvoiceTwo"),
  t("bus-booking-invoice-three", "Bus Booking Invoice Three", "Travel & Booking", () => import("./BusBookingInvoiceThree"), "BusBookingInvoiceThree"),
  t("train-booking-invoice", "Train Booking Invoice", "Travel & Booking", () => import("./TrainBookingInvoice"), "TrainBookingInvoice"),
  t("train-booking-invoice-two", "Train Booking Invoice Two", "Travel & Booking", () => import("./TrainBookingInvoiceTwo"), "TrainBookingInvoiceTwo"),
  t("internet-bill-invoice", "Internet Bill Invoice", "Services", () => import("./InternetBillInvoice"), "InternetBillInvoice"),
  t("movie-booking-invoice", "Movie Booking Invoice", "Entertainment", () => import("./MovieBookingInvoice"), "MovieBookingInvoice"),
  t("student-billing-invoice", "Student Billing Invoice", "Education", () => import("./StudentBillingInvoice"), "StudentBillingInvoice"),
  t("student-billing-invoice-two", "Student Billing Invoice Two", "Education", () => import("./StudentBillingInvoiceTwo"), "StudentBillingInvoiceTwo"),
  t("domain-and-hosting-invoice", "Domain And Hosting Invoice", "Services", () => import("./DomainAndHostingInvoice"), "DomainAndHostingInvoice"),
  t("hospital-invoice", "Hospital Invoice", "Healthcare", () => import("./HospitalInvoice"), "HospitalInvoice"),
  t("money-exchange-invoice", "Money Exchange Invoice", "Finance", () => import("./MoneyExchangeInvoice"), "MoneyExchangeInvoice"),
  t("recharge-invoice", "Recharge Invoice", "Services", () => import("./RechargeInvoice"), "RechargeInvoice"),
  t("product-purchase-invoice", "Product Purchase Invoice", "General", () => import("./ProductPurchaseInvoice"), "ProductPurchaseInvoice"),
  t("student-admission-invoice", "Student Admission Invoice", "Education", () => import("./StudentAdmissionInvoice"), "StudentAdmissionInvoice"),
  t("student-admission-invoice-two", "Student Admission Invoice Two", "Education", () => import("./StudentAdmissionInvoiceTwo"), "StudentAdmissionInvoiceTwo"),
  t("zoo-ticket-invoice", "Zoo Ticket Invoice", "Entertainment", () => import("./ZooTicketInvoice"), "ZooTicketInvoice"),
  t("stadium-seat-booking-invoice", "Stadium Seat Booking Invoice", "Entertainment", () => import("./StadiumSeatBookingInvoice"), "StadiumSeatBookingInvoice"),
  t("house-contract-invoice", "House Contract Invoice", "Real Estate", () => import("./HouseContractInvoice"), "HouseContractInvoice"),
  t("roofing-services-invoice", "Roofing Services Invoice", "Services", () => import("./RoofingServicesInvoice"), "RoofingServicesInvoice"),
  t("photostudio-invoice", "Photostudio Invoice", "Services", () => import("./PhotostudioInvoice"), "PhotostudioInvoice"),
  t("plumbing-invoice", "Plumbing Invoice", "Services", () => import("./PlumbingInvoice"), "PlumbingInvoice"),
  t("real-estate-invoice", "Real Estate Invoice", "Real Estate", () => import("./RealEstateInvoice"), "RealEstateInvoice"),
  t("restaurant-bill-invoice-two", "Restaurant Bill Invoice Two", "Hospitality", () => import("./RestaurantBillInvoiceTwo"), "RestaurantBillInvoiceTwo"),
  t("taxi-booking-invoice", "Taxi Booking Invoice", "Travel & Booking", () => import("./TaxiBookingInvoice"), "TaxiBookingInvoice"),
  t("hotel-booking-invoice-two", "Hotel Booking Invoice Two", "Hospitality", () => import("./HotelBookingInvoiceTwo"), "HotelBookingInvoiceTwo"),
  t("freelancer-invoice", "Freelancer Invoice", "Freelance", () => import("./FreelancerInvoice"), "FreelancerInvoice"),
];

export const TEMPLATES: Record<string, TemplateMeta> = Object.fromEntries(
  TEMPLATE_LIST.map((tpl) => [tpl.id, tpl]),
);
