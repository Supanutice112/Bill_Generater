"use client"; // Enables Client Component functionality for Next.js

import React, { useState } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable"; // Import for table generation if needed

const ReceiptForm: React.FC = () => {
  const [formData, setFormData] = useState({
    phone: "0961569251",
    employee: "Kasidit Maneeyot",
    date: "19/11/2024",
    itemDescription: "1,400 อิฐก่อขาว 3 รู (หน้าเตา)",
    total: "2,800.00",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF("p", "pt", "a4");

    // Set font for the PDF
    doc.setFont("helvetica", "normal");

    // Company Name and Header
    doc.text("โรงอิฐลำปาง ศิลปชัย", 40, 50);
    doc.text("(สำนักงานใหญ่)", 40, 70);
    doc.text(`โทร: ${formData.phone}`, 40, 90);

    // Add a horizontal line for separation
    doc.line(40, 100, 550, 100);

    // Employee and Date
    doc.text(`พนักงานขาย: ${formData.employee}`, 40, 120);
    doc.text(`วันที่: ${formData.date}`, 40, 140);

    // Item Description
    doc.text("รายละเอียดสินค้า", 40, 170);
    doc.text(formData.itemDescription, 40, 190);

    // Add another separator
    doc.line(40, 210, 550, 210);

    // Total amount and VAT Information
    doc.text("จำนวนรวม", 40, 230);
    doc.text(`2,800.00`, 500, 230); // You can dynamically set this value based on formData

    doc.text("รวมเป็นเงิน", 40, 250);
    doc.text(`2,800.00`, 500, 250); // Same as total

    doc.text("ภาษีมูลค่าเพิ่ม 0%", 40, 270);
    doc.text(`0.00`, 500, 270); // Adjust if necessary

    // Final total
    doc.text("รวมทั้งหมด", 40, 290);
    doc.text(`2,800.00`, 500, 290); // Same as total

    // Add footer text with POS and FlowAccount information
    doc.line(40, 310, 550, 310); // Footer separator
    doc.text("VAT EXCLUDED", 40, 330);
    doc.text("ใช้งาน POS ฟรีได้ที่ FlowAccount", 40, 350);

    // Save the PDF file
    doc.save("receipt.pdf");
  };

  return (
    <div style={styles.container}>
      {/* Input Section */}
      <div style={styles.formSection}>
        <h2>Reciept</h2>
        <label>
          Contect:
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            style={styles.input}
          />
        </label>
        <label>
          Employee:
          <input
            type="text"
            name="employee"
            value={formData.employee}
            onChange={handleChange}
            style={styles.input}
          />
        </label>
        <label>
          Date:
          <input
            type="text"
            name="date"
            value={formData.date}
            onChange={handleChange}
            style={styles.input}
          />
        </label>
        <label>
          Product:
          <input
            type="text"
            name="itemDescription"
            value={formData.itemDescription}
            onChange={handleChange}
            style={styles.input}
          />
        </label>
      </div>

      {/* Button to generate the PDF */}
      <button onClick={handleDownloadPDF} style={styles.button}>
        Generate Bill
      </button>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: "Arial, sans-serif",
    padding: "20px",
  },
  formSection: {
    marginBottom: "20px",
  },
  input: {
    display: "block",
    margin: "10px 0",
    padding: "8px",
    fontSize: "16px",
    width: "100%",
  },
  button: {
    padding: "10px 20px",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    cursor: "pointer",
    fontSize: "16px",
  },
};

export default ReceiptForm;
