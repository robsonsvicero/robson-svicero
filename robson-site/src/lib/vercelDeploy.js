export async function triggerVercelDeploy({
  hookUrl = import.meta.env.VITE_VERCEL_DEPLOY_HOOK_URL,
  event = "blog-post-saved",
  slug = "",
  title = "",
} = {}) {
  if (!hookUrl) {
    return { triggered: false, reason: "not-configured" };
  }

  const response = await fetch(hookUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      event,
      slug,
      title,
      timestamp: new Date().toISOString(),
    }),
  });

  if (!response.ok) {
    const errorText = await response.text().catch(() => "");
    throw new Error(errorText || `Deploy hook falhou com status ${response.status}.`);
  }

  return { triggered: true, status: response.status };
}
