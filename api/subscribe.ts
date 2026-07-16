const KIT_FORM_ID = "9692898";
const KIT_TAG_ID = 21238409;

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const { email, website } = req.body ?? {};

  // Honeypot — bots fill this, humans don't
  if (website) {
    res.status(200).json({ ok: true });
    return;
  }

  if (!email || typeof email !== "string" || !email.includes("@")) {
    res.status(400).json({ error: "Valid email required" });
    return;
  }

  const apiKey = process.env.KIT_API_KEY;
  if (!apiKey) {
    res.status(500).json({ error: "Server misconfigured" });
    return;
  }

  try {
    const resp = await fetch(
      `https://api.convertkit.com/v3/forms/${KIT_FORM_ID}/subscribe`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ api_key: apiKey, email: email.trim(), tags: [KIT_TAG_ID] }),
      }
    );

    if (!resp.ok) {
      const err = await resp.json().catch(() => ({}));
      console.error("Kit API error:", err);
      res.status(500).json({ error: "Subscription failed" });
      return;
    }

    res.status(200).json({ ok: true });
  } catch (err) {
    console.error("Subscribe error:", err);
    res.status(500).json({ error: "Subscription failed" });
  }
}
