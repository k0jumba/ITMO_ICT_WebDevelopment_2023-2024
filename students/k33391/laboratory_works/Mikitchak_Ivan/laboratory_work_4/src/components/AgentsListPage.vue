<template>
    <div>
        <h1>Agents</h1>
        <router-link to="/home/create-agent">Create</router-link>
        <table v-if="agents">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Full Name</th>
                    <th>Passport Data</th>
                    <th>Contact Data</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="agent in agents" :key="agent.id">
                    <td>{{ agent.id }}</td>
                    <td>{{ agent.full_name }}</td>
                    <td>{{ agent.passport_data }}</td>
                    <td>{{ agent.contact_data }}</td>
                    <td>
                        <router-link :to="{ name: 'AgentDetails', params: { pk: agent.id }}">Details</router-link>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                agents: []
            };
        },
        created() {
            this.fetchAgents();
        },
        methods: {
            async fetchAgents() {
                try {
                    const token = localStorage.getItem('token');
                    if (!token) {
                        throw new Error('No token found');
                    }
                    const response = await fetch('http://localhost:8000/api/agents/', {
                        method: 'GET',
                        headers: {
                            'Authorization': `Token ${token}`
                        }
                    });
                    if (!response.ok) {
                        throw new Error('Failed to fetch agents');
                    }
                    const data = await response.json();
                    this.agents = data;
                } catch (error) {
                    console.error(error);
                }
            }
        }
    };
</script>
