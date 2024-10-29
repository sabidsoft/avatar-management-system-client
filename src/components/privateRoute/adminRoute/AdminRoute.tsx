import { Navigate, useLocation } from "react-router-dom";
import { AdminRouteProps } from "./types";
import { useAppSelector } from "../../../redux/app/hooks";

export default function AdminRoute({ children }: AdminRouteProps) {
    const auth = useAppSelector(state => state.auth);
    const location = useLocation();

    return auth.token && auth.user && auth.user.role === 'admin' ? children :
        <Navigate
            to="/page-not-found"
            state={{ from: location }}
            replace
        />;
}
