<template>
    <div>
        <div class="card border-0 shadow-sm bg-warning rounded-4">
            <div class="card-body">
                <div>
                    <div class="row">
                        <div class="col-md-12 d-flex flex-column justify-content-center mt-3 align-items-center">
                            <i class="fas fa-exclamation-triangle text-white fa-6x"></i>
                            <div>
                                <h6 class="mt-3 pt-2 text-white text-center fw-bold fs-6 px-3 py-2">
                                    Warning: Khun Shine's weekly mood is mostly negative.
                                </h6>
                            </div>
                            <div class="button btn btn-outline-light" data-bs-toggle="modal" data-bs-target="#modal">
                                View Details
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div id="modal" class="modal fade">
            <div class="modal-dialog modal-md">
                <div class="modal-content p-5 text-dark bg-white border-0 rounded-5">
                    <div class="modal-header">
                        <h5 class="modal-title">Weekly Mood Analysis</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <h6 class="">Summary:</h6>
                        <p class="">
                            This week, Khun Shine reported several negative moods that might be impacting productivity
                            and well-being.
                        </p>

                        <h6 class="">Mood Distribution:</h6>
                        

                        <h6 class=" mt-3">Mood Details:</h6>
                        <ul class="">
                            <li>Monday: Sad</li>
                            <li>Tuesday: Anxious</li>
                            <li>Wednesday: Frustrated</li>
                            <li>Thursday: Neutral</li>
                            <li>Friday: Happy</li>
                        </ul>

                        <h6 class=" mt-3">Recommendations:</h6>
                        <p class="">
                            - Encourage Khun Shine to take short breaks during work.<br>
                            - Consider scheduling one-on-one check-ins to discuss any concerns.<br>
                            - Provide resources for stress management and mood improvement.
                        </p>
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
</style>