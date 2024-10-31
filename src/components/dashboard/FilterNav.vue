<template>
    <nav class="filter-nav my-3 ms-2">
        <button @click="filterBy('weekly')" :class="{ active: current === 'weekly' }">Weekly</button>
        <button @click="filterBy('monthly')" :class="{ active: current === 'monthly' }">Monthly</button>
        <button @click="filterBy('yearly')" :class="{ active: current === 'yearly' }">Yearly</button>
    </nav>
</template>

<script>
export default {
    props: {
        current: { type: String, required: true }
    },
    setup(props, context) {
        let filterBy = (value) => {
            context.emit('filterBy', value)
        }
        return { filterBy }
    }
}
</script>

<style>

</style>