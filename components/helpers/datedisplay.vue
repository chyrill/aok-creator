<template>
    <div>
        {{prepend_message}} {{month}} {{day}}, {{year}} {{append_message}} 
    </div>
</template>


<script>
/* eslint-disable */

export default {
    props: {
        prepend_message: {
            type: String
        },
        append_message: {
            type: String
        },
        isFullMonth : {
            type: Boolean
        },
        date: {
            type: String
        }
    },
    data: () => ({
        monthList: [{
            name: 'January', 
            value: 1
        },{
            name: 'Febuary', 
            value: 2
        },
        {
            name: 'March', 
            value: 3
        },
        {
            name: 'April', 
            value: 4
        },
        {
            name: 'May', 
            value: 5
        },
        {
            name: 'June', 
            value: 6
        },
        {
            name: 'July', 
            value: 7
        },
        {
            name: 'August', 
            value: 8
        },
        {
            name: 'September', 
            value: 9
        },
        {
            name: 'October', 
            value: 10
        },
        {
            name: 'November', 
            value: 11
        },{
            name: 'December', 
            value: 12
        }],
        month: null,
        day: null,
        year: null
    }),
    mounted() {
        this.month = this.getmonth()
        this.year = this.getyear()
        this.day = this.getday()
    },
    methods: {
        getmonth() {
            if(this.isFullMonth) {
                var month = new Date(this.date).getMonth() + 1 

                return  this.monthList.find(x => { return x.value === month }).name
            }
            else {
                return new Date(this.date).getMonth() + 1
            }
        },
        getday() {
            return new Date(this.date).getDate()
        },
        getyear() {
            return new Date(this.date).getFullYear()
        }
    }
}
</script>


