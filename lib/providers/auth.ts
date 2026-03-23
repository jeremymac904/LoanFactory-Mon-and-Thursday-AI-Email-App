export interface AuthContext {
  userId: string;
  displayName: string;
  role: string;
  mode: string;
}

export function getAuthContext(): AuthContext {
  return {
    userId: "jeremy-local-admin",
    displayName: "Jeremy McDonald",
    role: "Owner / Approver",
    mode: process.env.AUTH_PROVIDER || "local-admin"
  };
}
