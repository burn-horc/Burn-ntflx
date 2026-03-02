export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { sessionToken } = req.body;

  if (!sessionToken) {
    return res.status(400).json({ error: "Missing session token" });
  }

  // 🔐 Validate against YOUR system
  const isValid = sessionToken === "demo-valid-token"; // replace with real validation logic

  if (isValid) {
    return res.status(200).json({
      valid: true,
      user: "Demo User",
      expires: "2026-01-01",
    });
  }

  return res.status(200).json({
    valid: false,
  });
}
