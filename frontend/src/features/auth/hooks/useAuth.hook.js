import { setUser, setError, setLoading } from "../auth.slice";
import { register, login } from "../services/auth.api";
import { useDispatch } from "react-redux";

export const useAuth = () => {
    const dispatch = useDispatch();

    async function handleRegister({ email, password, contact, fullName, isSeller = false }) {
        dispatch(setLoading(true));
        try {
            const response = await register({ email, password, contact, fullName, isSeller });
            if (response?.user) {
                dispatch(setUser(response.user));
            }
            return response;
        }
        catch (err) {
            const message = err?.response?.data?.message || err?.message || "Registration failed.";
            dispatch(setError(message));
            throw new Error(message);
        }
        finally {
            dispatch(setLoading(false));
        }
    }

    async function handleLogin({ email, password }) {
        dispatch(setLoading(true));
        try {
            const response = await login({ email, password });
            if (response?.user) {
                dispatch(setUser(response.user));
            }
            return response;
        }
        catch (err) {
            const message = err?.response?.data?.message || err?.message || "Login failed.";
            dispatch(setError(message));
            throw new Error(message);
        }
        finally {
            dispatch(setLoading(false));
        }
    }

    return {
        handleRegister,
        handleLogin
    };
};