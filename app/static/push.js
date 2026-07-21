/* Push + PWA helpers (loaded only when logged in) */
(function () {
  const statusEl = document.getElementById("push-status");
  const btn = document.getElementById("enable-push");
  if (!btn) return;

  function setStatus(msg, ok) {
    if (!statusEl) return;
    statusEl.textContent = msg;
    statusEl.className = "lede " + (ok ? "push-ok" : "push-warn");
  }

  function urlBase64ToUint8Array(base64String) {
    const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
    const raw = atob(base64);
    const out = new Uint8Array(raw.length);
    for (let i = 0; i < raw.length; i++) out[i] = raw.charCodeAt(i);
    return out;
  }

  async function ensureSW() {
    if (!("serviceWorker" in navigator)) throw new Error("Service workers unsupported");
    return navigator.serviceWorker.register("/sw.js", { scope: "/" });
  }

  // Register SW early so Add to Home Screen works
  if ("serviceWorker" in navigator) {
    ensureSW().catch(() => {});
  }

  btn.addEventListener("click", async () => {
    btn.disabled = true;
    try {
      if (!window.isSecureContext) {
        setStatus("HTTPS required for notifications.", false);
        return;
      }
      const reg = await ensureSW();
      const permission = await Notification.requestPermission();
      if (permission !== "granted") {
        setStatus("Permission denied. Allow notifications for Kindling.", false);
        return;
      }
      const keyRes = await fetch("/api/push/vapid-public-key");
      if (!keyRes.ok) throw new Error("Push not configured on server");
      const { publicKey } = await keyRes.json();
      const sub = await reg.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(publicKey),
      });
      const save = await fetch("/api/push/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(sub.toJSON()),
      });
      if (!save.ok) throw new Error("Could not save subscription");
      setStatus("Notifications enabled. You will get a ping every 50 sends.", true);
      btn.textContent = "Notifications on";
    } catch (err) {
      setStatus(err.message || "Could not enable notifications", false);
      btn.disabled = false;
    }
  });
})();
