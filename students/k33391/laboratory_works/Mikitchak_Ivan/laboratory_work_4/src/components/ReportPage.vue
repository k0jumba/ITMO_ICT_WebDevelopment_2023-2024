<template>
    <div>
        <h1>Agent Report</h1>
        <div v-if="loading">Loading...</div>
        <div v-else>
            <p v-if="error">Error: {{ error }}</p>
            <table v-else>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Full Name</th>
                        <th>Natural Contracts Count</th>
                        <th>Natural Contracts Premium</th>
                        <th>Natural Contracts Payment</th>
                        <th>Legal Contracts Count</th>
                        <th>Legal Contracts Low Premium</th>
                        <th>Legal Contracts Medium Premium</th>
                        <th>Legal Contracts High Premium</th>
                        <th>Legal Contracts Low Payment</th>
                        <th>Legal Contracts Medium Payment</th>
                        <th>Legal Contracts High Payment</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="agent in agents" :key="agent.id">
                        <td>{{ agent.id }}</td>
                        <td>{{ agent.full_name }}</td>
                        <td>{{ agent.natural_contracts_count }}</td>
                        <td>{{ agent.natural_contracts_premium }}</td>
                        <td>{{ agent.natural_contracts_payment }}</td>
                        <td>{{ agent.legal_contracts_count }}</td>
                        <td>{{ agent.legal_contracts_low_premium }}</td>
                        <td>{{ agent.legal_contracts_medium_premium }}</td>
                        <td>{{ agent.legal_contracts_high_premium }}</td>
                        <td>{{ agent.legal_contracts_low_payment }}</td>
                        <td>{{ agent.legal_contracts_medium_payment }}</td>
                        <td>{{ agent.legal_contracts_high_payment }}</td>
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
                agents: [],
                loading: false,
                error: null
            };
        },
        mounted() {
            this.fetchAgentReport();
        },
        methods: {
            fetchAgentReport() {
                this.loading = true;
                this.error = null;
                const token = localStorage.getItem('token');
                const url = 'http://localhost:8000/api/report/';

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
                        this.agents = data;
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
