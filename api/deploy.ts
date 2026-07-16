const DEBOUNCE_MS = 5 * 60 * 1000; // 5 minutes

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const hookUrl = process.env.HOOK_URL;
  const apiToken = process.env.VERCEL_API_TOKEN;
  const projectId = process.env.VERCEL_PROJECT_ID;

  if (!hookUrl || !apiToken || !projectId) {
    console.error("deploy: missing env vars");
    // Return 200 so Sanity doesn't keep retrying
    res.status(200).json({ status: "error", reason: "misconfigured" });
    return;
  }

  try {
    const resp = await fetch(
      `https://api.vercel.com/v6/deployments?projectId=${projectId}&limit=1&target=production`,
      { headers: { Authorization: `Bearer ${apiToken}` } }
    );

    if (resp.ok) {
      const { deployments } = await resp.json();
      const last = deployments?.[0];
      if (last) {
        const age = Date.now() - last.createdAt;
        if (age < DEBOUNCE_MS) {
          console.log(`deploy: skipped — last deploy ${Math.round(age / 1000)}s ago`);
          res.status(200).json({ status: "skipped", age_seconds: Math.round(age / 1000) });
          return;
        }
      }
    }

    await fetch(hookUrl, { method: "POST" });
    console.log("deploy: triggered");
    res.status(200).json({ status: "triggered" });
  } catch (err) {
    console.error("deploy error:", err);
    // Return 200 so Sanity doesn't queue retries
    res.status(200).json({ status: "error" });
  }
}
