// PDF generation utility for referral letters

// This is a simplified version for the demo
// In a real application, you would use a library like jsPDF or pdfmake
// or a server-side PDF generation service

export async function generateReferralPDF(referralData: any): Promise<string> {
  // In a real application, this would generate a proper PDF
  // For this demo, we'll create a simple HTML representation and convert it to base64

  const html = `
    <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 20px;
            color: #333;
          }
          .header {
            display: flex;
            justify-content: space-between;
            margin-bottom: 20px;
            border-bottom: 1px solid #ddd;
            padding-bottom: 10px;
          }
          .logo {
            font-size: 24px;
            font-weight: bold;
            color: #0066cc;
          }
          .reference {
            font-size: 12px;
          }
          .patient-info {
            margin-bottom: 20px;
            padding: 10px;
            background-color: #f9f9f9;
            border-radius: 5px;
          }
          .patient-info p {
            margin: 5px 0;
          }
          .content {
            margin-bottom: 20px;
          }
          .footer {
            margin-top: 30px;
            border-top: 1px solid #ddd;
            padding-top: 10px;
            font-size: 12px;
          }
          .doctor-info {
            margin-top: 20px;
            text-align: right;
          }
          .signature {
            height: 60px;
            margin-bottom: 10px;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <div class="logo">freedoc</div>
          <div class="reference">
            <p>Letter of Referral</p>
            <p>Reference number: ${referralData.referenceNumber}</p>
            <p>Date: ${formatDate(referralData.date)}</p>
          </div>
        </div>
        
        <div>
          <p>To: ${referralData.referredTo}</p>
        </div>
        
        <div class="patient-info">
          <p><strong>Patient name:</strong> ${referralData.patientName}</p>
          <p><strong>DOB:</strong> ${formatDate(referralData.patientDOB)}</p>
          <p><strong>Gender:</strong> ${referralData.patientGender}</p>
          <p><strong>Medicare/IHI Information:</strong> ${referralData.patientMedicare}</p>
          <p><strong>Address:</strong> ${referralData.patientAddress}</p>
          <p><strong>Mobile:</strong> ${referralData.patientPhone}</p>
        </div>
        
        <div class="content">
          <p>Dear ${referralData.referredTo},</p>
          <p>Thank you for your opinion and management of ${referralData.patientName}. ${referralData.reason}</p>
          
          <h3>Current medications and reactions</h3>
          <p>${referralData.medications || "None"}</p>
          
          <h3>Allergies</h3>
          <p>${referralData.allergies || "NKDA"}</p>
          
          <h3>Medical history</h3>
          <p>${referralData.medicalHistory || "None"}</p>
          
          <p>Kindly forward all relevant correspondence relating to this appointment via fax to +61280290784. 
          Please note, our mailing address is not monitored and any physical mail will not be received.</p>
          
          <p>For patient safety & data security, all results sent to freedoc require the above Reference Number 
          to be provided on the fax. We cannot process results without this, and there could be admin 
          delays for you.</p>
        </div>
        
        <div class="doctor-info">
          <div class="signature">
            ${referralData.doctorSignature ? `<img src="data:image/png;base64,${referralData.doctorSignature}" height="60" />` : ""}
          </div>
          <p>${referralData.doctorName}</p>
          <p>Provider Number: ${referralData.doctorProviderNumber}</p>
          <p>Registration Number: ${referralData.doctorRegistrationNumber}</p>
        </div>
        
        <div class="footer">
          <p>Yours faithfully,</p>
          <p>results@freedoc.com.au</p>
          <p>Level 10, 123 Pitt Street, Sydney NSW 2000</p>
          <p>T: +61290904541  |  F: +61280290784</p>
        </div>
      </body>
    </html>
  `

  // In a real application, we would convert this HTML to a PDF
  // For this demo, we'll just encode the HTML as base64
  return btoa(html)
}

// Helper function to format dates
function formatDate(dateString: string): string {
  try {
    const date = new Date(dateString)
    return date
      .toLocaleDateString("en-AU", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
      .replace(/\//g, "-")
  } catch (e) {
    return dateString
  }
}
