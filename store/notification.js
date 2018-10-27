/* eslint-disable */
export const state = () => ({
    list: []
})

export const mutations = {
    set(state, payload) {
        state.list = payload
    },
    read(state) {
        let data = []
        state.list.forEach(x => {
            let newData = TRANSFORM_OBJECT_TO_EXTENSIBLE(x)
            newData.new = false
            data.push(newData)
        })
        state.list = []
        state.list = data
    }
}

const TRANSFORM_OBJECT_TO_EXTENSIBLE = (data) => {
    let res = {}
    for (let x in data) {
        res[x] = data[x]
    }
    return res
}