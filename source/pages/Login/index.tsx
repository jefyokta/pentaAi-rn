import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native'
import { Container } from '../../components/Container'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { Server } from '../../const'
import { useNavigation } from '@react-navigation/native'


interface Userdata {
    username: string,
    password: string
}

export const Login: React.FC = () => {
    const nav: any = useNavigation()

    const [user, setuser] = useState<Userdata>()
    const [disabled, setdisbled] = useState(true)
    const [username, setusername] = useState<string>('')
    const [pass, setpass] = useState<string>('')


    const HitLogin = async (): Promise<void> => {

        try {

            const result = await axios.post(`${Server}/login`, { username, password: pass })
            setTimeout(() => {
                // masukin penghilang loading
                setTimeout(() => {
                    nav.replace('main')


                }, 100);
            }, 2000);
            console.log(result)

        } catch (error: any) {
            // Alert.alert('err')
            if (error.response.status == 401) {
                Alert.alert('hmmm kamu belum beli, coba selesaikan transaksi di https://penta.store')
            }
            console.log(error.response.text)

        }


    }

    const hndlebuttun: Function = (): void => {
        if (pass == '' || username == '') {
            setdisbled(true)

        }
        else {
            setdisbled(false)
        }
    }
    const handledata: Function = (): void => {
        setuser({ username: username, password: pass })
    }

    useEffect(() => {
        handledata()
        hndlebuttun()

    }, [username, pass])
    return (
        <Container>
            <View className='flex-1 justify-center items-center'>
                <View className='w-80 p-10 bg-slate-400/10 h-96 rounded-lg'>
                    <View className='border-b pb-2 border-sky-100/10'>
                        <Text className='text-slate-300 text-center text-orange-300 text-xl mb-1'>Login</Text>
                        <Text className=' text-center text-sky-300/50 text-md'>Login with Your PentaAccount</Text>
                    </View>
                    <View>
                        <TextInput className='border m-2 rounded-lg border-slate-100/20 p-2 bg-slate-400/10' placeholderTextColor={'rgba(255,255,255,0.4)'} placeholder='Username'
                            onChangeText={(text) => setusername(text)} />
                        <TextInput className='border m-2 rounded-lg border-slate-100/20 p-2 bg-slate-400/10' placeholderTextColor={'rgba(255,255,255,0.4)'} placeholder='Password' secureTextEntry
                            onChangeText={(text) => setpass(text)} />
                        <TouchableOpacity className={`${disabled ? 'bg-sky-800' : 'bg-sky-600'} m-2 rounded-lg  p-2 `} disabled={disabled}
                            onPress={async () => await HitLogin()}>
                            <Text className='text-slate-950 text-center'>Login</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Container>
    )


}