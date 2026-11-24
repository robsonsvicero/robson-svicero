export async function triggerHostingerRebuild({
  slug = "",
  title = "",
  event = "blog-post-saved",
} = {}) {
  const secret = import.meta.env.VITE_HOSTINGER_REBUILD_SECRET;

  if (!secret) {
    return { triggered: false, reason: "not-configured" };
  }

  const response = await fetch("/api/rebuild", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-rebuild-secret": secret,
    },
    body: JSON.stringify({
      event,
      slug,
      title,
      timestamp: new Date().toISOString(),
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(errorData?.message || `Rebuild falhou com status ${response.status}.`);
  }

  return { triggered: true, status: response.status };
}
