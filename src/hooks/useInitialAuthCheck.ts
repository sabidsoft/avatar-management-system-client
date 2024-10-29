import { useEffect, useState } from "react";
import { useAppDispatch } from "../redux/app/hooks";
import { userLoggedIn } from "../redux/features/auth/authSlice";

export default function useInitialAuthCheck() {
    const [initialAuthChecked, setInitialAuthChecked] = useState(false);
    const dispatch = useAppDispatch();

    useEffect(() => {
        const localAuth = localStorage.getItem("auth");

        if (localAuth) {
            const auth = JSON.parse(localAuth);

            if (auth.token && auth.user) {
                dispatch(userLoggedIn({
                    token: auth.token,
                    user: auth.user
                }));
            }
        }
        setInitialAuthChecked(true);
    }, [dispatch]);

    return initialAuthChecked;
};