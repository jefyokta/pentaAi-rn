import { View, Text, SafeAreaView, TouchableOpacity, TextInput, ScrollView, Modal, Animated, Easing } from 'react-native'
import { styled } from 'nativewind'
import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { Server } from '../../const'
import { Container } from '../../components/Container'
import { renderText } from '../../fun/textcovert'
const StyledView = styled(View)

interface ItemParams {
    text: string,
    isUser: boolean,
    model?: string
}
interface MessagesParams {
    message: ItemParams[]
}
interface Loader {
    show: boolean,
    delay: number
}
interface Load {
    show: boolean,
}
interface Model {
    model: string,
    path: string
}
interface Curr {
    current: {
        scrollToEnd: Function
    }
}




export const Home: React.FC = () => {
    const Models = [
        {
            model: 'PentaAi',
            path: '/gemini/penta'
        },
        {
            model: 'Gemini',
            path: '/gemini'
        },
        {
            model: 'llama',
            path: '/llama'
        },
    ]
    const [Isloading, setLoading] = useState<boolean>(false)
    const [message, setMessage] = useState<ItemParams[]>([
        // {
        // isUser: false, model: 'pentai', text: "Oke, saya bisa bantu membuat syntax starter Javascript Express! Berikut syntax dasar untuk membuat server Express yang sederhana:```javascript \nconst express = require('express'); const app = express(); \nconst port = 3000; // port yang akan digunakan server \n// Middleware untuk parsing request body (contoh: data dari form) \napp.use(express.json()); \napp.use(express.urlencoded({ extended: true }));```"}
    ])
    const [disabled, setDisable] = useState(true)
    const [text, seText] = useState('')
    const [model, setModel] = useState<Model>(Models[0])
    const [modal, setModal] = useState(false)
    const ScrollRef: Curr | any = useRef(null)


    const getResponse = async (text: string, mod: Model): Promise<ItemParams> => {
        try {
            const result = await axios.get(`${Server}${mod.path}?chat=${text}`)
            const fromModel: ItemParams = {
                model: mod.model,
                text: result.data.text,
                isUser: false
            }
            return fromModel
        } catch (error: any) {
            console.log(error.toJSON())
            throw error
        }
    }

    const HandleMessage = async (chat: ItemParams): Promise<void> => {
        const mess = message
        const newmesg = [...mess, chat]
        setMessage(newmesg)
        seText('')
        setLoading(true)
        setTimeout(async () => {
            try {
                const result = await getResponse(chat.text, model)
                if (result.text) {

                    const newer = [...newmesg, result]
                    setMessage(newer)
                    setLoading(false)
                }
            } catch (error: any) {
                console.log(error.toJSON())

                if (error.message == 'Network Error') {
                    const err = [...newmesg, { model: 'Jefy', text: 'Network Error:(', isUser: false, }]
                    setMessage(err)
                    setLoading(false)
                }
                else if (error.response.status == 401 || 403) {

                    const err = [...newmesg, { model: 'Jefy', text: error.response.data + ':(', isUser: false, }]
                    setMessage(err)
                    setLoading(false)
                }
            }

        }, 700);


    }

    const HandleButton = (): void => {
        const dis = text.trim() == '' || Isloading ? true : false
        setDisable(dis)
    }
    useEffect(() => {
        HandleButton()
    }, [text, Isloading])


    useEffect(() => {
        if (ScrollRef.current) { ScrollRef.current.scrollToEnd({ Animated: true }) }
    }, [message])
    return (
        <Container>
            {/* header */}
            <View className='w-full rounded-3xl bg-slate-400/10 h-25 flex-row justify-between p-3 shadow-lg border border-slate-100/10'>
                <View className='w-10 rounded-full h-10 bg-slate-400/10 shadow-lg'></View>
                <View className='w-40 rounded-md h-10 bg-slate-400/10 flex-row items-center px-2 justify-between'>
                    <Text className='text-orange-300 text-lg'>{model.model}</Text>
                    <TouchableOpacity onPress={() => setModal(true)}>
                        <Text className='text-slate-400 text-2xl'> &#x21C4;</Text>
                    </TouchableOpacity>
                </View>
            </View>
            {/* end of headwer */}
            <ScrollView className=' w-full min-h-full  border-slate-950 pb-2' ref={ScrollRef}>
                <Messages message={message} />
                <Loading show={Isloading} />
                <Gap />
            </ScrollView>

            {/* footer */}
            <View className='absolute mx-2 my-2 bottom-0 w-full p-2 '>
                <TextInput
                    value={text}
                    className='bg-transparent text-slate-300 w-full bg-slate-400/10 rounded-lg px-3 border border-slate-100/20'
                    placeholder='Ask me.....' placeholderTextColor={'#94a3b8'}
                    onChangeText={(text) => seText(text)}
                />
                <TouchableOpacity
                    className={`absolute right-5 inset-y-3 w-10 h-10 ${disabled ? 'bg-blue-300/50' :'bg-blue-300'} rounded-full flex-row justify-center items-center`}
                    disabled={disabled}
                    onPress={async () => await HandleMessage({ isUser: true, text: text })}
                >
                    <Text className='text-slate-900 -rotate-90 text-lg'>&#9947;</Text>
                </TouchableOpacity>
            </View>
            <View className='flex-1 justify-center items-center  mt-80 rounded-10'>
                <Modal
                    visible={modal}
                    transparent={true}
                    animationType='slide'
                    onRequestClose={() => setModal(!modal)}
                >
                    <View className='flex-1  items-center mt-96  bg-slate-100 border rounded-2xl ' >
                        <View className=' flex-row justify-end  self-end justify-self-start h-10 m-5'>
                            <TouchableOpacity onPress={() => setModal(!modal)}>
                                <Text className='text-slate-900 text-lg font-bold'>&#x2715;</Text>
                            </TouchableOpacity>
                        </View>
                        <View className='mt-10'>
                            {Models.map((m, i) => {
                                return (
                                    <TouchableOpacity key={i}
                                        onPress={() => setModel(Models[i])}
                                        className='flex flex-row  m-3'>
                                        <Text className='text-slate-900 text-2xl'>{m.model}</Text>
                                        {model.model == m.model ? <Text className='text-sky-700 text-2xl'> x</Text> : null}

                                    </TouchableOpacity>
                                )
                            })}
                        </View>
                    </View>
                </Modal>
            </View>

        </Container>
    )
}
const Gap: React.FC = () => {
    return (<View className='w-full h-10 m-10'></View>)
}

const Messages: React.FC<MessagesParams> = (items) => {
    return (<View className='p-2 relative'>
        {items.message.length > 0 ? items.message.map((item, i) => {

            return item.isUser ?
                (
                    <View key={i} className='w-full flex justify-end items-end'>

                        <View className='m-1.5 max-w-80 bg-slate-700 h-auto rounded-bl-xl rounded-br-0 rounded-tr-xl rounded-tl-xl p-4 '>
                            <Text className='text-slate-300 text-md'>{item.text}</Text>
                        </View>
                    </View>
                )
                :
                (
                    <View key={i} className='w-full flex justify-end items-start'>

                        <View className='m-1.5 max-w-80 bg-blue-950 h-auto rounded-bl-0 rounded-br-xl rounded-tr-xl rounded-tl-xl p-4'>
                            <Text className='text-sky-400 text-lg font-bold'>{item.model}</Text>
                            <View className='text-slate-400 text-lg '>{renderText(item.text)}</View>
                        </View>
                    </View>
                )


        }
        )
            : <View className='flex justify-center p-5 m-5 mt-40 rounded-xl'>
                <Text className='text-4xl font-bold text-orange-300'>Hi! I am PentaAi</Text>
                <Text className='text-xl font-bold text-slate-500'>Need me to do something?</Text>
            </View>}
    </View>
    )
}
export const LoadingMessage: React.FC<Loader> = (item) => {
    const Y = useRef(new Animated.Value(0)).current
    const delay = item.delay
    const hidden = 'hidden'
    const flex = 'flex'
    const IsAnimating: boolean = item.show
    useEffect(() => {
        const swing = (): void => {
            if (!IsAnimating) return;
            Animated.sequence([
                Animated.delay(delay),
                Animated.timing(Y, {
                    toValue: 2,
                    useNativeDriver: true,
                    duration: 200,
                    easing: Easing.inOut(Easing.ease),
                }),
                Animated.timing(Y, {
                    toValue: 0,
                    useNativeDriver: true,
                    duration: 200,
                    easing: Easing.inOut(Easing.ease),
                }),
                Animated.timing(Y, {
                    toValue: -2,
                    useNativeDriver: true,
                    duration: 200,
                    easing: Easing.inOut(Easing.ease),
                }),

            ]).start(() => swing())
        }
        swing()
    }, [Y, IsAnimating, item.show])

    return (
        <View className={`${item.show ? flex : hidden}`}>
            <Animated.Text style={{ transform: [{ translateY: Y }] }} className={'text-2xl text-slate-500'}>
                &#8226;
            </Animated.Text>
        </View>
    )
}

const Loading = (item: Load) => {
    const vis = item.show

    return (
        <View className={`m-1.5 w-10 bg-blue-950  rounded-bl-0 rounded-br-xl rounded-tr-xl rounded-tl-xl p-1 ${item.show ? 'flex flex-row items-center justify-center ' : 'hidden'}`}>

            <LoadingMessage show={vis} delay={0} />
            <LoadingMessage show={vis} delay={100} />
            <LoadingMessage show={vis} delay={200} />
        </View>
    )
}