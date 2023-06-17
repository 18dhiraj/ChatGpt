import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

const useAsync = () => {


    const setAsync = async (key, data) => {
        if (key == undefined || data == undefined) alert('Please provide all data!')
        await AsyncStorage.setItem(key, JSON.stringify(data))
            .then(() => {
                alert('data saved!')
            }).catch(() => {
                alert('Some error occured!')
            })
    }

    const getAsync = async (key) => {
        let data = await AsyncStorage.getItem(key)
        //alert(data)
        if (data != null) {
            let ParsedData = await JSON.parse(data)
            return ParsedData
        }
        return null

    }

    const clearAsync = async () => {
        await AsyncStorage.clear()
            .then(() => {
                alert('Sessions removed!')
            })
            .catch(() => {
                alert('Some error occured!')
            })
    }

    return { setAsync, getAsync, clearAsync }
}

export default useAsync