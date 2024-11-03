<template>
    <div class="card border-0 shadow-sm px-3 bg-primary rounded-4">
        <div class="card-body">
            <div class="row">
                <div
                    class="col-md-7 d-flex flex-column justify-content-between align-items-start align-items-md-start align-items-sm-center">
                    <span class="mt-2 date text-white fw-bold rounded-2 px-3 py-2"
                        style="width: 181px; font-size: 12px;">
                        <i class="fas fa-calendar"></i> {{ formattedDate }}
                    </span>
                    <div class="mt-sm-2">
                        <h5 class="fw-bold text-white">Good Day, Admin</h5>
                        <p class="text-white" style="font-size: 14px;">Have a Nice {{ dayOfWeek }}!</p>
                    </div>
                </div>
                <div class="col-md-5 d-flex justify-content-center justify-content-md-start">
                    <img src="../../assets/images/HR.png" width="100" alt="" class="">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            currentDate: new Date()
        };
    },
    computed: {
        formattedDate() {
            const options = { month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true };
            return this.currentDate.toLocaleDateString('en-US', options);
        },
        dayOfWeek() {
            return this.currentDate.toLocaleDateString('en-US', { weekday: 'long' });
        }
    },
    mounted() {
        // Update the date every minute
        this.interval = setInterval(() => {
            this.currentDate = new Date();
        }, 500); // 60000 milliseconds = 1 minute
    },
    beforeUnmount() {
        // Clear the interval when the component is destroyed to avoid memory leaks
        clearInterval(this.interval);
    }
}
</script>

<style></style>