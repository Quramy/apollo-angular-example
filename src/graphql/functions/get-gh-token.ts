
export function getGhToken(): string {
  const token = window.localStorage.getItem("GH_TOKEN");
  if (token) return token;
  const t = window.prompt("Input GitHub access token");
  window.localStorage.setItem("GH_TOKEN", t);
  return t;
}

