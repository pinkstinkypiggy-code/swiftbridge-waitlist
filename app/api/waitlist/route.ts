const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  const email =
    typeof body === "object" && body !== null && "email" in body
      ? (body as { email: unknown }).email
      : undefined;

  if (
    typeof email !== "string" ||
    email.trim().length > 254 ||
    !EMAIL_RE.test(email.trim())
  ) {
    return Response.json(
      { error: "Please enter a valid email address." },
      { status: 400 }
    );
  }

  const endpoint = process.env.SHEET_ENDPOINT;
  if (!endpoint) {
    console.error("SHEET_ENDPOINT is not set");
    return Response.json(
      { error: "The waitlist isn't configured yet — try again soon." },
      { status: 500 }
    );
  }

  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email.trim().toLowerCase() }),
      signal: AbortSignal.timeout(10_000),
      // Apps Script web apps respond with a redirect; fetch follows it by default.
    });

    if (!res.ok) {
      console.error(`Sheet endpoint responded with ${res.status}`);
      return Response.json(
        { error: "We couldn't save your email — please try again." },
        { status: 502 }
      );
    }
  } catch (err) {
    console.error("Failed to reach sheet endpoint:", err);
    return Response.json(
      { error: "We couldn't save your email — please try again." },
      { status: 502 }
    );
  }

  return Response.json({ ok: true });
}
