import React, { useState } from 'react'
import {SafeAreaView, StyleSheet, View, Text, TouchableOpacity, Dimensions, FlatList} from 'react-native'
import Svg, { Circle } from 'react-native-svg'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { theme } from '../core/theme'
import TopBar from "../components/TopBar";
import Background from "../components/Background";
import BottomBar from "../components/BottomBar";
import Slider from '@react-native-community/slider'
import { ScrollView } from 'react-native'

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

    const [lightLevel, setLightLevel] = useState(30);
    const [tempLight, setTempLight] = useState(30);

    const [humidityLevel, setHumidityLevel] = useState(45);
    const [tempHumidity, setTempHumidity] = useState(45);

    const [phLevel, setPhLevel] = useState(7);
    const [tempPh, setTempPh] = useState(7);


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
                <ScrollView
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false} >
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

                        {/* Slider */}
                        <View style={styles.slidersContainer}>

                            {/* 🌞 Slider ánh sáng */}
                            <View style={styles.sliderSection}>
                                <Text style={styles.sliderLabel}>
                                    Nhiệt độ: {tempLight.toFixed(0)}℃
                                </Text>
                                <View style={styles.sliderRow}>
                                    <MaterialCommunityIcons
                                        name="white-balance-sunny"
                                        size={20}
                                        color="#FFA000"
                                        style={styles.sliderIcon}
                                    />
                                    <Slider
                                        style={styles.slider}
                                        minimumValue={25}
                                        maximumValue={40}
                                        step={0.1}
                                        value={lightLevel}                         // giá trị thực
                                        onValueChange={(val) => setTempLight(val)} // update khi kéo
                                        onSlidingComplete={(val) => setLightLevel(val)} // chỉ set chính thức khi thả tay
                                        minimumTrackTintColor="#FFD700"
                                        maximumTrackTintColor="#ddd"
                                        thumbTintColor="#FFD700"
                                    />
                                </View>
                            </View>

                            {/* 💧 Slider độ ẩm */}
                            <View style={styles.sliderSection}>
                                <Text style={styles.sliderLabel}>
                                    Độ ẩm: {tempHumidity.toFixed(0)}%
                                </Text>
                                <View style={styles.sliderRow}>
                                    <MaterialCommunityIcons
                                        name="water-percent"
                                        size={20}
                                        color="#4FC3F7"
                                        style={styles.sliderIcon}
                                    />
                                    <Slider
                                        style={styles.slider}
                                        minimumValue={0}
                                        maximumValue={100}
                                        step={1}
                                        value={humidityLevel}
                                        onValueChange={(val) => setTempHumidity(val)}
                                        onSlidingComplete={(val) => setHumidityLevel(val)}
                                        minimumTrackTintColor="#4FC3F7"
                                        maximumTrackTintColor="#ddd"
                                        thumbTintColor="#4FC3F7"
                                    />
                                </View>
                            </View>

                            {/* ⚗️ Slider pH */}
                            <View style={styles.sliderSection}>
                                <Text style={styles.sliderLabel}>
                                    Độ pH: {tempPh.toFixed(1)}
                                </Text>
                                <View style={styles.sliderRow}>
                                    <MaterialCommunityIcons
                                        name="flask-outline"
                                        size={20}
                                        color="#8BC34A"
                                        style={styles.sliderIcon}
                                    />
                                    <Slider
                                        style={styles.slider}
                                        minimumValue={0}
                                        maximumValue={14}
                                        step={0.1}
                                        value={phLevel}
                                        onValueChange={(val) => setTempPh(val)}
                                        onSlidingComplete={(val) => setPhLevel(val)}
                                        minimumTrackTintColor="#8BC34A"
                                        maximumTrackTintColor="#ddd"
                                        thumbTintColor="#8BC34A"
                                    />
                                </View>
                            </View>
                        </View>


                        <View style={styles.nutrientContainer}>
                            <View style={[styles.nutrientChip, { backgroundColor: '#FFE082' }]}>
                                <Text style={styles.nutrientText}>K: 150 ppm</Text>
                            </View>
                            <View style={[styles.nutrientChip, { backgroundColor: '#B3E5FC' }]}>
                                <Text style={styles.nutrientText}>Na: 30 ppm</Text>
                            </View>
                            <View style={[styles.nutrientChip, { backgroundColor: '#C8E6C9' }]}>
                                <Text style={styles.nutrientText}>P: 45 ppm</Text>
                            </View>
                        </View>


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
                </ScrollView>
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
        justifyContent: 'flex-start', // Thay đổi từ space-evenly thành flex-start
        paddingVertical: screenHeight * 0.02, // Giảm padding để icon cây gần TopBar hơn
        width: '100%',
    },
    circleContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.colors.surface,
        elevation: 4
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
        marginTop: 20, // Thêm khoảng cách với vòng tròn
    },
    day: {
        fontSize: screenWidth * 0.05,
        color: theme.colors.text,
        textAlign: 'center',
        marginBottom: 30, // Thêm khoảng cách với phần slider
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
    },
    slidersContainer: {
        marginTop: 20,
        width: '80%',
    },
    sliderSection: {
        marginVertical: 15,

    },
    sliderRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5,
    },
    sliderIcon: {
        marginRight: 0, // Giảm từ 12 xuống 8 để icon gần slider hơn
    },
    slider: {
        flex: 1,
        height: 40,
    },
    sliderLabel: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginBottom: 5,
    },
    nutrientContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 40, // Thêm khoảng cách với phần slider
        gap: 10,               // khoảng cách giữa các chip (React Native 0.71+ mới hỗ trợ)
    },
    nutrientChip: {
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 2,          // bóng nhẹ cho chip
    },
    nutrientText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#333',
    },
    scrollContent: {
        alignItems: 'center',
        paddingVertical: screenHeight * 0.05,
        paddingBottom: 50,   // thêm khoảng trống dưới để không bị dính sát BottomBar
    }

})