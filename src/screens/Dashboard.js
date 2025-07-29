import React from 'react'
import { SafeAreaView, StyleSheet, FlatList, Text, TouchableOpacity, View, Dimensions } from 'react-native'
import Background from '../components/Background'
import TopBar from '../components/TopBar'
import BottomBar from '../components/BottomBar'
import Svg, { Circle } from 'react-native-svg'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { theme } from '../core/theme'

const { width: screenWidth, height: screenHeight } = Dimensions.get('window')

// 🌸 Danh sách cây & icon từ MaterialCommunityIcons
const plants = [
    { id: '1', name: 'Rose', icon: 'flower', progress: 0.8 },
    { id: '2', name: 'Tulip', icon: 'flower-tulip', progress: 0.5 },
    { id: '3', name: 'Bonsai', icon: 'tree', progress: 0.2 },
    { id: '4', name: 'Orchid', icon: 'flower', progress: 0.6 },
    { id: '5', name: 'Cactus', icon: 'cactus', progress: 1.0 },
    { id: '6', name: 'Lily', icon: 'flower', progress: 0.4 },
    { id: '7', name: 'Sunflower', icon: 'flower', progress: 0.7 },
    { id: '8', name: 'Fern', icon: 'leaf', progress: 0.3 },
]

export default function Dashboard({ navigation }) {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.surface }}>
            {/* 🔝 Thanh menu trên cùng */}
            <TopBar
                title="Small Garden"
                onMenuPress={() => console.log('Menu pressed')}
                onGridPress={() => console.log('Grid pressed')}
            />

            {/* 🌱 Grid cây */}
            <Background style={{ flex: 1 }}>
                <FlatList
                    data={plants}
                    numColumns={2}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={styles.grid}
                    columnWrapperStyle={{ justifyContent: 'space-evenly' }}
                    renderItem={({ item }) => {
                        const size = screenWidth * 0.3       // Kích thước vòng tròn harvest
                        const strokeWidth = screenWidth * 0.015
                        const radius = (size - strokeWidth) / 2
                        const circumference = 2 * Math.PI * radius
                        const strokeDashoffset = circumference - (circumference * item.progress)

                        return (
                            <TouchableOpacity
                                style={[styles.card, { width: size, height: size, margin: screenWidth * 0.04 }]}
                                onPress={() => navigation.navigate('PlantDetail', { plant: {
                                        id: item.id, name: item.name, icon: item.icon,
                                        progress: item.progress,
                                        grows: 'Fast',
                                        currentDay: parseInt(45 * item.progress), totalDays: 45
                                    }})}
                            >
                                {/* Vòng harvest progress */}
                                <View style={[styles.progressContainer, { width: size, height: size, borderRadius: size / 2 }]}>
                                    <Svg height={size} width={size} style={styles.progressSvg}>
                                        <Circle
                                            stroke="#eee"
                                            fill="none"
                                            cx={size / 2}
                                            cy={size / 2}
                                            r={radius}
                                            strokeWidth={strokeWidth}
                                        />
                                        <Circle
                                            stroke={theme.colors.primary}
                                            fill="none"
                                            cx={size / 2}
                                            cy={size / 2}
                                            r={radius}
                                            strokeWidth={strokeWidth}
                                            strokeDasharray={`${circumference} ${circumference}`}
                                            strokeDashoffset={strokeDashoffset}
                                            strokeLinecap="round"
                                        />
                                    </Svg>

                                    {/* 🌸 Icon hoa */}
                                    <View style={styles.iconContainer}>
                                        <MaterialCommunityIcons
                                            name={item.icon}
                                            size={size * 0.5}
                                            color={theme.colors.primary}
                                        />
                                    </View>
                                </View>

                                {/* Tên hoa */}
                                <Text style={[styles.cardText, { fontSize: screenWidth * 0.038, marginTop: screenHeight * 0.01 }]}>
                                    {item.name}
                                </Text>
                            </TouchableOpacity>
                        )
                    }}
                />
            </Background>

            {/* 🔻 Thanh bottom bar */}
            <BottomBar navigation={navigation} current="leaf-outline" />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    grid: {
        paddingTop: screenHeight * 0.025,
        paddingBottom: screenHeight * 0.1,
        justifyContent: 'center',
    },
    card: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    progressContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        backgroundColor: theme.colors.surface,
        elevation: 3,
        shadowColor: '#000',
        shadowOpacity: 0.08,
        shadowOffset: { width: 0, height: screenHeight * 0.0025 },
        shadowRadius: screenWidth * 0.01,
    },
    progressSvg: {
        position: 'absolute',
        transform: [{ rotate: '-90deg' }],
    },
    iconContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardText: {
        fontWeight: '600',
        color: theme.colors.primary,
        textAlign: 'center',
    },
})
