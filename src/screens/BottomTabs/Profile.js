import React, { useEffect, useState } from 'react'
import { FlatList, Text, TouchableOpacity, View, Button } from "react-native";
import { useIsFocused } from '@react-navigation/native';
import useAsync from '../../components/async';


const Profile = (props) => {

    const { navigation } = props
    const [savedChats, setSavedChats] = useState([])
    const focused = useIsFocused()
    const {getAsync , setAsync , clearAsync} = useAsync()

    const getData = async () => {
        let data = await getAsync('SavedChats')
        if (data != null) {
            setSavedChats(data);
        } else {
            setSavedChats([])
        }
    }

    const deleteSession = async (id) => {
        let filteredData = savedChats.filter((e) => {
            return e[1].id != id
        })
        setSavedChats(filteredData)
        await setAsync('SavedChats' , filteredData)
    }

    const returnData = ({ item, index }) => {
        let length = item[0].length
        return (
            <View style={{ backgroundColor: 'white', marginTop: 5 }}>
                <TouchableOpacity onPress={() => navigation.navigate('Chat', { data: item })}>
                    <View style={{ padding: 20 }}>
                        <Text style={{ paddingBottom: 5, fontWeight: 700, fontSize: 15 }}>{item[0][length - 2]?.text.length > 40 ? item[0][length - 2]?.text.slice(0,38) + '...' : item[0][length - 2]?.text }</Text>
                        <Text>{item[0][length - 3]?.text.length > 100 ? item[0][length - 3]?.text.slice(0,97) + '...' : item[0][length - 2]?.text }</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => deleteSession(item[1]?.id)}>
                    <Text style={{ paddingHorizontal: 20, paddingVertical: 5, textAlign: 'right' }}>Delete</Text>
                </TouchableOpacity>
            </View>
        )
    }

    const removeFromLocal = async () => {
        await clearAsync();
        getData()
    }

    useEffect(() => {
        if (focused) {
            getData()
        }
    }, [focused])

    return (
        <View height={"100%"} style={{ padding: 10 }}>
            {savedChats.length > 0 && <View width={120} style={{ marginBottom: 5 }} alignSelf={"flex-end"} ><Button onPress={removeFromLocal} title={"remove All"} /></View>}
            <FlatList
                data={savedChats}
                renderItem={returnData}
                ListEmptyComponent={() => <View height={100} style={{ alignItems: 'center', justifyContent: 'center' }}><Text>Saved sessions will be here!</Text></View>}
            />
        </View>
    )
}

export default Profile