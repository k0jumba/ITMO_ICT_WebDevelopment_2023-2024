<template>
    <div>
        <h2>Agent Details</h2>
        <table v-if="agent">
            <tbody>
                <tr v-for="(value, key) in agent" :key="key">
                    <td>{{ key }}</td>
                    <td>
                        <template v-if="editing && key !== 'id'">
                            <input type="text" v-model="editedAgent[key]">
                        </template>
                        <template v-else>
                            {{ value }}
                        </template>
                    </td>
                </tr>
            </tbody>
        </table>
        <div v-if="!editing">
            <button @click="edit">Edit</button>
        </div>
        <div v-else>
            <button @click="cancelEdit">Cancel</button>
            <button @click="saveEdit">Save</button>
        </div>
        <div>
            <button @click="deleteAgent">Delete</button>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            pk: {
                type: Number,
                required: true
            }
        },
        data() {
            return {
                agent: null,
                editedAgent: {},
                editing: false
            };
        },
        async created() {
            await this.fetchAgent();
        },
        methods: {
            async fetchAgent() {
                try {
                    const token = localStorage.getItem('token');
                    if (!token) {
                        throw new Error('No token found');
                    }
                    const response = await fetch(`http://localhost:8000/api/agents/${this.pk}/`, {
                        method: 'GET',
                        headers: {
                            'Authorization': `Token ${token}`
                        }
                    });
                    if (!response.ok) {
                        throw new Error('Failed to fetch agent');
                    }
                    const data = await response.json();
                    this.agent = data;
                    this.editedAgent = { ...data };
                } catch (error) {
                    console.error(error);
                }
            },
            edit() {
                this.editing = true;
            },
            cancelEdit() {
                this.editing = false;
                this.editedAgent = { ...this.agent };
            },
            async saveEdit() {
                try {
                    const token = localStorage.getItem('token');
                    if (!token) {
                        throw new Error('No token found');
                    }
                    const response = await fetch(`http://localhost:8000/api/agents/${this.pk}/`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Token ${token}`
                        },
                        body: JSON.stringify(this.editedAgent)
                    });
                    if (!response.ok) {
                        throw new Error('Failed to save changes');
                    }
                    this.agent = { ...this.editedAgent };
                    this.editing = false;
                } catch (error) {
                    console.error(error);
                }
            },
            async deleteAgent() {
                try {
                    const token = localStorage.getItem('token');
                    if (!token) {
                        throw new Error('No token found');
                    }
                    const response = await fetch(`http://localhost:8000/api/agents/${this.pk}/`, {
                        method: 'DELETE',
                        headers: {
                            'Authorization': `Token ${token}`
                        }
                    });
                    if (!response.ok) {
                        throw new Error('Failed to delete agent');
                    }
                    // Redirect to agents list page
                    this.$router.push('/home/agents');
                } catch (error) {
                    console.error(error);
                }
            }
        }
    };
</script>
