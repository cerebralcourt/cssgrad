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
@tailwind components;
@tailwind utilities;

#app {
    padding: 10vh;
}

.container {
    margin-bottom: 9vh;
    padding: 0 !important;
}
</style>
