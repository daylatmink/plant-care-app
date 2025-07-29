import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { DrawerContentScrollView } from '@react-navigation/drawer'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { theme } from '../core/theme'

export default function CustomDrawerContent(props) {
    return (
        <DrawerContentScrollView {...props} contentContainerStyle={styles.container}>
            {/* Avatar & tên */}
            <View style={styles.profile}>
                <MaterialCommunityIcons
                    name="account-outline"
                    size={80}
                    color={theme.colors.primary}
                />
                <Text style={styles.name}>Theresa Langabeer</Text>
            </View>

            {/* Các mục menu */}
            {['Edit Account','Shop','Membership','Help','HomeKit'].map((label) => (
                <TouchableOpacity
                    key={label}
                    style={styles.item}
                    onPress={() => {
                        // ví dụ: props.navigation.navigate(...)
                        console.log(label)
                    }}
                >
                    <Text style={styles.itemText}>{label}</Text>
                </TouchableOpacity>
            ))}

            {/* Log Out */}
            <TouchableOpacity
                style={styles.item}
                onPress={() => console.log('Log Out')}
            >
                <Text style={[styles.itemText, { color: theme.colors.error }]}>
                    Log Out
                </Text>
            </TouchableOpacity>
        </DrawerContentScrollView>
    )
}

const styles = StyleSheet.create({
    container: { flex: 1, paddingTop: 20 },
    profile: { alignItems: 'center', marginBottom: 30 },
    name: { marginTop: 10, fontSize: 18, fontWeight: '600', color: theme.colors.primary },
    item: { paddingVertical: 12, paddingHorizontal: 20 },
    itemText: { fontSize: 16, color: theme.colors.primary },
})
