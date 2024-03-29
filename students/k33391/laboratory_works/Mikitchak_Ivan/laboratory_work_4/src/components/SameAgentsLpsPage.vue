<template>
    <div>
        <h1>Same Agents Legal Persons</h1>
        <form @submit.prevent="fetchLps">
            <label for="pk">PK:</label>
            <input type="number" id="pk" v-model.number="pk" required>
            <button type="submit">Search</button>
        </form>
        <div v-if="loading">Loading...</div>
        <div v-else>
            <p v-if="error">Error: {{ error }}</p>
            <table v-else>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Full Name</th>
                        <th>Short Name</th>
                        <th>Address</th>
                        <th>Bank Credentials</th>
                        <th>Specialization</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="lp in lps" :key="lp.id">
                        <td>{{ lp.id }}</td>
                        <td>{{ lp.full_name }}</td>
                        <td>{{ lp.short_name }}</td>
                        <td>{{ lp.address }}</td>
                        <td>{{ lp.bank_credentials }}</td>
                        <td>{{ lp.specialization }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                pk: null,
                lps: [],
                loading: false,
                error: null
            };
        },
        methods: {
            fetchLps() {
                this.loading = true;
                this.error = null;
                const token = localStorage.getItem('token');
                const url = `http://localhost:8000/api/same-agents-lps/${this.pk}/`;

                fetch(url, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Token ${token}`,
                        'Content-Type': 'application/json'
                    }
                })
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Failed to fetch');
                        }
                        return response.json();
                    })
                    .then(data => {
                        this.lps = data;
                        this.loading = false;
                    })
                    .catch(error => {
                        this.error = error.message;
                        this.loading = false;
                    });
            }
        }
    };
</script>
