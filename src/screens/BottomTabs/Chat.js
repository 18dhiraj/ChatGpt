import { useChatGpt, ChatGptError } from 'react-native-chatgpt';
import React, { useState, useEffect, useCallback } from 'react';
import { Button, Text, View, TextInput, ScrollView } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat'
import { useFocusEffect, useIsFocused } from '@react-navigation/native';
import useAsync from '../../components/async';

const Chat = (props) => {

    const chatdata = props?.route?.params?.data || undefined
    const { sendMessage, status } = useChatGpt();
    const [messages, setMessages] = useState([])
    const [save, setSave] = useState(false)
    const isFocused = useIsFocused()
    const [oldChat, setOldChat] = useState(null)
    const { getAsync, setAsync } = useAsync()
    const ChatBotMessage = () => {
        return {
            _id: new Date(),
            "createdAt": new Date(),
            "text": "typing...",
            "user": {
                "_id": 2,
                name: 'React Native',
                avatar: require('../../assets/no-user.png'),
            }
        }
    }

    const submit = (msg = []) => {
        setMessages(previousMessages =>
            GiftedChat.append(previousMessages, msg),
        )

        setTimeout(() => {
            setMessages(previousMessages =>
                GiftedChat.append(previousMessages, ChatBotMessage()),
            )
        }, 500)

        sendMessage({
            message: msg[0].text,
            onAccumulatedResponse: ({ message, isDone }) => {
                setMessages(previousMessages => {
                    const newMessages = [...previousMessages];
                    newMessages[0] = {
                        ...previousMessages[0],
                        text: message,
                    };
                    return newMessages;
                })
                if (isDone) {
                    if (!save) {
                        setSave(true)
                    }
                }
            },
            onError: e => {
                if (e.statusCode == 429) {
                    setMessages(previousMessages => {
                        const newMessages = [...previousMessages];
                        newMessages[0] = {
                            ...previousMessages[0],
                            text: 'Opps, Your limit reached',
                        };
                        return newMessages;
                    })
                    alert('Limit Reached')

                } else {
                    setMessages(previousMessages => {
                        const newMessages = [...previousMessages];
                        newMessages[0] = {
                            ...previousMessages[0],
                            text: 'Opps, Some error occured',
                        };
                        return newMessages;
                    })
                    alert('Some error occured please try again later!')
                }
            },
        });
    };

    const newSession = () => {
        setOldChat(null);
        setMessages([
            {
                _id: 1,
                text: 'Hi, How can i assist you today?',
                createdAt: new Date(),
                user: {
                    _id: 2,
                    name: 'Chat GPT',
                    avatar: require('../../assets/no-user.png'),
                },
            },
        ])
    }


    const saveChat = async () => {

        if (oldChat != null) {
            let parsedData = await getAsync('SavedChats');
            //console.log('savinnnnn getdata')
            if (parsedData != null) {

                let filteredData = await parsedData.filter((e) => {
                    return e[1].id != oldChat.id
                })
                let _newData = [[messages, { id: oldChat.id }], ...filteredData]

                await setAsync('SavedChats', _newData)
            }


        } else {

            let data = [[messages, { id: 1 }]];
            let previousChats = await getAsync('SavedChats');

            if (previousChats != null) {
                let parsedData = await JSON.parse(previousChats);
                let _newData = [...parsedData, [messages, { id: parsedData[parsedData.length - 1][1].id + 1 }]]
                await setAsync('SavedChats', _newData)

            } else {
                await setAsync('SavedChats', data)
            }
        }
    }

    useEffect(() => {
        if (!isFocused) {
            setOldChat(null);
            setMessages([
                {
                    _id: 1,
                    text: 'Hi, How can i assist you today?',
                    createdAt: new Date(),
                    user: {
                        _id: 2,
                        name: 'Chat GPT',
                        avatar: require('../../assets/no-user.png'),
                    },
                },
            ])
        }
    }, [isFocused])

    useEffect(() => {
        if (chatdata != undefined) {
            setOldChat(chatdata[1]);
            setMessages(chatdata[0]);
        } else {
            setMessages([
                {
                    _id: 1,
                    text: 'Hi, How can i assist you today?',
                    createdAt: new Date(),
                    user: {
                        _id: 2,
                        name: 'Chat GPT',
                        avatar: require('../../assets/no-user.png'),
                    },
                },
            ])
        }
    }, [chatdata])


    return (
        <>
            <View height={"100%"}>
                <View style={{ position: 'absolute', top: 5, right: 5, zIndex: 1, flexDirection: 'row' }}>
                    {save && <View style={{ marginRight: 10 }}>
                        <Button style={{ margin: 10 }} onPress={saveChat} title={"Save Session"} />
                    </View>}
                    <View>
                        <Button onPress={newSession} title={"New session"} />
                    </View>
                </View>
                <GiftedChat
                    messages={messages}
                    onSend={messages => submit(messages)}
                    user={{
                        _id: 1,
                        name: 'React Native',
                        avatar: '../../assets/no-user.png',
                    }}
                />
            </View >
        </>
    )
}

export default Chat