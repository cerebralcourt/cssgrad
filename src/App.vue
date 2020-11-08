<template>
    <div id="app" class="h-screen" :style="css">
        
    </div>
</template>

<script>
export default {
    name: "App",
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
