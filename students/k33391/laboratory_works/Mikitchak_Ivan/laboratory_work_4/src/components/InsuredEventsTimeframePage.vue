<template>
    <div>
        <h1>Insured Events Timeframe</h1>
        <form @submit.prevent="fetchEventsTimeframe">
            <label for="since">Since:</label>
            <input type="date" id="since" v-model="since" required>
            <label for="till">Till:</label>
            <input type="date" id="till" v-model="till" required>
            <button type="submit">Search</button>
        </form>
        <div v-if="loading">Loading...</div>
        <div v-else>
            <p v-if="error">Error: {{ error }}</p>
            <div v-if="eventsTimeframe">
                <table>
                    <thead>
                        <tr>
                            <th>Natural Contracts Payments</th>
                            <th>Legal Contracts Payments</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{{ eventsTimeframe.natural_contracts_payments }}</td>
                            <td>{{ eventsTimeframe.legal_contracts_payments }}</td>
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
                since: null,
                till: null,
                eventsTimeframe: null,
                loading: false,
                error: null
            };
        },
        methods: {
            fetchEventsTimeframe() {
                this.loading = true;
                this.error = null;
                const token = localStorage.getItem('token');
                const url = `http://localhost:8000/api/insured-events-timeframe/`;
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
                        this.eventsTimeframe = data;
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
