import { signIn, signUp, signOut } from '../lib/auth-client';

const AuthService = {
    login: async (email, password) => {
        return await signIn.email({
            email,
            password,
        });
    },
    register: async (email, password, name) => {
        return await signUp.email({
            email,
            password,
            name,
        });
    },
    logout: async () => {
        return await signOut();
    }
};

export default AuthService;
