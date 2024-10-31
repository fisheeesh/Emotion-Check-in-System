<template>
    <div>
        <!-- Navbar -->
        <nav class="navbar navbar-expand-lg fixed-top navbar-dark px-3 shadow-sm">
            <div class="container-fluid">
                <a href="" class="navbar-brand">
                    <img src="../../assets/images/full-logo.png" alt="" width="225">
                </a>
            </div>
        </nav>

        <!-- Login Form -->
        <section class="form mt-8">
            <div class="container">
                <div class="row">
                    <div class="col-5 offset-4">
                        <div class="card">
                            <div class="card-body p-3">
                                <div>
                                    <h3 class="fw-bold">Login Here</h3>
                                    <p class="text-muted">Email - emotion@ata.it.th | Password - ata2024</p>
                                </div>
                                <div>
                                    <form @submit.prevent="signIn" novalidate>
                                        <div class="mb-3">
                                            <label for="username" class="form-label">Email <span
                                                    class="text-danger">*</span></label>
                                            <input autocomplete="off" @keydown.enter.prevent v-model="email" type="text"
                                                :class="{ 'is-invalid': showError('email') }" class="form-control"
                                                placeholder="Email" id="username">
                                            <div class="invalid-feedback">
                                                Email is required
                                            </div>
                                        </div>
                                        <div class="password mb-3">
                                            <label class="form-label">Password <span
                                                    class="text-danger">*</span></label>
                                            <input @keydown.enter.prevent v-model="password"
                                                :type="isVisible ? 'text' : 'password'" placeholder="password"
                                                :class="{ 'is-invalid': showError('password') }" class="form-control">
                                            <span :class="{ 'move': showError('password') }"
                                                @click="isVisible = !isVisible" class="material-symbols-outlined eye">
                                                {{ isVisible ? 'visibility' : 'visibility_off' }}
                                            </span>
                                            <div class="invalid-feedback">
                                                Password is required
                                            </div>
                                        </div>
                                        <button type="submit" class="btn btn-outline-primary w-100 py-2 fw-bold"
                                            :disabled="loading || lockout">
                                            <span v-if="loading"
                                                class="spinner-border text-white spinner-border-sm me-3" role="status"
                                                aria-hidden="true"></span>
                                            Login
                                        </button>
                                        <!-- Display Lockout Message if Lockout is Active -->
                                        <p v-if="lockout" class="text-danger text-center fw-bold fs-6 mt-3">
                                            {{ lockoutMessage }}
                                        </p>

                                        <!-- Display General Error Message -->
                                        <p v-if="isError && !lockout" class="text-danger text-center fw-bold fs-6 mt-3">
                                            {{ error }}
                                        </p>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import useSignIn from "@/composables/auth/useSignIn";
import { ref, computed } from "vue";
import { useRouter } from "vue-router";

export default {
    setup() {
        const router = useRouter();

        let email = ref("");
        let password = ref("");
        let isVisible = ref(false);
        let isError = ref(false);
        let loading = ref(false);
        let touchedFields = ref({});
        let attemptCount = ref(0);           // Track login attempts
        let lockout = ref(false);            // Lockout state
        let lockoutTime = ref(60);           // Initial lockout time in seconds
        let lockoutTimer = null;             // Timer for lockout countdown
        let errorMessage = ref("");          // To display error messages

        let { error, logIn } = useSignIn();

        let showError = (field) => touchedFields.value[field] && !eval(field).value;

        // Computed property for lockout message
        let lockoutMessage = computed(() =>
            lockoutTime.value > 60
                ? `Please wait ${Math.ceil(lockoutTime.value / 60)} minutes before trying again.`
                : `Too many requests. Please wait ${lockoutTime.value} seconds.`
        );

        let startLockoutTimer = (time) => {
            lockoutTime.value = time;
            lockout.value = true;

            lockoutTimer = setInterval(() => {
                lockoutTime.value--;
                if (lockoutTime.value <= 0) {
                    clearInterval(lockoutTimer);
                    lockout.value = false;
                    attemptCount.value = 0; // Reset attempt count
                }
            }, 1000);
        };

        let signIn = async () => {
            touchedFields.value = { email: true, password: true };
            isError.value = false;
            error.value = null;

            if (email.value && password.value) {
                loading.value = true;

                if (lockout.value) return; // Prevent login during lockout

                let res = await logIn(email.value, password.value);

                if (res) {
                    console.log("Logged In Successfully!", res.user.displayName);
                    router.push("/admin");
                    isError.value = false;
                    attemptCount.value = 0; // Reset attempts on success
                } else {
                    isError.value = true;
                    attemptCount.value++;

                    if (attemptCount.value > 3) {
                        errorMessage.value = "Too many requests. Please try again after 1 minute.";
                        startLockoutTimer(60);  // Start a 1-minute lockout
                    } else {
                        errorMessage.value = error.value;
                    }
                }
                loading.value = false;
            }
        };

        return { signIn, isVisible, email, password, errorMessage, lockoutMessage, lockout, showError, isError, loading, error };
    },
};
</script>