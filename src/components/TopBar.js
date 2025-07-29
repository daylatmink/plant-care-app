import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { theme } from '../core/theme';
import { useNavigation } from '@react-navigation/native'
export default function TopBar({ title, onGridPress }) {
    const navigation = useNavigation()
    return (
        <View style={styles.topBar}>
            <TouchableOpacity onPress={() => onGridPress}>
                <Ionicons name="menu" size={28} color={theme.colors.primary} />
            </TouchableOpacity>

            <Text style={styles.title}>{title}</Text>

            <TouchableOpacity onPress={onGridPress}>
                <Ionicons name="grid" size={26} color={theme.colors.primary} />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    topBar: {
        marginTop: getStatusBarHeight(),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 15,
        backgroundColor: theme.colors.surface,
        width: '100%',
        elevation: 4,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 3,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: theme.colors.primary,
    },
});
