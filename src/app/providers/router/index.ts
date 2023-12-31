import { createRouter, createWebHistory } from "vue-router";
import { DashboardView } from "@/pages/dashboard";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "dashboard",
            component: DashboardView,
        },
        {
            path: "/:catchAll(.*)",
            redirect: "/",
        },
    ],
});

export default router;
