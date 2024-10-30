<template>
    <div class="d-flex justify-content-between align-items-start p-2">
        <div class="d-flex align-items-center gap-3">
            <img src="https://randomuser.me/api/portraits/men/1.jpg" width="50" class="rounded-circle" alt="">
            <div>
                <h3 class="fw-bold my-0 text-truncate" style="font-size: clamp(1rem, 1.5vw, 1.25rem);">Swan Yi Phyo</h3>
                <h6 class="dep">IT</h6>
            </div>
        </div>
        <div>
            <i class="fas fa-circle text-success me-2"></i><span class="text-muted">11 mins ago</span>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        name: {
            type: String,
            default: 'N/A',
            required: true
        },
        department: {
            type: String,
            default: 'N/A',
            required: true
        },
        profilePic: {
            type: String,
            default: 'https://randomuser.me/api/portraits/men/1.jpg',
            required: true
        },
        timestamp: {
            type: String,
            default: 'N/A',
            required: true
        }
    }
}
</script>

<style>
.dep {
    font-size: 14px;
    color: gray;
}
</style>