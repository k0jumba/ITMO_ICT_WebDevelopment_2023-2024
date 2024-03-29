import { createRouter, createWebHistory } from 'vue-router';
import LoginPage from './components/LoginPage.vue';
import RegistrationPage from './components/RegistrationPage.vue';
import HomePage from './components/HomePage.vue';
import AgentContractsStatsPage from './components/AgentContractsStatsPage.vue';
import InsuredColleaguesPage from './components/InsuredColleaguesPage.vue';
import InsuredEventsTimeframePage from './components/InsuredEventsTimeframePage.vue';
import LpsAndContractsPage from './components/LpsAndContractsPage.vue';
import ReportPage from './components/ReportPage.vue';
import SameAgentsLpsPage from './components/SameAgentsLpsPage.vue';
import AgentCreationPage from './components/AgentCreationPage.vue';
import AgentDetailPage from './components/AgentDetailPage.vue';
import AgentsListPage from './components/AgentsListPage.vue';

const routes = [
    { path: '/login', component: LoginPage },
    { path: '/register', component: RegistrationPage },
    {
        path: '/home',
        component: HomePage,
        children: [
            { path: 'agent-contracts-stats', component: AgentContractsStatsPage },
            { path: 'insured-colleagues', component: InsuredColleaguesPage },
            { path: 'insured-events-timeframe', component: InsuredEventsTimeframePage },
            { path: 'lps-and-contracts', component: LpsAndContractsPage },
            { path: 'report', component: ReportPage },
            { path: 'same-agents-lps', component: SameAgentsLpsPage },
            { path: 'agents', component: AgentsListPage },
            { path: 'create-agent', component: AgentCreationPage },
            { path: 'agents/:pk', component: AgentDetailPage, props: true, name: 'AgentDetails'}
        ]
    },
    { path: '/:catchAll(.*)', redirect: '/login' } // Redirect to login page if route not found
];

const router = createRouter({
    history: createWebHistory(),
    routes: routes
});

export default router;
