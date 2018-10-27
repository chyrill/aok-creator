<template>
    <span>
        $ {{result}}
    </span>
</template>

<script>
/* eslint-disable */

const convertNumberToString = (data) => {
    if(data === 0) {
        return '0.00'
    }
    var str = String(data)
    var len = str.split('.')[0].length
    var retData = []
    for(len; len > 0;) {
        var start = len - 3
        retData.push(str.split('.')[0].substring(start, len))
        len = len -3
    }
    var retDatalen = retData.length
    var final = []
    retData.forEach(function(val){
        retDatalen = retDatalen -1
        final.push(retData[retDatalen])
    })
    return str.split('.')[1] != null || str.split('.')[1] != 'undefined' ? final.join() : (final.join() + '.' + str.split('.')[1])
}

export default {
    props: {
        item: {
            type: Number
        }
    },
    data: () => ({
        result: null
    }),
    mounted() {
        this.result = convertNumberToString(this.item)
    },
    watch: {
        item: function (val) {
            if(val) {
                this.result = convertNumberToString(this.item)
            }
        }
    }
}
</script>

