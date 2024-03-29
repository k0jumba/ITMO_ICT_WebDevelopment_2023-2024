<template>
    <div>
        <h1>Agent Contracts Stats</h1>
        <form @submit.prevent="fetchStats">
            <label for="pk">PK:</label>
            <input type="number" id="pk" v-model="pk" required>
            <label for="since">Since:</label>
            <input type="date" id="since" v-model="since" required>
            <label for="till">Till:</label>
            <input type="date" id="till" v-model="till" required>
            <button type="submit">Search</button>
        </form>
        <div v-if="loading">Loading...</div>
        <div v-else>
            <p v-if="error">Error: {{ error }}</p>
            <div v-if="stats">
                <table>
                    <thead>
                        <tr>
                            <th>Natural Person Contracts Count</th>
                            <th>Legal Person Contracts Count</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{{ stats.natural_person_contracts_count }}</td>
                            <td>{{ stats.legal_person_contracts_count }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                pk: null,
                since: null,
                till: null,
                stats: null,
                loading: false,
                error: null
            };
        },
        methods: {
            fetchStats() {
                this.loading = true;
                this.error = null;
                const token = localStorage.getItem('token');
                const url = `http://localhost:8000/api/agent-contracts-stats/${this.pk}/`;
                const query_params = `?since=${this.since}&till=${this.till}`


                fetch(url + query_params, {
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
                        this.stats = data;
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
