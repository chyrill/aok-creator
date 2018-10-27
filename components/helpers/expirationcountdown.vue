<template>
    <div>
        {{prepend_message}} <span v-if="month > 0">{{month}} month</span> <span v-else-if="days > 0 && month === 0">{{days}} days</span> <span v-else-if="hours > 0 && days === 0 && month === 0">{{hours}} hours</span>
    </div>
</template>

<script>
/* eslint-disable */

export default {
    props: {
        date: {
            type: String
        },
        prepend_message: {
            type: String
        },
        append_message: {
            type: String
        }
    },
    data: () => ({
        month: null,
        days: null,
        hours: null
    }),
    mounted() {
        this.mount()
    },
    methods: {
        getRemaining () {
            
            return new Date(new Date(this.date) - new Date())
        },
        mount () {
            var remaining = this.getRemaining()
            this.month = remaining.getMonth()
            this.days = remaining.getDate() - 1
            this.hours = remaining.getHours()
        }
    },
    watch: {
        date: function (val) {
            if(val) {
                this.mount()
            }
        }
    }
}
</script>
