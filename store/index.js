/* eslint-disable */

export const state = () => ({
  sidebar: false,
  token: '',
  refetch: false,
  artworks: [],
  notifications: [],
  balance: 0,
  withdrawals: 0
})

export const mutations = {
  toggleSidebar (state) {
    state.sidebar = !state.sidebar
  },
  setProfile(state,data){
    state.profile = data
  },
  setNotifications(state, data) {
    var values  = []
    data.forEach(x => {
      var xdata = CreateNewNotification(x)
      var y = values.find(xy => { return xy.message ===  xdata.message})

      if(!y) {
        values.push(xdata)
      }
    })
    state.notifications = []
    state.notifications = values
  },
  setToken(state, payload) {
    state.token = payload
  },
  refetch(state) {
    state.refetch = !state.refetch
  },
  addArtworkToState(state, data) {
    state.artworks.push(data)
  },
  setArtworkState(state, data) {
    state.artworks = data
  },
  addNotif(state, data) {
    var value = []
    state.notifications.forEach(element => {
      var x = CreateNewNotification(element)
      var y = value.find(el => { return el.message === x.message})
      if(!y) {
        value.push(x)
      }
    })
    var x = CreateNewNotification(data)
    var y = value.find( el => { return el.message === x.message})
    if (!y) {
      value.unshift(x)
    }
    state.notifications = []
    state.notifications = value
  },
  readNotify(state) {
    var val = []
    state.notifications.forEach(x => {
      var data = x
      data.new = false
      val.push(data)
    })
    state.notifications = []
    state.notifications = val
  },
  updateArtworkState(state, data) {
    var val = CreateArray(state.artworks)
    val.splice(val.findIndex(x => x._id === data._id),1)
    console.log(val)
    val.push(data)
    state.artworks = []
    state.artworks = val
  },
  setBalanceToState(state, data) {
    state.balance = data
  },
  setWithdrawalsToState(state, data){
    state.withdrawals = data
  }
}

export const actions = { 
  addArtwork ({ commit }, payload) {
    commit('addArtworkToState', payload)
  },
  setArtwork({ commit }, payload) {
    commit('setArtworkState', payload)
  },
  addNotification({commit}, payload) {
    commit('addNotif', payload)
  },
  readNotify({commit}) {
    commit('readNotify')
  },
  updateArtwork({ commit }, payload) {
    commit('updateArtworkState', payload)
  },
  setBalance({ commit }, payload) {
    commit('setBalanceToState', payload)
  },
  setWithdrawals({ commit }, payload) {
    commit('setWithdrawalsToState', payload)
  }
}

function CreateNewNotification(data) {
  var res = { }
  for ( var i in data) {
    res[i] = data [i]
  }
  var urlLink = data.links.find(x => { return x.app === 'artist' })
  res['link'] =  urlLink.url
  
  return res
}

function CreateArray(data) {
  var res = []
  data.forEach(x => {
    res.push(data)
  })
  return res
}