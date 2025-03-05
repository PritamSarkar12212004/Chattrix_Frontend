import { View, Text, Modal, TextInput, Image } from 'react-native'
import React, { useState } from 'react'
import Icons from '@/src/constant/icons/Icons'
import ModalButton from '../button/ModalButton/ModalButton'

const EmailAddModal = ({ isVisible, setIsVisible }: any) => {
    const [email, setEmail] = useState("")
    const emailseter = (e: string) => {
        setEmail(e)
    }
    return (
        <Modal animationType='slide' visible={isVisible} transparent className=''
            onRequestClose={() => setIsVisible(false)}
            onDismiss={() => setIsVisible(false)}
        >
            <View className=' h-full w-full flex justify-center bg-black/60 items-center px-5'>
                <View className='w-full py-10 gap-4  px-5 bg-[#697565]/60 rounded-3xl'>
                    <Text className='text-white text-xl font-bold'>Add your Google Account</Text>
                    <View className=' flex flex-row gap-3'>
                        <Image source={Icons.Google} className='h-10 w-10 rounded-full' />
                        <TextInput onChangeText={(e) => emailseter(e)} keyboardType='email-address' keyboardAppearance='dark' className='bg-[#3C3D37] flex-auto h-12 rounded-xl placeholder:text-white px-3 text-lg font-semibold text-white' placeholder='add email' />
                    </View>
                    <View className='w-full flex items-center justify-center px-5 mt-5'>
                        <ModalButton email={email} />
                    </View>
                </View>
            </View>
        </Modal>
    )
}

export default EmailAddModal