<template>
    <div>
        <h1>Lps and Contracts</h1>
        <div v-if="loading">Loading...</div>
        <div v-else>
            <p v-if="error">Error: {{ error }}</p>
            <table v-else>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Full Name</th>
                        <th>Contracts</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="lp in lpsAndContracts" :key="lp.id">
                        <td>{{ lp.id }}</td>
                        <td>{{ lp.full_name }}</td>
                        <td>
                            <table>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Since</th>
                                        <th>Till</th>
                                        <th>Low Premium</th>
                                        <th>Medium Premium</th>
                                        <th>High Premium</th>
                                        <th>Low Payment</th>
                                        <th>Medium Payment</th>
                                        <th>High Payment</th>
                                        <th>Agent</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="contract in lp.contracts" :key="contract.id">
                                        <td>{{ contract.id }}</td>
                                        <td>{{ contract.since }}</td>
                                        <td>{{ contract.till }}</td>
                                        <td>{{ contract.low_premium }}</td>
                                        <td>{{ contract.medium_premium }}</td>
                                        <td>{{ contract.high_premium }}</td>
                                        <td>{{ contract.low_payment }}</td>
                                        <td>{{ contract.medium_payment }}</td>
                                        <td>{{ contract.high_payment }}</td>
                                        <td>{{ contract.agent }}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
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
                lpsAndContracts: [],
                loading: false,
                error: null
            };
        },
        mounted() {
            this.fetchLpsAndContracts();
        },
        methods: {
            fetchLpsAndContracts() {
                this.loading = true;
                this.error = null;
                const token = localStorage.getItem('token');
                const url = 'http://localhost:8000/api/lps-and-contracts/';

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
                        this.lpsAndContracts = data;
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
