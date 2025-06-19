export let toast = $state({ message: "", type: "success"});

let timeout;

function setToast(msg, type) {
  if (timeout) clearTimeout(timeout);

  toast.message = msg;
  toast.type = type;
  timeout = setTimeout(() => toast.message = "", 2500);
}

export function success(msg) {
  setToast("✓ " + msg, "success");
}

export function err(msg) {
  setToast('🚫 ' + msg, "error");
}

export function startLoading() {
  setToast("Loading...", "loading");
}

export function stopLoading() {
  if (toast.type === "loading") setToast("", "");
}