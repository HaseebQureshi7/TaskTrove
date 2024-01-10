import UserTypes from "./UserTypes";

type UserDataContextTypes = {
    userData: UserTypes;
    setUserData: (data: UserTypes) => void;
};

export default UserDataContextTypes
