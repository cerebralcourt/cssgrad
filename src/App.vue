<template>
    <div id="app" class="h-screen flex flex-col" :style="css">
        <div class="container flex justify-between flex-grow">
            <left-widget />
            <right-widget />
        </div>
        <slider />
    </div>
</template>

<script>
import Slider from "@/components/Slider"
import LeftWidget from "@/components/LeftWidget"
import RightWidget from "@/components/RightWidget"

export default {
    name: "App",
    components: {
        Slider,
        LeftWidget,
        RightWidget,
    },
    computed: {
        css() {
            return this.$store.getters.css
        },
    },
    mounted() {
        import("node-waves").then(mod => {
            const Waves = mod.default
            Waves.init()
        })
    },
}
</script>

<style lang="postcss">
@tailwind base;

#app {
    padding: 10vh;
}

@tailwind components;

.container {
    margin-bottom: 9vh;
    padding: 0 !important;
}

.widget {
    @apply rounded border-b-2 border-gray-500 shadow-lg h-full inline-block overflow-x-hidden;
    background: linear-gradient(to bottom, theme("colors.gray.500"), theme("colors.gray.600"))
}

.tab {
    @apply w-1/2 px-5 py-2 transition-colors duration-300;
}

.tab-underline {
    @apply absolute left-0 bottom-0 bg-white w-1/2 z-10;
    height: 2px;
    transition: left 350ms ease-in;
}

.tab-underline:not(.active) {
    animation: underline-left 350ms ease-in-out alternate;
}

.tab-underline.active {
    left: 50%;
    animation: underline-right 350ms ease-in-out alternate;
}

@keyframes underline-left {
    from {
        width: 50%;
    }

    to {
        width: 70%;
    }
}

@keyframes underline-right {
    from {
        width: 50%;
    }

    to {
        width: 70%;
    }
}

.tab-container {
    width: 200%;
    transform: translateX(0);
    transition: transform 350ms ease-in-out;
}

.tab-container.active {
    transform: translateX(-50%);
}

@tailwind utilities;
</style>
