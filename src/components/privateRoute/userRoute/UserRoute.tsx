import { Navigate, useLocation } from "react-router-dom";
import { UserRouteProps } from "./types";
import { useAppSelector } from "../../../redux/app/hooks";

export default function UserRoute({ children }: UserRouteProps) {
    const auth = useAppSelector(state => state.auth);
    const location = useLocation();

    return auth.token && auth.user && auth.user.role === 'user' ? children :
        <Navigate
            to="/login"
            state={{ from: location }}
            replace
        />;
}
