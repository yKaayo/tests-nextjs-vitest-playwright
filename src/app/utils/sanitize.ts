export const sanitizeStr = (s: string) => {
  return !s || typeof s !== "string" ? "" : s.trim().normalize();
};

