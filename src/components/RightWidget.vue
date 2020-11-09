<template>
    <div class="widget">
        <div class="relative">
            <button
                class="tab waves-effect waves-light bg-blue-700 hover:bg-blue-600 rounded-tl"
                :class="tab === 0 ? 'text-white' : 'text-gray-400'"
                @click="tab = 0"
            >
                List
            </button>
            <button
                class="tab waves-effect waves-light bg-blue-700 hover:bg-blue-600 rounded-tr"
                :class="tab === 1 ? 'text-white' : 'text-gray-400'"
                @click="tab = 1"
            >
                CSS
            </button>
            <div class="tab-underline" :class="tab === 1 && 'active'" />
        </div>
        <div class="tab-container flex" :class="tab === 1 && 'active'">
            <div class="p-5 w-1/2">
                <p>Hi</p>
            </div>
            <div class="p-5 w-1/2">
                <p>Hello</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "RightWidget",
    data() {
        return {
            tab: 0,
        }
    },
}
</script>
