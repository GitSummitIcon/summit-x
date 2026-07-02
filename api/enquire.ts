import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const { name, email, phone, interest, message } = req.body ?? {};

  if (!name || !email) {
    res.status(400).json({ error: "Name and email are required" });
    return;
  }

  const rows = (
    [
      ["Name", name],
      ["Email", `<a href="mailto:${email}" style="color:#d98a34;">${email}</a>`],
      phone ? ["Phone", phone] : null,
      interest ? ["Interested in", interest] : null,
      message
        ? ["Message", String(message).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/\n/g, "<br>")]
        : null,
    ] as ([string, string] | null)[]
  )
    .filter((r): r is [string, string] => r !== null)
    .map(
      ([label, value]) =>
        `<tr>
          <td style="padding:10px 0;border-bottom:1px solid #e5e0d8;font-weight:600;width:140px;vertical-align:top;font-family:Arial,sans-serif;font-size:13px;color:#51463b;">${label}</td>
          <td style="padding:10px 0;border-bottom:1px solid #e5e0d8;font-family:Arial,sans-serif;font-size:13px;color:#17130f;">${value}</td>
        </tr>`
    )
    .join("");

  try {
    await resend.emails.send({
      from: "Summit X <noreply@iconprivatecollection.com>",
      to: ["summitx@iconprivatecollection.com"],
      replyTo: email,
      subject: `Enquiry from ${name} — Summit X`,
      html: `
        <div style="max-width:560px;margin:0 auto;padding:32px 16px;font-family:Arial,sans-serif;">
          <p style="font-family:Georgia,'Times New Roman',serif;font-size:22px;font-weight:400;color:#17130f;margin:0 0 8px;">New enquiry</p>
          <p style="font-family:Georgia,'Times New Roman',serif;font-size:14px;color:#b2a18d;margin:0 0 28px;font-style:italic;">via summitx.iconprivatecollection.com</p>
          <table style="border-collapse:collapse;width:100%;">
            ${rows}
          </table>
          <p style="font-size:11px;color:#b2a18d;margin-top:32px;padding-top:16px;border-top:1px solid #e5e0d8;">
            Reply directly to this email to respond to ${name}.
          </p>
        </div>
      `,
    });

    res.status(200).json({ ok: true });
  } catch (err) {
    console.error("Resend error:", err);
    res.status(500).json({ error: "Failed to send email" });
  }
}
