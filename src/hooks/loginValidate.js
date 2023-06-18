export const useLoginValidate = (credentials, setError) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!credentials?.emailOrUsername) {
    setError("Email/Username is required");
  } else if (credentials?.emailOrUsername.length <= 3) {
    setError("Email/Username must be 4 or more");
  } else if (!credentials?.password) {
    setError("Password is required");
  } else if (credentials?.password.length <= 3) {
    setError("Password must be at least 4 or more");
  } else if (!emailRegex.test(credentials?.emailOrUsername)) {
    if (credentials?.emailOrUsername.includes("@")) {
      setError("Invalid email");
    } else {
      setError(null);
      return null;
    }
  } else {
    setError(null);
    return null;
  }

  return "error";
};
