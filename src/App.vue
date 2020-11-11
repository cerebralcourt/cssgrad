<template>
    <div id="app" class="h-screen" :style="css">
        <div class="hidden sm:block flex flex-col">
            <div class="app-container flex justify-between flex-grow">
                <left-widget />
                <right-widget />
            </div>
            <slider />
        </div>
        <div class="text-xl text-white sm:hidden w-full h-full flex justify-center items-center">
            <p class="text-center text-shadow">
                Sorry! Your screen size is too small to use this application.
            </p>
        </div>
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
@tailwind components;
@tailwind utilities;

#app {
    padding: 10vh;
}

.app-container {
    margin-bottom: 9vh;
    padding: 0 !important;
}

.text-shadow {
    text-shadow: 1px 1px 1px black;
}
</style>
