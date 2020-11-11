<template>
    <div class="slider relative border-2 border-black rounded cursor-pointer" ref="slider">
        <div
            class="border-2 border-white rounded w-full h-full"
            :style="css"
            @click="onSliderClick"
        >
            <div
                v-for="color in colors"
                :key="color.id"
                class="handle absolute border-2 border-white rounded-full cursor-move"
                :style="`left: calc(${color.percent}% - 10px)`"
                @pointerdown="onHandleClick(color.id)"
                @mouseover="hovering = color.id"
                @mouseout="hovering = null"
            >
                <transition name="fade">
                    <span
                        class="percent absolute"
                        :style="`color: #${rgbToHex(color.rgba)}`"
                        v-if="hovering === color.id || dragging === color.id"
                    >
                        {{ color.percent }}
                    </span>
                </transition>
                <div
                    class="border-2 rounded-full w-full h-full transition-colors duration-300"
                    :class="current === color.id ? 'border-blue-600' : 'border-black'"
                >
                    <div 
                        class="border-2 border-white rounded-full w-full h-full"
                        :style="`background: #${rgbToHex(color.rgba)}`"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { createCSS, rgbToHex } from "@/util"

export default {
    name: "Slider",
    computed: {
        colors() {
            return this.$store.state.colors
        },
        css() {
            return createCSS({ ...this.$store.state, linear: { deg: 90 }, type: "linear" })
        },
        current() {
            return this.$store.state.current
        },
    },
    methods: {
        rgbToHex,
        onSliderClick(e) {
            if (e.target.parentElement.isEqualNode(this.$refs.slider)) {
                const slider = this.$refs.slider
                const sliderX = slider.getBoundingClientRect().left
                const sliderWidth = slider.clientWidth
                const clickX = e.pageX - sliderX
                const percentUnbounded = Math.round((clickX / sliderWidth) * 100)
                const percent = Math.min(Math.max(percentUnbounded, 0), 100)

                this.$store.commit("addColor", percent)
            }
        },
        onHandleClick(id) {
            const slider = this.$refs.slider
            const sliderX = slider.getBoundingClientRect().left

            this.$store.commit("setCurrent", id)

            const drag = (e) => {
                const dragX = e.pageX - sliderX
                const percentUnbounded = Math.round((dragX / slider.clientWidth) * 100)
                const percent = Math.min(Math.max(percentUnbounded, 0), 100)

                this.$store.commit("setColorPercent", { id, percent })
            }

            document.body.style.cursor = "move"
            slider.style.cursor = "move"
            this.dragging = id

            window.addEventListener("pointermove", drag)
            window.addEventListener("touchmove", drag)

            const onHandleUp = (e) => {
                e.preventDefault()
                document.body.style.cursor = "auto"
                slider.style.cursor = "pointer"
                this.dragging = null
                window.removeEventListener("pointermove", drag)
                window.removeEventListener("touchmove", drag)
            }

            window.addEventListener("pointerup", onHandleUp)
            window.addEventListener("touchend", onHandleUp)
        },
    },
    data() {
        return {
            dragging: null,
            hovering: null,
        }
    },
}
</script>

<style lang="postcss">
.slider {
    height: 10vh;
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

.percent {
    @apply bg-gray-300 text-center py-3 rounded-full font-bold shadow;
    top: -10vh;
    left: -130%;
    width: 10vh;
}

.percent::selection {
    @apply bg-transparent;
}

.fade-enter-active, .fade-leave-active {
    transition: opacity 250ms;
}

.fade-enter, .fade-leave-to {
    opacity: 0;
}
</style>
