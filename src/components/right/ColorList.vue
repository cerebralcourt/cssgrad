<template>
    <div class="overflow-y-auto h-full" ref="container" :style="`maxHeight: ${maxHeight}`">
        <transition-group name="slide">
            <div
                v-for="color in colors"
                :key="color.id"
                class="flex justify-between items-center p-2 transition-colors duration-300"
                :class="color.id === current && 'bg-gray-400 rounded'"
            >
                <button
                    class="rounded w-8 h-8"
                    :class="color.id === current && 'border-2 border-white shadow'"
                    :style="`background: #${rgbToHex(color.rgba)}`"
                    @click="setCurrent(color.id)"
                />
                <input
                    type="text"
                    class="w-24 rounded p-1 pl-3"
                    :value="'#' + rgbToHex(color.rgba)"
                    @change="setHex($event, color.id)"
                />
                <input
                    type="number"
                    class="w-16 rounded p-1 pl-3"
                    min="0"
                    max="100"
                    :value="color.percent"
                    @input="setPercent($event, color.id)"
                />
                <button class="text-gray-600 hover:text-red-500 transition-colors duration-300" @click="deleteColor(color.id)">
                    <close-icon class="w-5 h-5" />
                </button>
            </div>
        </transition-group>
    </div>
</template>

<script>
import CloseIcon from "@/icons/CloseIcon"
import { rgbToHex } from "@/util"

export default {
    name: "ColorList",
    components: {
        CloseIcon,
    },
    computed: {
        colors() {
            return this.$store.state.colors
        },
        current() {
            return this.$store.state.current
        },
    },
    methods: {
        rgbToHex,
        setCurrent(id) {
            this.$store.commit("setCurrent", id)
        },
        setHex(e, id) {
            const hex = e.target.value.replace("#", "")
            this.$store.commit("setColorHex", { id, hex })
        },
        setPercent(e, id) {
            const percent = e.target.value
            this.$store.commit("setColorPercent", { id, percent })
        },
        deleteColor(id) {
            this.$store.commit("deleteColor", id)
        },
    },
    data() {
        return {
            maxHeight: "100%",
        }
    },
    mounted() {
        this.maxHeight = this.$refs.container.clientHeight + "px"
    },
}
</script>

<style lang="postcss" scoped>
.slide-enter-active, .slide-leave-active {
    transition: transform 250ms;
}

.slide-enter, .slide-leave-to {
    transform: translateX(-100%);
}
</style>
