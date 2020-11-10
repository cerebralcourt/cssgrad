<template>
    <div class="flex flex-col items-center">
        <div
            class="slider relative rounded-full border-2 border-white mb-4"
            ref="slider"
            @pointerover="onHover"
        >
            <div
                class="cursor absolute bg-white rounded-full"
                :style="`left: calc(${x}% - 7px); top: calc(${y}% - 7px)`"
            />
        </div>
        <label class="text-gray-700">
            <input class="rounded p-1 pl-3 mr-1" type="number" v-model="deg" min="0" max="360" />
            deg
        </label>
    </div>
</template>

<script>
export default {
    name: "LinearDirection",
    computed: {
        x() {
            let { deg } = this.$store.state.linear
            deg -= 90
            if (deg < 0) deg += 360

            const rad = deg * Math.PI / 180
            return 50 + Math.cos(rad) * 30
        },
        y() {
            let { deg } = this.$store.state.linear
            deg -= 90
            if (deg < 0) deg += 360

            const rad = deg * Math.PI / 180
            return 50 + Math.sin(rad) * 30
        },
        deg: {
            get() {
                const { deg } = this.$store.state.linear
                return Math.round(deg)
            },
            set(deg) {
                this.$store.commit("setDeg", deg)
            },
        },
    },
    methods: {
        onHover(e) {
            const slider = this.$refs.slider
            const sliderX = slider.getBoundingClientRect().left
            const sliderY = slider.getBoundingClientRect().top
            
            const move = (e) => {
                const x = (e.pageX - sliderX) / slider.clientWidth - 0.5
                const y = (e.pageY - sliderY) / slider.clientHeight - 0.5
                const rad = Math.atan2(y, x)

                let deg = rad * 180 / Math.PI + 90
                if (deg < 0) deg += 360

                this.$store.commit("setDeg", deg)
            }

            move(e)
            document.addEventListener("pointermove", move)

            slider.addEventListener("pointerout", () => document.removeEventListener("pointermove", move))
        },
    },
}
</script>

<style lang="postcss" scoped>
.slider {
    background: radial-gradient(theme("colors.gray.500"), theme("colors.gray.600"));
    height: 30vh;
    width: 30vh;
}

.cursor {
    width: 14px;
    height: 14px;
}

input {
    width: 80px;
}
</style>
