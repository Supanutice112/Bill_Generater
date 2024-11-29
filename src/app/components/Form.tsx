import React from 'react';

const Receipt: React.FC = () => {
  return (
    <div style={styles.container}>
      {/* Header Section */}
      <div style={styles.header}>
        <h2>โรงอิฐลำปาง ศิลปชัย</h2>
        <p>(สำนักงานใหญ่)</p>
        <p>โทร: 0961569251</p>
      </div>

      <div style={styles.divider} />

      {/* Invoice Details */}
      <div style={styles.details}>
        <p>ใบกำกับภาษีอย่างย่อ/ใบเสร็จรับเงิน</p>
        <p>CA202411190001</p>
        <p>พนักงานขาย: Kasidit Maneeyot</p>
        <p>วันที่: 19/11/2024</p>
      </div>

      <div style={styles.divider} />

      {/* Items Section */}
      <div style={styles.items}>
        <div style={styles.itemRow}>
          <span>1,400 อิฐก่อขาว 3 รู (หน้าเตา)</span>
          <span>2,800.00</span>
        </div>
        <div style={styles.itemRow}>
          <span>จำนวนรวม</span>
          <span>1,400</span>
        </div>
      </div>

      <div style={styles.divider} />

      {/* Totals Section */}
      <div style={styles.totals}>
        <div style={styles.itemRow}>
          <span>รวมเป็นเงิน</span>
          <span>2,800.00</span>
        </div>
        <div style={styles.itemRow}>
          <span>ภาษีมูลค่าเพิ่ม 0%</span>
          <span>0.00</span>
        </div>
        <div style={styles.itemRow}>
          <strong>รวมทั้งสิ้น</strong>
          <strong>2,800.00</strong>
        </div>
      </div>

      <div style={styles.divider} />

      {/* Footer */}
      <div style={styles.footer}>
        <p>VAT EXCLUDED</p>
        <p>ใช้งาน POS ฟรีได้ที่ FlowAccount.com</p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    width: '300px',
    margin: '0 auto',
    padding: '20px',
    border: '1px solid #ddd',
    borderRadius: '5px',
  },
  header: {
    textAlign: 'center' as const,
  },
  divider: {
    borderBottom: '1px dashed #000',
    margin: '10px 0',
  },
  details: {
    fontSize: '14px',
  },
  items: {
    fontSize: '14px',
  },
  itemRow: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: '5px 0',
  },
  totals: {
    fontSize: '14px',
    fontWeight: 'bold' as const,
  },
  footer: {
    textAlign: 'center' as const,
    fontSize: '12px',
    marginTop: '10px',
  },
};

export default Receipt;
