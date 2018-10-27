/* eslint-disable */
import axios from 'axios'

const COUNTRY_API = 'https://restcountries.eu/rest/v2/all'

export const GET_COUNTRY_LIST = () => {
    
    const list = []

    axios.get(COUNTRY_API).then( res => {
        res.data.forEach(x => {
            list.push(x.name + ' ' + x.alpha2Code)
        })
    })

    return list
}