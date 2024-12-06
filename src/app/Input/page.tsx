"use client"; // Ensures the file is treated as a Client Component

import React, { useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const ReceiptForm: React.FC = () => {
  // เริ่มต้น items เป็น Array ว่าง
  const [items, setItems] = useState([]);

  const [newItem, setNewItem] = useState({
    description: "",
    quantity: 0,
    pricePerItem: 0.0,
  });

  const [formData, setFormData] = useState({
    invoiceNumber: "",
    phone: "",
    employee: "",
    date: "",
  });

  const handleNewItemChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewItem((prev) => ({
      ...prev,
      [name]: name === "quantity" || name === "pricePerItem" ? parseFloat(value) || 0 : value,
    }));
  };

  const handleAddItem = () => {
    if (newItem.description && newItem.quantity > 0 && newItem.pricePerItem > 0) {
      setItems((prev) => [...prev, newItem]);
      setNewItem({ description: "", quantity: 0, pricePerItem: 0.0 }); // Reset newItem form
    }
  };

  const totalAmount = items.reduce((total, item) => total + item.quantity * item.pricePerItem, 0);

  const generatePDF = () => {
    const billElement = document.getElementById("bill-section");
    if (!billElement) return;

    html2canvas(billElement).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      pdf.addImage(imgData, "PNG", 0, 0, pdf.internal.pageSize.getWidth(), pdf.internal.pageSize.getHeight());
      pdf.save(`Receipt_${formData.invoiceNumber}.pdf`);
    });
  };

  // Function to format date to DD/MM/YYYY
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = ("0" + date.getDate()).slice(-2);
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "auto" }}>
      {/* Form Section */}
      <div style={{ marginBottom: "20px" }}>
        <h3>Input Form</h3>
        <form>
          <div style={{ marginBottom: "10px" }}>
            <label>Invoice Number:</label>
            <input
              type="text"
              name="invoiceNumber"
              value={formData.invoiceNumber}
              onChange={(e) => setFormData({ ...formData, invoiceNumber: e.target.value })}
              style={{ width: "100%", padding: "8px", marginTop: "5px" }}
            />
          </div>
          <div style={{ marginBottom: "10px" }}>
            <label>Phone:</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              style={{ width: "100%", padding: "8px", marginTop: "5px" }}
            />
          </div>
          <div style={{ marginBottom: "10px" }}>
            <label>Employee:</label>
            <input
              type="text"
              name="employee"
              value={formData.employee}
              onChange={(e) => setFormData({ ...formData, employee: e.target.value })}
              style={{ width: "100%", padding: "8px", marginTop: "5px" }}
            />
          </div>
          <div style={{ marginBottom: "10px" }}>
            <label>Date:</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              style={{ width: "100%", padding: "8px", marginTop: "5px" }}
            />
          </div>
        </form>
      </div>

      {/* New Item Form */}
      <div style={{ marginBottom: "20px" }}>
        <h3>Add New Item</h3>
        <form>
          <div style={{ marginBottom: "10px" }}>
            <label>Description:</label>
            <input
              type="text"
              name="description"
              value={newItem.description}
              onChange={handleNewItemChange}
              style={{ width: "100%", padding: "8px", marginTop: "5px" }}
            />
          </div>
          <div style={{ marginBottom: "10px" }}>
            <label>Quantity:</label>
            <input
              type="number"
              name="quantity"
              value={newItem.quantity}
              onChange={handleNewItemChange}
              style={{ width: "100%", padding: "8px", marginTop: "5px" }}
            />
          </div>
          <div style={{ marginBottom: "10px" }}>
            <label>Price Per Item:</label>
            <input
              type="number"
              name="pricePerItem"
              value={newItem.pricePerItem}
              onChange={handleNewItemChange}
              style={{ width: "100%", padding: "8px", marginTop: "5px" }}
            />
          </div>
          <button
            type="button"
            onClick={handleAddItem}
            style={{
              padding: "10px 20px",
              backgroundColor: "#28a745",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Add Item
          </button>
        </form>
      </div>

      {/* Receipt Section */}
      <div
        id="bill-section"
        style={{
          fontFamily: "Arial, sans-serif",
          border: "1px solid #000",
          padding: "10px",
          borderRadius: "5px",
          backgroundColor: "#fff",
        }}
      >
        {/* Header */}
        <div style={{ backgroundColor: "#002699", color: "#fff", textAlign: "center", padding: "10px 0" }}>
          <h2 style={{ margin: "0" }}>บิลเงินสด</h2>
          <p style={{ margin: "0" }}>CASH SALE</p>
        </div>

        {/* Information Table */}
        <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "10px" }}>
          <tbody>
            <tr>
              <td style={{ border: "1px solid #000", padding: "5px" }}>เลขที่ใบเสร็จ</td>
              <td style={{ border: "1px solid #000", padding: "5px" }}>{formData.invoiceNumber}</td>
              <td style={{ border: "1px solid #000", padding: "5px" }}>วันที่</td>
              <td style={{ border: "1px solid #000", padding: "5px" }}>{formatDate(formData.date)}</td>
            </tr>
            <tr>
              <td style={{ border: "1px solid #000", padding: "5px" }}>พนักงานขาย</td>
              <td colSpan={3} style={{ border: "1px solid #000", padding: "5px" }}>
                {formData.employee}
              </td>
            </tr>
            <tr>
              <td style={{ border: "1px solid #000", padding: "5px" }}>เบอร์โทร</td>
              <td colSpan={3} style={{ border: "1px solid #000", padding: "5px" }}>
                {formData.phone}
              </td>
            </tr>
          </tbody>
        </table>

        {/* Items Table */}
        <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "10px" }}>
          <thead style={{ backgroundColor: "#ddd" }}>
            <tr>
              <th style={{ border: "1px solid #000", padding: "5px" }}>จำนวน (QUANTITY)</th>
              <th style={{ border: "1px solid #000", padding: "5px" }}>รายการ (DESCRIPTION)</th>
              <th style={{ border: "1px solid #000", padding: "5px" }}>ราคาต่อหน่วย (UNIT PRICE)</th>
              <th style={{ border: "1px solid #000", padding: "5px" }}>รวม (AMOUNT)</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={index}>
                <td style={{ border: "1px solid #000", padding: "5px", textAlign: "center" }}>{item.quantity}</td>
                <td style={{ border: "1px solid #000", padding: "5px" }}>{item.description}</td>
                <td style={{ border: "1px solid #000", padding: "5px", textAlign: "right" }}>
                  {item.pricePerItem.toFixed(2)}
                </td>
                <td style={{ border: "1px solid #000", padding: "5px", textAlign: "right" }}>
                  {(item.quantity * item.pricePerItem).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Footer */}
        <div style={{ marginTop: "10px", textAlign: "right" }}>
          <p>รวมเป็นเงิน (TOTAL): {totalAmount.toFixed(2)}</p>
          <p>ลงชื่อ (COLLECTOR): ______________________</p>
        </div>
      </div>

      {/* Button */}
      <div style={{ marginTop: "20px", textAlign: "center" }}>
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
    </div>
  );
};

export default ReceiptForm;
