<template>
    <div>
        <h1>Create Agent</h1>
        <form @submit.prevent="submitForm">
            <label for="full_name">Full Name:</label>
            <input type="text" id="full_name" v-model="agent.full_name" required>
            <label for="passport_data">Passport Data:</label>
            <input type="text" id="passport_data" v-model="agent.passport_data" required>
            <label for="contact_data">Contact Data:</label>
            <input type="text" id="contact_data" v-model="agent.contact_data" required>
            <button type="submit">Submit</button>
        </form>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                agent: {
                    full_name: '',
                    passport_data: '',
                    contact_data: ''
                }
            };
        },
        methods: {
            async submitForm() {
                try {
                    const token = localStorage.getItem('token');
                    if (!token) {
                        throw new Error('No token found');
                    }
                    const response = await fetch('http://localhost:8000/api/agents/', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Token ${token}`
                        },
                        body: JSON.stringify(this.agent)
                    });
                    if (!response.ok) {
                        throw new Error('Failed to create agent');
                    }
                    // Redirect to agents list page
                    this.$router.push('/home/agents/');
                } catch (error) {
                    console.error(error);
                }
            }
        }
    };
</script>
