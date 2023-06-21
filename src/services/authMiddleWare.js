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
    return { user };
  }
};

export const AdminAuthMiddleWare = () => {
  const adminStore = useSelector((state) => state?.admin);
  if (adminStore.adminEmail) {
    const adminDetails = jwt_decode(adminStore?.adminEmail);
    if (adminDetails === process.env.REACT_APP_ADMIN_EMAIL) {
      return { admin: true, adminDetails };
    } else {
      return { admin: false };
    }
  } else {
    return { admin: false };
  }
};

export default AuthMiddleWare;
