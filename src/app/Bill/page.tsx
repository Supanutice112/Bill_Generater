"use client"; // Enables Client Component functionality for Next.js
import React, { useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const ReceiptForm: React.FC = () => {
  const [formData, setFormData] = useState({
    invoiceNumber: "ABC123138451581",
    phone: "0961569251",
    employee: "Kasidit Maneeyot",
    date: "2024-11-29",
    itemDescription: "1,400 อิฐก่อขาว 3 รู (หน้าเตา)",
    quantity: 1400,
    pricePerItem: 2.0,
  });

  const totalAmount = formData.quantity * formData.pricePerItem;
  const grandTotal = totalAmount;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]:
        name === "quantity" || name === "pricePerItem"
          ? parseFloat(value) || 0
          : value,
    }));
  };

  const formatDate = (date: string): string => {
    const [year, month, day] = date.split("-");
    return `${day}-${month}-${year}`;
  };

  const generatePDF = () => {
    const billElement = document.getElementById("bill-section");
    if (!billElement) return;

    html2canvas(billElement).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`Receipt_${formData.invoiceNumber}.pdf`);
    });
  };

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "auto",
        padding: "20px",
        background: "#f9f9f9",
      }}
    >
      <h3>Generate form</h3>
      <form>
        <div style={{ marginBottom: "10px" }}>
          <label>Phone:</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "8px",
              marginTop: "5px",
              fontSize: "14px",
            }}
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>Employee:</label>
          <input
            type="text"
            name="employee"
            value={formData.employee}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "8px",
              marginTop: "5px",
              fontSize: "14px",
            }}
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>Date:</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "8px",
              marginTop: "5px",
              fontSize: "14px",
            }}
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>Item Description:</label>
          <input
            type="text"
            name="itemDescription"
            value={formData.itemDescription}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "8px",
              marginTop: "5px",
              fontSize: "14px",
            }}
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>Quantity:</label>
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "8px",
              marginTop: "5px",
              fontSize: "14px",
            }}
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>Price per Item:</label>
          <input
            type="number"
            name="pricePerItem"
            value={formData.pricePerItem}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "8px",
              marginTop: "5px",
              fontSize: "14px",
            }}
          />
        </div>
      </form>

      <hr />

      {/* Bill Section */}
      <div
        id="bill-section"
        style={{
          fontFamily: "Arial, sans-serif",
          padding: "20px",
          background: "#fff",
          border: "1px solid #ddd",
          borderRadius: "8px",
          marginTop: "20px",
        }}
      >
        <h2 style={{ textAlign: "center" }}>โรงอิฐลำปาง ศิลปชัย</h2>
        <p style={{ textAlign: "center" }}>สาขา: สำนักงานใหญ่</p>
        <p style={{ textAlign: "center" }}>โทร: {formData.phone}</p>
        <hr />
        <p>
          <strong>ใบกำกับภาษีอย่างย่อ/ใบเสร็จรับเงิน</strong>
        </p>
        <p>เลขที่: {formData.invoiceNumber}</p>
        <p>พนักงานขาย: {formData.employee}</p>
        <p>วันที่: {formatDate(formData.date)}</p>
        <hr />
        <p
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span>{formData.itemDescription}</span>
          <span>{formData.pricePerItem.toFixed(2)}</span>
          <span style={{ textAlign: "right" }}>{formData.quantity}</span>
        </p>
        <hr />
        <p style={{ textAlign: "right", textDecoration: "underline" }}>
          รวมเป็นเงิน: {totalAmount.toFixed(2)}
        </p>
        <p
          style={{
            textAlign: "right",
            fontWeight: "bold",
            display: "flex",
            justifyContent: "flex-end",
            borderBottom: "3px double black",
          }}
        >
          รวมทั้งสิ้น: {grandTotal.toFixed(2)}
        </p>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "right",
          marginTop: "20px",
        }}
      >
        <button
          onClick={generatePDF}
          style={{
            padding: "10px 20px",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          ดาวน์โหลด PDF
        </button>
      </div>
      <div>
        
      <button
          onClick={generatePDF}
          style={{
            padding: "10px 20px",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          [บันทึก]
        </button>


      </div>
    </div>
  );
};

export default ReceiptForm;
