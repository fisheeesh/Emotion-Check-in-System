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
                            <div class="car-body p-3">
                                <div>
                                    <h3 class="fw-bold">Login Here</h3>
                                    <p class="text-muted">Email - admin@ata.it.th | Password - password</p>
                                </div>
                                <div>
                                    <form @submit.prevent="signIn" novalidate>
                                        <div class="mb-3">
                                            <label for="username" class="form-label">Email <span
                                                    class="text-danger">*</span></label>
                                            <input @keydown.enter.prevent v-model="email" type="text"
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
                                            :disabled="loading">
                                            <span v-if="loading" class="spinner-border text-white spinner-border-sm me-3"
                                                role="status" aria-hidden="true"></span>
                                            Login
                                        </button>
                                        <p v-if="isError" class="text-danger text-center fw-bold fs-6 mt-3">{{ error }}
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
import useSignIn from '@/composables/auth/useSignIn';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

export default {
    setup() {
        const router = useRouter(); //this.$router

        let email = ref('');
        let password = ref('');
        let isVisible = ref(false);
        let isError = ref(false);
        let loading = ref(false);

        let touchedFields = ref({});

        let showError = (field) => touchedFields.value[field] && !eval(field).value;

        let { error, logIn } = useSignIn();

        let signIn = async () => {
            touchedFields.value = {
                email: true,
                password: true
            };

            if (email.value && password.value) {
                loading.value = true;
                let res = await logIn(email.value, password.value);

                if (res) {
                    console.log('Logged In Successfully!', res.user.displayName);
                    router.push('/admin');
                    isError.value = false;
                } else {
                    isError.value = true;
                }
                loading.value = false;
            }
        };

        return { signIn, isVisible, email, password, error, showError, isError, loading };
    }
}
</script>