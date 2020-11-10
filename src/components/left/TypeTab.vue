<template>
    <div class="flex text-white mb-4">
        <button
            class="rounded-l w-1/2 text-center py-1 transition-all duration-300 waves-effect waves-light"
            :class="type === 'linear' && 'active border-r border-blue-700'"
            @click="setType('linear')"
        >
            Linear
        </button>
        <button
            class="rounded-r w-1/2 text-center py-1 transition-all duration-300 waves-effect waves-light"
            :class="type === 'radial' && 'active border-l border-blue-700'"
            @click="setType('radial')"
        >
            Radial
        </button>
    </div>
</template>

<script>
export default {
    name: "TypeTab",
    computed: {
        type() {
            return this.$store.state.type
        },
    },
    methods: {
        setType(type) {
            this.$store.commit("setType", type)
        },
    },
}
</script>

<style lang="postcss" scoped>
button {
    position: relative;
    background: linear-gradient(theme("colors.blue.600"), theme("colors.blue.500"), theme("colors.blue.600"));
}

button.active {
    background: linear-gradient(theme("colors.blue.700"), theme("colors.blue.600"), theme("colors.blue.700"));
}

button:after {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: white;
    opacity: 0;
    transition: opacity 300ms ease-out;
}

button:hover:after {
    opacity: 0.2;
    transition: opacity 300ms ease-in;
}
</style>
