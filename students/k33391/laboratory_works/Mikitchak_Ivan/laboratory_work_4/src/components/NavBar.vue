<template>
    <nav>
        <router-link v-for="route in routes" :key="route.path" :to="route.path">
            {{ route.name }}
        </router-link>
        <button @click="logout">Log out</button>
    </nav>
</template>

<script>
    export default {
        data() {
            return {
                routes: [
                    { path: '/home/agents/', name: 'Agents' },
                    { path: '/home/agent-contracts-stats/', name: 'Agents Contracts Stats' },
                    { path: '/home/insured-colleagues/', name: 'Insured Colleagues' },
                    { path: '/home/insured-events-timeframe/', name: 'Insured Events Timeframe' },
                    { path: '/home/lps-and-contracts/', name: 'Lps And Contracts' },
                    { path: '/home/report/', name: 'Report' },
                    { path: '/home/same-agents-lps/', name: 'Same Agents Lps' }
                ]
            };
        },
        methods: {
            async logout() {
                try {
                    const token = localStorage.getItem('token');
                    if (!token) {
                        throw new Error('No token found');
                    }
                    const response = await fetch('http://localhost:8000/api/auth/token/logout/', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Token ${token}`
                        }
                    });
                    if (!response.ok) {
                        throw new Error('Failed to logout');
                    }
                    localStorage.removeItem('token');
                    this.$router.push('/login');
                } catch (error) {
                    console.error(error);
                }
            }
        }
    };
</script>
