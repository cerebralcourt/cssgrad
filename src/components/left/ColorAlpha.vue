<template>
    <div
        class="slider relative border-2 border-white rounded w-full cursor-pointer"
        :style="gradient"
        ref="slider"
        @pointerdown="onClick"
    >
        <div
            class="handle absolute bg-white border-2 border-black"
            :style="`left: calc(${x}% - 5px)`"
        />
    </div>
</template>

<script>
import { rgbToHex } from "@/util"

export default {
    name: "ColorAlpha",
    computed: {
        gradient() {
            const { rgba } = this.$store.getters.currentColor
            const hex = "#" + rgbToHex(rgba)

            return `
                background: linear-gradient(to right, ${hex}, transparent)
            `
        },
        x() {
            const { rgba: { alpha } } = this.$store.getters.currentColor
            return 100 - alpha * 100
        },
    },
    methods: {
        onClick(e) {
            const slider = this.$refs.slider
            const sliderX = slider.getBoundingClientRect().left
            const sliderWidth = slider.clientWidth
            
            const drag = (e) => {
                const mouseX = e.pageX - sliderX
                const x = Math.min(Math.max(mouseX / sliderWidth, 0), 1)
                const alpha = 1.0 - x

                this.$store.commit("setColorAlpha", alpha)
            }

            drag(e)

            window.addEventListener("pointermove", drag)
            window.addEventListener("touchmove", drag)

            const onHandleUp = (e) => {
                e.preventDefault()
                window.removeEventListener("pointermove", drag)
                window.removeEventListener("touchmove", drag)
            }

            window.addEventListener("pointerup", onHandleUp)
            window.addEventListener("touchend", onHandleUp)
        },
    },
}
</script>

<style scoped>
.slider {
    height: 6vh;
}

.handle {
    width: 10px;
    height: 140%;
    top: -20%;
}
</style>
