import { useSelector } from "react-redux";
import jwt_decode from "jwt-decode";

export const GetUsernameFromRedux = () => {
  const userStore = useSelector((state) => state?.user);
  let userDetails;
  if (userStore.userData) {
    userDetails = jwt_decode(userStore?.userData);
  }
  return userDetails;
};
