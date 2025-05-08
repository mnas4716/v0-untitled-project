export const EmailTemplate = ({ type, data }: { type: string; data: Record<string, any> }) => {
  let content = ""

  switch (type) {
    case "otp":
      content = `
        <p>Dear ${data.name},</p>
        <p>Your One-Time Password (OTP) is: <strong>${data.otp}</strong></p>
        <p>This OTP will expire in ${data.expiresIn}.</p>
      `
      break
    case "consult":
      content = `
        <p>Dear ${data.name},</p>
        <p>Thank you for your consultation request. We will contact you soon.</p>
        <p>Reason: ${data.reason}</p>
      `
      break
    case "prescription":
      content = `
        <p>Dear ${data.name},</p>
        <p>Thank you for your prescription request. We will process it soon.</p>
        <p>Medication: ${data.medication}</p>
      `
      break
    case "medical-certificate":
      content = `
        <p>Dear ${data.name},</p>
        <p>Thank you for your medical certificate request. We will process it soon.</p>
        <p>Start Date: ${data.startDate}</p>
        <p>End Date: ${data.endDate}</p>
      `
      break
    case "contact":
      content = `
        <p>Dear ${data.name},</p>
        <p>Thank you for contacting us. We will get back to you soon.</p>
        <p>Message: ${data.message}</p>
      `
      break
    case "admin-notification":
      content = `
        <p>Dear Admin,</p>
        <p>A new ${data.type} has been submitted.</p>
        <p>Name: ${data.name}</p>
        <p>Email: ${data.email}</p>
        <p>Phone: ${data.phone}</p>
        <p>Message: ${data.message}</p>
      `
      break
    default:
      content = `<p>Dear ${data.name},</p><p>Thank you for using our service.</p>`
  }

  return (
    <>
      <div>
        <h1>freedoc</h1>
        <p>Connecting you with healthcare professionals online, anytime, anywhere.</p>
        <hr />
        {content}
        <hr />
        <p>freedoc</p>
        <p>Level 10, 123 Pitt Street</p>
        <p>Sydney, NSW 2000</p>
        <p>Australia</p>
      </div>
    </>
  )
}
