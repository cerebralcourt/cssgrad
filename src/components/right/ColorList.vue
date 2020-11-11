<template>
    <div class="overflow-y-auto h-full" ref="container" :style="`maxHeight: ${maxHeight}`">
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
                <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="times" class="w-5 h-5 svg-inline--fa fa-times fa-w-11" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 352 512"><path fill="currentColor" d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"></path></svg>
            </button>
        </div>
    </div>
</template>

<script>
import { rgbToHex } from "@/util"

export default {
    name: "ColorList",
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
