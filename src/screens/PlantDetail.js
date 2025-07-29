import React from 'react'
import {SafeAreaView, StyleSheet, View, Text, TouchableOpacity, Dimensions, FlatList} from 'react-native'
import Svg, { Circle } from 'react-native-svg'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { theme } from '../core/theme'
import TopBar from "../components/TopBar";
import Background from "../components/Background";
import BottomBar from "../components/BottomBar";

const { width: screenWidth, height: screenHeight } = Dimensions.get('window')

export default function PlantDetail({ route, navigation }) {
    // Lấy object plant từ params
    const { plant } = route.params

    // Tính toán kích thước vòng progress
    const size = screenWidth * 0.5
    const strokeWidth = screenWidth * 0.02
    const radius = (size - strokeWidth) / 2
    const circumference = 2 * Math.PI * radius
    const strokeDashoffset = circumference - (circumference * plant.progress)

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.surface }}>
            {/* 🔝 Thanh menu trên cùng */}
            <TopBar
                title="Small Garden"
                onMenuPress={() => console.log('Menu pressed')}
                onGridPress={() => console.log('Grid pressed')}
            />

            {/* 🌱 Main Content */}
            <Background style={styles.background}>
                <View style={styles.contentContainer}>
                    {/* Vòng progress + icon */}
                    <View style={[styles.circleContainer, { width: size, height: size, borderRadius: size / 2 }]}>
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
                        <View style={styles.iconContainer}>
                            <MaterialCommunityIcons
                                name={plant.icon}
                                size={size * 0.4}
                                color={theme.colors.primary}
                            />
                        </View>
                    </View>

                    {/* Tên và ngày */}
                    <Text style={styles.name}>{plant.name}</Text>
                    <Text style={styles.day}>{`Day ${plant.currentDay} of ${plant.totalDays}`}</Text>

                    {/* Nút Harvest */}
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => console.log('Harvest', plant.name)}
                    >
                        <Text style={styles.buttonText}>Harvest</Text>
                    </TouchableOpacity>

                    {/* Thông tin chi tiết */}
                    <View style={styles.detailContainer}>
                        <View style={styles.detailRow}>
                            <Text style={styles.detailLabel}>Grows:</Text>
                            <Text style={styles.detailValue}>{plant.grows}</Text>
                        </View>
                        <View style={styles.detailRow}>
                            <Text style={styles.detailLabel}>Germinates in:</Text>
                            <Text style={styles.detailValue}>{plant.currentDay < 20 ? (20 - plant.currentDay) : 0} days</Text>
                        </View>
                    </View>
                </View>
            </Background>

            {/* 🔻 Thanh bottom bar */}
            <BottomBar navigation={navigation} current="leaf-outline" />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: 'flex-start', // Căn từ top thay vì space-evenly
        alignItems: 'center',
    },
    contentContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-evenly', // Di chuyển space-evenly vào đây
        paddingVertical: screenHeight * 0.05, // Thêm padding để tạo khoảng trống
        width: '100%',
    },
    circleContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.colors.surface,
        elevation: 4,
    },
    progressSvg: {
        position: 'absolute',
        transform: [{ rotate: '-90deg' }],
    },
    iconContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    name: {
        fontSize: screenWidth * 0.06,
        fontWeight: '600',
        color: theme.colors.primary,
        textAlign: 'center',
    },
    day: {
        fontSize: screenWidth * 0.05,
        color: theme.colors.text,
        textAlign: 'center',
    },
    button: {
        backgroundColor: theme.colors.primary,
        paddingVertical: screenHeight * 0.015,
        width: screenWidth * 0.6,
        borderRadius: 4,
        alignItems: 'center',
    },
    buttonText: {
        color: theme.colors.surface,
        fontSize: screenWidth * 0.045,
        fontWeight: '500',
    },
    detailContainer: {
        alignItems: 'center',
    },
    detailRow: {
        flexDirection: 'row',
        marginVertical: screenHeight * 0.008,
    },
    detailLabel: {
        fontWeight: '600',
        color: theme.colors.text,
        marginRight: 5,
    },
    detailValue: {
        color: theme.colors.text,
    }
})