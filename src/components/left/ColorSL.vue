<template>
    <div class="container mb-5">
        <div class="rounded border-2 border-white overflow-hidden w-full h-full">
            <div
                class="slider cursor-pointer"
                :style="{'--color': color}"
                ref="slider"
                @pointerdown="onClick"
            />
        </div>
        <div
            class="cursor absolute z-20 cursor-move border-2 border-black rounded-full"
            :style="{'--x': x + '%', '--y': y + '%'}"
            @pointerdown="onClick"
        >
            <div class="border-2 border-white rounded-full w-full h-full"></div>
        </div>
    </div>
</template>

<script>
import { rgbToHex, rgbToHsl, hslToRgb } from "@/util"

export default {
    name: "ColorSL",
    computed: {
        color() {
            const h = this.$store.getters.currentColor.hue
            const rgba = hslToRgb({ h, s: 1, l: 0.5, alpha: 1 })
            return "#" + rgbToHex(rgba)
        },
        x() {
            const { rgba } = this.$store.getters.currentColor
            const { s } = rgbToHsl(rgba)
            return s * 100
        },
        y() {
            const { rgba } = this.$store.getters.currentColor
            const { l } = rgbToHsl(rgba)
            return 100 - l * 100
        },
    },
    methods: {
        onClick(e) {
            const slider = this.$refs.slider
            const sliderX = slider.getBoundingClientRect().left
            const sliderY = slider.getBoundingClientRect().top
            const sliderWidth = slider.clientWidth
            const sliderHeight = slider.clientHeight
            
            const drag = (e) => {
                const mouseX = e.pageX - sliderX
                const mouseY = e.pageY - sliderY
                const x = Math.min(Math.max(mouseX / sliderWidth, 0), 1)
                const y = Math.min(Math.max(mouseY / sliderHeight, 0), 1)
                const s = x
                const l = 1.0 - y

                this.$store.commit("setColorSL", { s, l })
            }

            document.body.style.cursor = "move"
            slider.style.cursor = "move"
            drag(e)

            window.addEventListener("pointermove", drag)
            window.addEventListener("touchmove", drag)

            const onHandleUp = (e) => {
                e.preventDefault()
                document.body.style.cursor = "auto"
                slider.style.cursor = "pointer"
                window.removeEventListener("pointermove", drag)
                window.removeEventListener("touchmove", drag)
            }

            window.addEventListener("pointerup", onHandleUp)
            window.addEventListener("touchend", onHandleUp)
        },
    },
}
</script>

<style lang="postcss" scoped>
.container {
    position: relative;
    width: 100%;
    min-width: 20vh;
    height: 15vh;
}

.slider {
    @apply relative w-full h-full;
    background: linear-gradient(to bottom, white, black);
}

.slider::after {
    content: "";
    position: absolute;
    width: inherit;
    height: inherit;
    background: linear-gradient(to bottom, white, var(--color), black);
    -webkit-mask-image: linear-gradient(to left, white, transparent);
}

.cursor {
    width: 16px;
    height: 16px;
    left: calc(var(--x) - 8px);
    top: calc(var(--y) - 8px);
}
</style>
