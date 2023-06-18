import { useSelector } from "react-redux";
import jwt_decode from "jwt-decode";

const AuthMiddleWare = () => {
  const userStore = useSelector((state) => state?.user);
  let userDetails, user;
  if (userStore.userData) {
    user = userStore?.validUser;
    userDetails = jwt_decode(userStore?.userData);
    return { user, userDetails };
  } else {
    user = false;
    return {user};
  }
};

export default AuthMiddleWare;
