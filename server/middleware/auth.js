// Optional JWT auth middleware — attaches req.user if a valid Supabase token is present.
// Requests without a token are allowed through (for unauthenticated testing).
import supabase from "../lib/supabase.js";

async function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    // No token — allow through for now (optional auth)
    return next();
  }

  const token = authHeader.split(" ")[1];

  try {
    const { data, error } = await supabase.auth.getUser(token);
    if (error || !data?.user) {
      console.log("[auth] Invalid token:", error?.message);
      return res.status(401).json({ error: "Invalid or expired token" });
    }
    req.user = data.user;
    console.log("[auth] Authenticated user:", req.user.email);
    next();
  } catch (err) {
    console.error("[auth] Error verifying token:", err.message);
    return res.status(401).json({ error: "Authentication failed" });
  }
}

export default authMiddleware;
