import { auth } from "@/firebase/config";
import { ref } from "vue";

let error = ref(null);

let logIn = async (email, password) => {
    error.value = null;
    try {
        let response = await auth.signInWithEmailAndPassword(email, password);
        if (!response) throw new Error("Something went wrong. Try Again!");
        return response;
    } catch (err) {
        switch (err.code) {
            case 'auth/too-many-requests':
                error.value = "Warning: Multiple failed login attempts detected. This may prevent access with correct credentials. Please try again after some time.";
                break;
            case "auth/invalid-email":
                error.value = "Invalid email format.";
                break;
            case "auth/user-not-found":
                error.value = "No user found with this email.";
                break;
            case "auth/wrong-password":
                error.value = "Incorrect password.";
                break;
            default:
                error.value = "Invalid email or password.";
        }
        return null;
    }
};

let useSignIn = () => {
    return { error, logIn };
};

export default useSignIn;