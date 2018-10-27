/* eslint-disable */
export const state = () => ({
    id: null
})

export const mutations = {
    set(state, payload) {
        state.id = payload
    },
    unset(state) {
        state.id = null
    }
}