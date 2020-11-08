<template>
    <div id="app" class="p-8 lg:p-20 h-screen flex flex-col" :style="css">
        <div></div>
        <slider class="mt-auto" />
    </div>
</template>

<script>
import Slider from "@/components/Slider"

export default {
    name: "App",
    components: {
        Slider,
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
@tailwind components;
@tailwind utilities;
</style>
