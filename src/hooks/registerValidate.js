export const useRegisterValidate = (credentials, setError) => {
  let returnbool = false;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  for (let key in credentials) {
    if (!credentials[key]) {
      setError(`${key} is Required`);
      returnbool = true;
      break;
    } else if (credentials[key].length < 4 || credentials[key].length > 30) {
      setError(`${key} must be 4 or more char.`);
      returnbool = true;
      break;
    } else if (key === "confirmPassword") {
      if (credentials["password"] !== credentials[key]) {
        setError(`${key} must be same.`);
        returnbool = true;
        break;
      }
    } else if (key === "email") {
      if (!emailRegex.test(credentials[key])) {
        setError(`${key} not valid.`);
        returnbool = true;
        break;
      }
    } else if (key === "username") {
      if (credentials[key].includes("@")) {
        setError(`${key} can't contain '@'`);
        returnbool = true;
        break;
      }
    }
  }
  if (returnbool) return "validate error";
  setError(null);
  return null;
};
