<template>
    <div>
        <!-- Login Form -->
        <section class="form mt-8">
            <div class="container">
                <div class="row">
                    <div class="col-md-5 offset-md-4">
                        <div class="card">
                            <div class="card-body p-3">
                                <ATALOGO />
                                <p class="mt-2 text-center text-muted">Email - emotion@ata.it.th | Password - ata2024
                                </p>
                                <div>
                                    <form @submit.prevent="signIn" novalidate>
                                        <div class="mb-3">
                                            <label for="username" class="form-label">Email <span
                                                    class="text-danger">*</span></label>
                                            <input autocomplete="off" v-model="email" type="text"
                                                :class="{ 'is-invalid': showError('email') }" class="form-control"
                                                placeholder="Email" id="username">
                                            <div class="invalid-feedback">Email is required</div>
                                        </div>
                                        <div class="password mb-3">
                                            <label class="form-label">Password <span
                                                    class="text-danger">*</span></label>
                                            <input v-model="password" :type="isVisible ? 'text' : 'password'"
                                                placeholder="password" :class="{ 'is-invalid': showError('password') }"
                                                class="form-control">
                                            <span @click="isVisible = !isVisible"
                                                :class="{ move: showError('password') }"
                                                class="material-symbols-outlined eye">{{ isVisible ? 'visibility' :
                                                    'visibility_off' }}</span>
                                            <div class="invalid-feedback">Password is required</div>
                                        </div>
                                        <button type="submit" class="btn text-white btn-primary w-100 py-2 fw-bold"
                                            :disabled="loading || lockout">
                                            <span v-if="loading"
                                                class="spinner-border text-white spinner-border-sm me-3" role="status"
                                                aria-hidden="true"></span>
                                            Login
                                        </button>
                                        <p v-if="lockout" class="text-danger text-center fw-bold fs-6 mt-3">{{
                                            lockoutMessage }}</p>
                                        <p v-if="isError && !lockout" class="text-danger text-center fw-bold fs-6 mt-3">
                                            {{ errorMessage }}</p>
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
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import useSignIn from "@/composables/auth/useSignIn";
import ATALOGO from "@/components/logo/ATALOGO.vue";

export default {
    components: {
        ATALOGO
    },
    setup() {
        const router = useRouter();
        const email = ref("");
        const password = ref("");
        const isVisible = ref(false);
        const isError = ref(false);
        const loading = ref(false);
        const touchedFields = ref({});
        const attemptCount = ref(0);
        const lockout = ref(false);
        const lockoutTime = ref(0);
        const lockoutLevel = ref(0); // Tracks the lockout stage (1 = 1 min, 2 = 3 min, 3 = 15 min)
        const lockoutTimer = ref(null);
        const errorMessage = ref("");
        const { error, logIn } = useSignIn();

        const showError = (field) => touchedFields.value[field] && !eval(field).value;

        const lockoutDurations = [0, 60, 180, 900]; // Lockout times for levels (in seconds)

        // Lockout message based on time
        const lockoutMessage = computed(() => {
            return lockoutTime.value > 60
                ? `Too many requests. Please wait ${Math.ceil(lockoutTime.value / 60)} minutes before trying again.`
                : `Too many requests. Please wait ${lockoutTime.value} seconds before trying again.`;
        });

        const startLockout = () => {
            lockoutLevel.value = Math.min(lockoutLevel.value + 1, 3); // Max level is 3 (15 minutes)
            lockoutTime.value = lockoutDurations[lockoutLevel.value];
            lockout.value = true;

            lockoutTimer.value = setInterval(() => {
                lockoutTime.value--;
                if (lockoutTime.value <= 0) {
                    clearInterval(lockoutTimer.value);
                    lockout.value = false;
                    saveLockoutData(); // Update storage to mark end of lockout
                } else {
                    saveLockoutData(); // Save updated lockout data to localStorage
                }
            }, 1000);
        };

        const saveLockoutData = () => {
            localStorage.setItem("lockoutData", JSON.stringify({
                attemptCount: attemptCount.value,
                lockoutLevel: lockoutLevel.value,
                lockoutTime: lockoutTime.value,
                lockoutStartTime: Date.now()
            }));
        };

        const loadLockoutData = () => {
            const lockoutData = JSON.parse(localStorage.getItem("lockoutData"));
            if (lockoutData) {
                const elapsed = Math.floor((Date.now() - lockoutData.lockoutStartTime) / 1000);
                const remainingLockoutTime = lockoutData.lockoutTime - elapsed;

                attemptCount.value = lockoutData.attemptCount;
                lockoutLevel.value = lockoutData.lockoutLevel;

                if (remainingLockoutTime > 0) {
                    lockoutTime.value = remainingLockoutTime;
                    lockout.value = true;
                    lockoutTimer.value = setInterval(() => {
                        lockoutTime.value--;
                        if (lockoutTime.value <= 0) {
                            clearInterval(lockoutTimer.value);
                            lockout.value = false;
                            saveLockoutData(); // Clear lockout data when timer ends
                        }
                    }, 1000);
                }
            }
        };

        const signIn = async () => {
            touchedFields.value = { email: true, password: true };
            isError.value = false;
            error.value = null;

            if (email.value && password.value) {
                loading.value = true;

                if (lockout.value) return;

                const res = await logIn(email.value, password.value);

                if (res) {
                    router.push("/admin");
                    isError.value = false;
                    attemptCount.value = 0;
                    lockoutLevel.value = 0;
                    localStorage.removeItem("lockoutData");
                } else {
                    isError.value = true;
                    attemptCount.value++;

                    if ((lockoutLevel.value === 0 && attemptCount.value >= 3) ||
                        (lockoutLevel.value === 1 && attemptCount.value >= 5) ||
                        (lockoutLevel.value >= 2)) {
                        errorMessage.value = "Too many requests. Please try again later.";
                        startLockout();
                    } else {
                        errorMessage.value = error.value;
                    }
                }
                loading.value = false;
            }
        };

        onMounted(loadLockoutData);

        return { signIn, isVisible, email, password, errorMessage, lockoutMessage, lockout, showError, isError, loading, error };
    }
};
</script>