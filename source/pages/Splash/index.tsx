import { useEffect } from 'react'
import { View } from 'react-native'
import axios from 'axios'
import { Server } from '../../const'
import { useNavigation } from '@react-navigation/native'
import { Container } from '../../components/Container'



export default () => {
    const nav: any = useNavigation()
    useEffect(() => {
        (
            async (): Promise<void> => {
                const res = await axios.get(`${Server}/check`)
                if (res) nav.navigate('main')
                else nav.navigate('login')
            })()


    }, [])
    return (
        <Container>
            <View></View>
        </Container>
    )
}