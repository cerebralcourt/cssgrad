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
    @apply absolute bottom-0 bg-white w-1/2 z-10;
    height: 2px;
    left: 0%;
    transition: left 350ms ease-in-out;
}

.tab-underline.active {
    left: 50%;
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
