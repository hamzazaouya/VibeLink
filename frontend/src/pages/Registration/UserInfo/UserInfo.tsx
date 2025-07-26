
import UserLocationMap from "./UserLocationMap";
import UserForm from "./UserFrom";
import "../styles/userInfo.css"
import { UserFormProps } from "../types/registration.types";

function UserInformation ( props: UserFormProps
) {
    return (
    <div className="user_info">
        <UserForm {...props}/>
        <UserLocationMap {...props}/>
    </div>
  );
}

export default UserInformation;