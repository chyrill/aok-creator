/* eslint-disable */
import {API_ROUTE} from '@/config/apiroutes'

const publicVapidKey = 'BO1o2k-tgB-we89fa6FjPkBZRBEQH_LbDWBh6d1ES3smZVjdWt0-ACyV96AuZnSZUE6xHvrwN0lxddcanPKVLSk'
let subs = null;

export const  PushManager = (subscribe) => {
    if('serviceWorker' in navigator) {
        console.log('Registering service worker')

        run(subscribe).catch(err => console.log(err))
    }
}

async function run(subscribe) {
    console.log(subscribe)
    const registration = await navigator.serviceWorker.register('/push_service.js')
    const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
    })
    if(subscribe) {
        subs = subscription
        fetch(API_ROUTE + '/subscribe', {
            method: 'POST',
            body: JSON.stringify(subscription),
            headers: {
                'content-type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token') 
            }
        })
    } else {
        fetch(API_ROUTE + '/unsubscribe', {
            method: 'POST',
            body: JSON.stringify(subs),
            headers: {
                'content-type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token') 
            }
        })
        subscription.unsubscribe()
    }

}

const urlBase64ToUint8Array = (base64string) => {
    const padding = '='.repeat((4 - base64string.length % 4) % 4)
    const base64 = (base64string + padding)
        .replace(/\-/g, '+')
        .replace(/_/g,'/')
    const rawData = window.atob(base64)
    return Uint8Array.from([...rawData].map((char) => char.charCodeAt(0)))
}