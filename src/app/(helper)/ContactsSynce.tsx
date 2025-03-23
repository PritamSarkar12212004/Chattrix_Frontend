import { View, Text, ScrollView, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import SynceContactNavigation from "@/src/components/main/navigation/SynceContactNavigation";
import * as Contacts from "expo-contacts";
import ContactSearch from "@/src/components/main/search/ContactSearch";
import ContactSenderCard from "@/src/components/main/card/ContactSenderCard";

const ContactsSynce = () => {
    const [contactList, setContactList] = useState([]);
    const [searchInput, setSearchInput] = useState("");

    const synceContact = async () => {
        const { status } = await Contacts.requestPermissionsAsync();
        if (status === "granted") {
            const { data } = await Contacts.getContactsAsync({
                fields: [Contacts.Fields.PhoneNumbers],
            });

            if (data.length > 0) {
                const contact = data;
                setContactList(contact);
            }
        }
    };

    useEffect(() => {
        synceContact();
    }, []);
    const filteredContacts = contactList.filter((contact) => {
        const name = contact.name?.toLowerCase() || "";
        const phoneNumber = contact.phoneNumbers?.[0]?.number?.toLowerCase() || "";
        const searchTerm = searchInput.toLowerCase();

        return name.includes(searchTerm) || phoneNumber.includes(searchTerm);
    });
    return (
        <SafeAreaView className="bg-[#2CB1A9] w-full flex-1">
            <SynceContactNavigation synceContact={synceContact} />
            <View className=" flex w-full px-3 mt-5">
                <ContactSearch setSearchInput={setSearchInput} />
            </View>
            <View className="flex w-full flex-1 bg-[#2CB1A9] px-3 mt-5 ">
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={filteredContacts}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => <ContactSenderCard item={item} />}
                    ListEmptyComponent={
                        <View className="items-center mt-10">
                            <Text className="text-white text-lg">No contacts found</Text>
                        </View>
                    }
                />
            </View>
        </SafeAreaView>
    );
};

export default ContactsSynce;
