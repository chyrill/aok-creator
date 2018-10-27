/* eslint-disable */
self.addEventListener('push', (ev) => {
    const data = ev.data.json()
    self.registration.showNotification('AOK CREATOR', {
        body: data.message,
        icon: data.thumbnail,
        data: {
            url: data.link
        }
    })
})