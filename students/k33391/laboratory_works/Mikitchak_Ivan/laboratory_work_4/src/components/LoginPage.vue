<template>
    <div>
        <h2>Login</h2>
        <form @submit.prevent="login">
            <div>
                <label for="username">Username:</label>
                <input type="text" id="username" v-model="formData.username" required />
            </div>
            <div>
                <label for="password">Password:</label>
                <input type="password" id="password" v-model="formData.password" required />
            </div>
            <button type="submit">Login</button>
        </form>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                formData: {
                    username: '',
                    password: ''
                }
            };
        },
        methods: {
            async login() {
                try {
                    const response = await fetch('http://localhost:8000/api/auth/token/login/', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(this.formData)
                    });
                    if (!response.ok) {
                        throw new Error('Failed to login');
                    }
                    const data = await response.json();
                    const token = data.auth_token;
                    // Save the authentication token to local storage
                    localStorage.setItem('token', token);
                    this.$router.push('/home');
                } catch (error) {
                    console.error('Login failed:', error.message);
                }
            }
        }
    };
</script>
