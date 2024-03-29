<template>
    <div>
        <h2>Registration</h2>
        <form @submit.prevent="register">
            <div>
                <label for="username">Username:</label>
                <input type="text" id="username" v-model="formData.username" required />
            </div>
            <div>
                <label for="email">Email:</label>
                <input type="email" id="email" v-model="formData.email" required />
            </div>
            <div>
                <label for="password">Password:</label>
                <input type="password" id="password" v-model="formData.password" required />
            </div>
            <button type="submit">Register</button>
        </form>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                formData: {
                    username: '',
                    email: '',
                    password: ''
                }
            };
        },
        methods: {
            async register() {
                try {
                    const response = await fetch('http://localhost:8000/api/auth/users/', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(this.formData)
                    });
                    if (!response.ok) {
                        throw new Error('Failed to register');
                    }
                    this.$router.push('/login');
                } catch (error) {
                    console.error('Registration failed:', error.message);
                }
            }
        }
    };
</script>
