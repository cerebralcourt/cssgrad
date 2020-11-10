<template>
    <div class="widget rounded shadow-lg h-full inline-block overflow-x-hidden">
        <div class="relative">
            <button
                class="w-1/2 px-5 py-2 transition-colors duration-300 waves-effect waves-light
                    bg-blue-700 hover:bg-blue-600 rounded-tl"
                :class="tab === 0 ? 'text-white' : 'text-gray-400'"
                @click="tab = 0"
            >
                {{ left }}
            </button>
            <button
                class="w-1/2 px-5 py-2 transition-colors duration-300 waves-effect waves-light
                    bg-blue-700 hover:bg-blue-600 rounded-tr"
                :class="tab === 1 ? 'text-white' : 'text-gray-400'"
                @click="tab = 1"
            >
                {{ right }}
            </button>
            <div
                class="tab-underline absolute left-0 bottom-0 bg-white w-1/2 z-10" 
                :class="tab === 1 && 'active'"
            />
        </div>
        <div class="tab-items flex" :class="tab === 1 && 'active'">
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: "Widget",
    props: ["left", "right"],
    data() {
        return {
            tab: 0,
        }
    },
}
</script>

<style lang="postcss" scoped>
.widget {
    @apply border-b-2 border-gray-400;
    background: linear-gradient(to bottom, theme("colors.gray.400"), theme("colors.gray.500"));
    max-width: 30vw;
}

.tab-underline {
    height: 2px;
    transition: left 350ms ease-in;
}

.tab-underline:not(.active) {
    animation: underline-left 350ms ease-in-out alternate;
}

.tab-underline.active {
    left: 50%;
    animation: underline-right 350ms ease-in-out alternate;
}

@keyframes underline-left {
    from {
        width: 50%;
    }

    to {
        width: 70%;
    }
}

@keyframes underline-right {
    from {
        width: 50%;
    }

    to {
        width: 70%;
    }
}

.tab-items {
    width: 200%;
    transform: translateX(0);
    transition: transform 350ms ease-in-out;
}

.tab-items.active {
    transform: translateX(-50%);
}
</style>
