<template>
    <div class="card border-0 shadow-sm">
        <div class="card-body">
            <div class="row">
                <div class="col-12">
                    <div class="d-flex align-items-center justify-content-between flex-nowrap gap-4">
                        <div class="d-flex align-items-center gap-5">
                            <i class="fas fa-medal fa-2x" :class="medalColorClass"></i>
                            <img :src="profilePic" width="50" class="rounded-circle" alt="">
                        </div>
                        <h3 class="fw-bold my-0 text-truncate" style="font-size: clamp(1rem, 1.5vw, 1.25rem);">
                            {{ name }}
                        </h3>
                        <div class="d-flex align-items-center gap-2">
                            <p class="mb-0 text-truncate" style="font-size: clamp(0.875rem, 1vw, 1rem);">{{ score }}
                                Points</p>
                            <i class="fas fa-fire text-warning fa-lg"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { computed } from 'vue';

export default {
    props: {
        name: {
            type: String,
            default: 'N/A',
            required: true
        },
        profilePic: {
            type: String,
            default: 'https://randomuser.me/api/portraits/men/1.jpg',
            required: true
        },
        score: {
            type: Number,
            default: 0,
            required: true
        },
        rank: {
            type: Number,
            required: true
        }
    },
    setup(props){
        let medalColorClass = computed(() =>{
            switch(props.rank){
                case 1:
                    return 'text-warning'; 
                case 2:
                    return 'text-secondary'; 
                case 3:
                    return 'third'; 
                case 4:
                    return 'fourth';
                case 5:
                    return 'fifth'; 
                default:
                    return '';
            }
        })

        return { medalColorClass }
    }
};
</script>

<style>
.third {
    color: #CD7F32;
}

.fourth {
    color: #ef7e13;
}

.fifth {
    color: #A9A9A9;
}
</style>