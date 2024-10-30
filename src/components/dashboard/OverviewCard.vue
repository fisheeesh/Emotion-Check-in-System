<template>
    <div class="card border-0 shadow-sm px-3 rounded-4 bg-light">
        <div class="card-body ">
            <div class="d-flex justify-content-between align-items-center">
                <h4 class="fw-bold mb-0">Weekly Overview</h4>
                <i class="fas fa-question-circle text-secondary"></i>
            </div>

            <div class="d-flex flex-column justify-content-start mt-4 vstack gap-4">
                <!-- Positive Mood -->
                <div class="d-flex align-items-center justify-content-start gap-5">
                    <img src="../../assets/images/positive.png" width="66" alt="">
                    <div>
                        <h5 class="fw-bold">Positive - 90%</h5>
                    </div>
                </div>
                <div class="d-flex align-items-center justify-content-start gap-5">
                    <img src="../../assets/images/neutral.png" width="66" alt="">
                    <div>
                        <h5 class="fw-bold">Neutral - 7%</h5>
                    </div>
                </div>
                <div class="d-flex align-items-center justify-content-start gap-5">
                    <img src="../../assets/images/negative.png" width="66" alt="">
                    <div>
                        <h5 class="fw-bold">Negative - 3%</h5>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style>
.positive {
    color: rgb(0, 192, 0);
}
</style>