<template>
    <div class="container flex justify-between gap-3 w-full">
        <label class="hex">
            <input type="text" :value="hex" @blur="setHex" />
            Hex
        </label>
        <label>
            <input type="number" min="0" max="255" v-model="red" />
            R
        </label>
        <label>
            <input type="number" min="0" max="255" v-model="green" />
            G
        </label>
        <label>
            <input type="number" min="0" max="255" v-model="blue" />
            B
        </label>
    </div>
</template>

<script>
import { rgbToHex, hexToRgb } from "@/util"

export default {
    name: "ColorInput",
    computed: {
        hex() {
            const { rgba } = this.$store.getters.currentColor
            return "#" + rgbToHex(rgba)
        },
        red: {
            get() {
                const { rgba: { red } } = this.$store.getters.currentColor
                return Math.round(red)
            },
            set(red) {
                const { rgba: { green, blue } } = this.$store.getters.currentColor
                this.$store.commit("setColorRgb", { red, green, blue })
            },
        },
        green: {
            get() {
                const { rgba: { green } } = this.$store.getters.currentColor
                return Math.round(green)
            },
            set(green) {
                const { rgba: { red, blue } } = this.$store.getters.currentColor
                this.$store.commit("setColorRgb", { red, green, blue })
            },
        },
        blue: {
            get() {
                const { rgba: { blue } } = this.$store.getters.currentColor
                return Math.round(blue)
            },
            set(blue) {
                const { rgba: { red, green } } = this.$store.getters.currentColor
                this.$store.commit("setColorRgb", { red, green, blue })
            },
        },
    },
    methods: {
        setHex(e) {
            const hex = e.target.value.replace("#", "")

            try {
                const rgb = hexToRgb(hex)
                this.$store.commit("setColorRgb", rgb)
            } catch {
                // ignore
            }
        },
    },
}
</script>

<style lang="postcss" scoped>
.container {
    @apply mb-5;
}

label {
    @apply flex flex-col items-center text-gray-700 gap-1;
    width: 20%;
}

label.hex {
    width: 40%;
    min-width: 0;
}

input {
    @apply w-full rounded p-1 pl-3;
}
</style>
