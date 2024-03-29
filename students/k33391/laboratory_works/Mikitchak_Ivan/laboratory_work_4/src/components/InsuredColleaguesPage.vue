<template>
    <div>
        <h1>Insured Colleagues List</h1>
        <form @submit.prevent="fetchColleagues">
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
                        <th>Age</th>
                        <th>Risk Category</th>
                        <th>Contract</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="colleague in colleagues" :key="colleague.id">
                        <td>{{ colleague.id }}</td>
                        <td>{{ colleague.full_name }}</td>
                        <td>{{ colleague.age }}</td>
                        <td>{{ colleague.risk_category }}</td>
                        <td>{{ colleague.contract }}</td>
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
                colleagues: [],
                loading: false,
                error: null
            };
        },
        methods: {
            fetchColleagues() {
                this.loading = true;
                this.error = null;
                const token = localStorage.getItem('token');
                const url = `http://localhost:8000/api/insured-colleagues/${this.pk}/`;

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
                        this.colleagues = data;
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
