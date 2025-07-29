import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../core/theme';

export default function BottomBar({ navigation , current }) {
    return (
        <View style={styles.container}>

            {/* 📅 Calendar tab */}
            <TouchableOpacity onPress={() => navigation.navigate('Watering')} style={styles.iconBtn}>
                <Ionicons name="water-outline" size={28} color={current === "water-outline" ? theme.colors.primary : "#777"} />
            </TouchableOpacity>

            {/* 🌱 Dashboard tab */}
            <TouchableOpacity onPress={() => navigation.navigate('Dashboard')} style={styles.iconBtn}>
                <Ionicons name="leaf-outline" size={28} color={current === "leaf-outline" ? theme.colors.primary : "#777"} />
            </TouchableOpacity>

            {/* ⚙ Settings tab */}
            <TouchableOpacity onPress={() => navigation.navigate('Profile')} style={styles.iconBtn}>
                <Ionicons name="person-outline" size={28} color={current === "profile-outline" ? theme.colors.primary : "#777"} />
            </TouchableOpacity>

            {/* 👤 Profile tab */}
            {/*<TouchableOpacity onPress={() => navigation.navigate('Profile')} style={styles.iconBtn}>*/}
            {/*    <Ionicons name="person-outline" size={28} color="#777" />*/}
            {/*</TouchableOpacity>*/}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: theme.colors.surface,
        paddingVertical: 10,
        borderTopWidth: 1,
        borderTopColor: '#ddd',
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: 65,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowOffset: { width: 0, height: -1 },
        shadowRadius: 2,
        elevation: 3,
    },
    iconBtn: {
        alignItems: 'center',
        justifyContent: 'center',
    },
});
