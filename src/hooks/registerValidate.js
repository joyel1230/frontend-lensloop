export const useRegisterValidate = (credentials, setError) => {
  let returnbool = false;
  for (let key in credentials) {
    if (!credentials[key]) {
      console.log(credentials[key]);
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
    } 
  }
  if (returnbool) return "validate error";
  setError(null)
  return null;
};
