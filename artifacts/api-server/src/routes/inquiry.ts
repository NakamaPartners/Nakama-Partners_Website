import { Router, type IRouter } from "express";

const router: IRouter = Router();

router.post("/inquiry", async (req, res) => {
  const { name, phone, email, needs, message } = req.body ?? {};

  if (!name || typeof name !== "string" || name.trim().length === 0) {
    res.status(400).json({ error: "Name is required" });
    return;
  }
  if (!email || typeof email !== "string" || !email.includes("@")) {
    res.status(400).json({ error: "A valid email is required" });
    return;
  }
  if (!needs || typeof needs !== "string" || needs.trim().length === 0) {
    res.status(400).json({ error: "Please select your primary need" });
    return;
  }

  const safeName    = name.trim().slice(0, 100);
  const safeEmail   = email.trim().slice(0, 200);
  const safePhone   = typeof phone   === "string" ? phone.trim().slice(0, 30)  : "";
  const safeNeeds   = needs.trim().slice(0, 100);
  const safeMessage = typeof message === "string" ? message.trim().slice(0, 400) : "";

  req.log.info({ name: safeName, email: safeEmail, needs: safeNeeds }, "New inquiry");

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    req.log.warn("RESEND_API_KEY not configured — inquiry logged only");
    res.json({ ok: true });
    return;
  }

  const html = `
    <div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#1a2a22">
      <div style="background:#2A6044;padding:24px 32px">
        <h1 style="color:#fff;margin:0;font-size:20px;letter-spacing:0.5px">New Inquiry — Nakama Partners</h1>
      </div>
      <div style="padding:32px;border:1px solid #e4eae6;border-top:none">
        <table style="width:100%;border-collapse:collapse">
          <tr><td style="padding:10px 0;border-bottom:1px solid #edf1ee;color:#5a7060;width:120px;font-size:13px">Name</td><td style="padding:10px 0;border-bottom:1px solid #edf1ee;font-size:14px;font-weight:500">${safeName}</td></tr>
          <tr><td style="padding:10px 0;border-bottom:1px solid #edf1ee;color:#5a7060;font-size:13px">Email</td><td style="padding:10px 0;border-bottom:1px solid #edf1ee;font-size:14px">${safeEmail}</td></tr>
          <tr><td style="padding:10px 0;border-bottom:1px solid #edf1ee;color:#5a7060;font-size:13px">Phone</td><td style="padding:10px 0;border-bottom:1px solid #edf1ee;font-size:14px">${safePhone || "—"}</td></tr>
          <tr><td style="padding:10px 0;border-bottom:1px solid #edf1ee;color:#5a7060;font-size:13px">Needs</td><td style="padding:10px 0;border-bottom:1px solid #edf1ee;font-size:14px">${safeNeeds}</td></tr>
        </table>
        ${safeMessage ? `<div style="margin-top:24px"><p style="color:#5a7060;font-size:13px;margin:0 0 8px">Message</p><p style="font-size:14px;line-height:1.7;white-space:pre-wrap;background:#f5f8f6;padding:16px;border-left:3px solid #2A6044;margin:0">${safeMessage}</p></div>` : ""}
        <p style="margin-top:32px;font-size:12px;color:#8aab94">Reply directly to this email to reach ${safeName} at ${safeEmail}.</p>
      </div>
    </div>
  `;

  try {
    const resp = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Nakama Website <contact@nakama.partners>",
        to: ["contact@nakama.partners"],
        cc: ["kevinasuteja@gmail.com", "renaldoliao@gmail.com"],
        reply_to: safeEmail,
        subject: `New inquiry from ${safeName} — ${safeNeeds}`,
        html,
      }),
    });

    if (!resp.ok) {
      const txt = await resp.text();
      req.log.error({ status: resp.status, body: txt }, "Resend error");
      res.status(502).json({ error: "Email delivery failed" });
      return;
    }

    req.log.info({ name: safeName }, "Inquiry email sent");
    res.json({ ok: true });
  } catch (err) {
    req.log.error({ err }, "Inquiry send failed");
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
