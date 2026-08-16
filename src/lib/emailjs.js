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

export function buildLeadEmailHtml({ name, email, phone, subject, message, source, submitted_at }) {
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

  return `
<table width="100%" cellpadding="0" cellspacing="0" style="background:#edece6;padding:24px 8px;font-family:Arial,Helvetica,sans-serif;">
  <tr>
    <td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="width:100%;max-width:600px;background:#ffffff;border:1px solid #d6d0c6;">
        <tr>
          <td style="background:#1a1a1a;padding:28px 24px;">
            <p style="margin:0 0 8px;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#a68d60;">LightStream Finance</p>
            <p style="margin:0;font-size:24px;line-height:1.3;color:#ffffff;font-weight:bold;">New Website Lead</p>
            <p style="margin:10px 0 0;font-size:14px;color:#d8d2c8;">A new inquiry was submitted from ${src}.</p>
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
            <table width="100%" cellpadding="0" cellspacing="0" style="font-size:15px;color:#1a1a1a;">
              <tr>
                <td style="padding:10px 0;border-bottom:1px solid #eee;width:110px;color:#777777;">Name</td>
                <td style="padding:10px 0;border-bottom:1px solid #eee;font-weight:bold;">${n}</td>
              </tr>
              <tr>
                <td style="padding:10px 0;border-bottom:1px solid #eee;color:#777777;">Email</td>
                <td style="padding:10px 0;border-bottom:1px solid #eee;"><a href="mailto:${eAttr}" style="color:#8d734e;text-decoration:none;">${e}</a></td>
              </tr>
              <tr>
                <td style="padding:10px 0;border-bottom:1px solid #eee;color:#777777;">Phone</td>
                <td style="padding:10px 0;border-bottom:1px solid #eee;"><a href="tel:${pAttr}" style="color:#8d734e;text-decoration:none;">${p}</a></td>
              </tr>
              <tr>
                <td style="padding:10px 0;border-bottom:1px solid #eee;color:#777777;">Subject</td>
                <td style="padding:10px 0;border-bottom:1px solid #eee;">${s}</td>
              </tr>
              <tr>
                <td style="padding:12px 0;color:#777777;vertical-align:top;">Message</td>
                <td style="padding:12px 0;line-height:1.6;">${m}</td>
              </tr>
            </table>
            <p style="margin:24px 0 0;">
              <a href="mailto:${eAttr}?subject=Re:%20${sAttr}" style="background:#8d734e;color:#ffffff;text-decoration:none;padding:12px 20px;border-radius:24px;display:inline-block;font-weight:bold;font-size:14px;">Reply to lead</a>
            </p>
            <p style="margin:16px 0 0;font-size:13px;color:#666666;">Please contact this lead as soon as possible.</p>
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
