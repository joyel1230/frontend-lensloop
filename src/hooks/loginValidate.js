export const useLoginValidate = (credentials, setError) => {
  if (!credentials?.emailOrUsername) {
    setError("Email/Username is Required");
  } else if (credentials?.emailOrUsername.length <= 3) {
    setError("Email/Username must be 4 char");
  } else if (!credentials?.password) {
    setError("Password is Required");
  } else if (credentials?.password.length <= 3) {
    setError("Password must be 4 char");
  }else{
    setError(null)
    return null;
  }
  return 'error'
};

