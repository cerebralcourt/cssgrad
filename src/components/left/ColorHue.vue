<template>
    <div
        class="slider relative border-2 border-white rounded w-full cursor-pointer mb-4"
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
import { colorToCSS, hslToRgb } from "@/util"

export default {
    name: "ColorHue",
    computed: {
        x() {
            const { hue } = this.$store.getters.currentColor
            return hue * 100
        },
    },
    methods: {
        onClick(e) {
            const slider = this.$refs.slider
            const sliderX = slider.getBoundingClientRect().left
            const sliderWidth = slider.clientWidth
            
            const drag = (e) => {
                const mouseX = e.pageX - sliderX
                const hue = Math.min(Math.max(mouseX / sliderWidth, 0), 1)

                this.$store.commit("setColorHue", hue)
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
    data() {
        let colors = []
        const step = 4

        for (let i = 0; i < 256 / step; i++) {
            const h = i * step / 255
            const rgba = hslToRgb({ h, s: 1, l: 0.5, alpha: 1 })
            const percent = i * step / 255 * 100
            colors.push({ rgba, percent })
        }

        const gradient = `
            background: linear-gradient(to right, ${colors.map(colorToCSS).join(", ")});
        `

        return {
            gradient,
        }
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
