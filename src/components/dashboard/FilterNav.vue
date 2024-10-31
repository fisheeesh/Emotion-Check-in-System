<template>
    <nav class="filter-nav my-3 ms-2">
        <button @click="filterBy('Weekly')" :class="{ active: current === 'Weekly' }">Weekly</button>
        <button @click="filterBy('Monthly')" :class="{ active: current === 'Monthly' }">Monthly</button>
        <button @click="filterBy('Yearly')" :class="{ active: current === 'Yearly' }">Yearly</button>
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