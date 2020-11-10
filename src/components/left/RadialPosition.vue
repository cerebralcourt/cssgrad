<template>
    <div>
        <div
            class="slider relative overflow-hidden flex flex-col border border-gray-500
                bg-gray-300 rounded cursor-pointer mb-4"
            ref="slider"
            @pointerdown="onClick"
        >
            <div class="w-full flex flex-grow border-b border-gray-500">
                <div class="w-1/2 border-r border-gray-500" />
            </div>
            <div class="w-1/2 flex-grow border-r border-gray-500" />
            <div
                class="cursor absolute z-20 cursor-move border-2 border-black rounded-full"
                :style="{'--x': x + '%', '--y': y + '%'}"
                @pointerdown="onClick"
            >
                <div class="border-2 border-blue-600 rounded-full w-full h-full" />
            </div>
        </div>
        <div class="flex justify-around w-full">
            <label class="flex flex-col items-center text-gray-700 gap-1 w-1/3">
                <input
                    type="number"
                    class="w-full rounded p-1 pl-3"
                    min="0"
                    max="100"
                    v-model="x"
                />
                X
            </label>
            <label class="flex flex-col items-center text-gray-700 gap-1 w-1/3">
                <input
                    type="number"
                    class="w-full rounded p-1 pl-3"
                    min="0"
                    max="100"
                    v-model="y"
                />
                Y
            </label>
        </div>
    </div>
</template>

<script>
export default {
    name: "RadialPosition",
    computed: {
        x: {
            get() {
                return Math.round(this.$store.state.radial.position.left)
            },
            set(left) {
                const top = this.$store.state.radial.position.top
                this.$store.commit("setPosition", { left, top })
            },
        },
        y: {
            get() {
                return Math.round(this.$store.state.radial.position.top)
            },
            set(top) {
                const left = this.$store.state.radial.position.left
                this.$store.commit("setPosition", { left, top })
            },
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
                const left = Math.min(Math.max(mouseX / sliderWidth, 0), 1) * 100
                const top = Math.min(Math.max(mouseY / sliderHeight, 0), 1) * 100

                this.$store.commit("setPosition", { left, top })
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
.slider {
    width: 100%;
    height: 20vh;
}

.cursor {
    width: 16px;
    height: 16px;
    left: calc(var(--x) - 8px);
    top: calc(var(--y) - 8px);
}
</style>
