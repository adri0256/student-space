import { useMemo } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../features/auth/authSlice";

export const useAuth = () => {
    const user = useSelector(selectUser);

    return useMemo(() => ({ user }), [user]);
};
