export function getServerSecret(): string {
  const secret = process.env.SECRET;
  if (!secret) throw new Error("Server secret is not set in env");

  return secret;
}
