import { SafeAreaView, View } from "react-native"
import { styled } from 'nativewind'
const StyledView = styled(View)
interface ContainerProps {
    children: React.ReactNode;
}

export const Container: React.FC<ContainerProps> = ({ children }) => {

    return (
        <SafeAreaView className='w-full h-full'>
            <StyledView className="flex-1 bg-slate-900 p-2 relative">
                {children}
            </StyledView>
        </SafeAreaView>)

}