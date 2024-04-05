import "./bootstrap";
import "../css/app.css";

import { createApp, h } from "vue";
import { createInertiaApp } from "@inertiajs/vue3";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import { ZiggyVue } from "../../vendor/tightenco/ziggy/dist/vue.m";
import { router } from "@inertiajs/vue3";

const appName = import.meta.env.VITE_APP_NAME || "Laravel";

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.vue`,
            import.meta.glob("./Pages/**/*.vue")
        ),
    setup({ el, App, props, plugin }) {
        return createApp({ render: () => h(App, props) })
            .use(plugin)
            .use(ZiggyVue)
            .mount(el);
    },
    progress: {
        color: "#4B5563",
    },
});

// let stale = false;

// // Listen for popstate event (back button)
// window.addEventListener("popstate", () => {
//     stale = true;
//     refreshDashboard();
// });

// // Listen for navigation events triggered by Inertia Links
// router.on("navigate", (event) => {
//     if (stale) {
//         router.get(
//             event.detail.page.url,
//             {},
//             { replace: true, preserveState: false }
//         );
//         stale = false;
//     }
// });

// // Function to refresh the dashboard and reorder decks
// function refreshDashboard() {
//     // Perform an Inertia visit to reload the dashboard page
//     router.visit(route("dashboard"), {
//         replace: true,
//         preserveScroll: true,
//     });
// }

// // Call refreshDashboard function when the page initially loads
// window.addEventListener("load", () => {
//     refreshDashboard();
// });
