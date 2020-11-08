<template>
    <div class="slider relative border-2 border-black rounded" ref="slider">
        <div
            class="border-2 border-white rounded w-full h-full cursor-pointer"
            :style="css"
            @click="onSliderClick"
        >
            <div
                v-for="color in colors"
                :key="color.id"
                class="handle absolute border-2 border-white rounded-full cursor-move"
                :style="`left: calc(${color.percent}% - 10px)`"
                @pointerdown="onHandleSelect(color.id)"
            >
                <div
                    class="border-2 rounded-full w-full h-full transition-colors duration-300"
                    :class="current === color.id ? 'border-blue-600' : 'border-black'"
                >
                    <div 
                        class="border-2 border-white rounded-full w-full h-full"
                        :style="`background: #${color.hex}`"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { createCSS } from "@/util"

export default {
    name: "Slider",
    computed: {
        colors() {
            return this.$store.state.colors
        },
        css() {
            return createCSS({ ...this.$store.state, linear: { deg: 90 } })
        },
        current() {
            return this.$store.state.current
        },
    },
    methods: {
        onSliderClick(e) {
            if (e.target.parentElement.isEqualNode(this.$refs.slider)) {
                const slider = this.$refs.slider
                const sliderX = slider.getBoundingClientRect().left
                const clickX = e.pageX - sliderX
                const percentUnbounded = Math.round((clickX / slider.clientWidth) * 100)
                const percent = Math.min(Math.max(percentUnbounded, 0), 100)

                import("html2canvas").then(mod => {
                    const html2canvas = mod.default
                    html2canvas(document.body).then(canvas => {
                        const ctx = canvas.getContext("2d")
                        const color = ctx.getImageData(e.pageX, e.pageY, 1, 1).data
                        const rgba = {
                            red: color[0],
                            green: color[1],
                            blue: color[2],
                            alpha: color[3],
                        }

                        this.$store.commit("addColor", { percent, rgba })
                    });
                })
            }
        },
        onHandleSelect(id) {
            const slider = this.$refs.slider
            const sliderX = slider.getBoundingClientRect().left

            this.$store.commit("setCurrent", id)

            const drag = (e) => {
                const dragX = e.pageX - sliderX
                const percentUnbounded = Math.round((dragX / slider.clientWidth) * 100)
                const percent = Math.min(Math.max(percentUnbounded, 0), 100)

                this.$store.commit("setColorPercent", { id, percent })
            }

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

<style lang="postcss">
.slider {
    max-height: 10vh;
    padding: 0 !important;
}

.handle {
    z-index: 2;
    height: 14vh;
    width: 20px;
    top: -2vh;
    left: 0;
    border: 2px solid white;
}

.handle:hover > div {
    @apply border-blue-600;
}
</style>
