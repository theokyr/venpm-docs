import DefaultTheme from "vitepress/theme";
import CustomLayout from "./CustomLayout.vue";
import ShowcaseLayout from "./layouts/showcase.vue";
import "./custom.css";

export default {
    extends: DefaultTheme,
    Layout: CustomLayout,
    enhanceApp({ app }) {
        app.component("showcase", ShowcaseLayout);
    },
};
