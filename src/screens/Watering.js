import React, { useState, useEffect } from 'react'
import { SafeAreaView, StyleSheet, View, Text, TouchableOpacity, Dimensions, Animated, Easing } from 'react-native'
import Background from '../components/Background'
import TopBar from '../components/TopBar'
import BottomBar from '../components/BottomBar'
import Svg, { Circle } from 'react-native-svg'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { theme } from '../core/theme'

const { width: screenWidth, height: screenHeight } = Dimensions.get('window')

export default function Watering({ navigation }) {
    const [waterLevel, setWaterLevel] = useState(45)
    const [selected, setSelected] = useState('light')
    const [isWaterIconAnimating, setIsWaterIconAnimating] = useState(false)
    const [isCircleAnimating, setIsCircleAnimating] = useState(false)

    const size = screenWidth * 0.5
    const radius = size / 2
    const buttonSize = screenWidth * 0.3

    const lightScale = useState(new Animated.Value(1))[0]
    const dimScale = useState(new Animated.Value(1))[0]
    const waterTapScale = useState(new Animated.Value(1))[0]
    const waterFloat = useState(new Animated.Value(0))[0]

    const waveAnimation1 = useState(new Animated.Value(0))[0]
    const waveAnimation2 = useState(new Animated.Value(0))[0]
    const waterLevelAnim = useState(new Animated.Value(waterLevel))[0]

    const splashScale = useState(new Animated.Value(0))[0]
    const splashOpacity = useState(new Animated.Value(0))[0]

    const wateringScale = useState(new Animated.Value(1))[0]
    const wateringOpacity = useState(new Animated.Value(0))[0]
    const pouringWater = useState(new Animated.Value(0))[0]

    const waterIconSize = size * 0.4

    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(waterFloat, { toValue: -3, duration: 800, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
                Animated.timing(waterFloat, { toValue: 3, duration: 800, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
                Animated.timing(waterFloat, { toValue: 0, duration: 800, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
            ])
        ).start()

        Animated.loop(
            Animated.timing(waveAnimation1, {
                toValue: 1,
                duration: 2000,
                easing: Easing.linear,
                useNativeDriver: false,
            })
        ).start()

        Animated.loop(
            Animated.timing(waveAnimation2, {
                toValue: 1,
                duration: 2500,
                easing: Easing.linear,
                useNativeDriver: false,
            })
        ).start()

        Animated.timing(waterLevelAnim, {
            toValue: waterLevel,
            duration: 1000,
            easing: Easing.out(Easing.ease),
            useNativeDriver: false,
        }).start()
    }, [waterLevel])

    const animateButton = (which) => {
        const target = which === 'light' ? lightScale : dimScale
        Animated.sequence([
            Animated.spring(target, { toValue: 1.1, useNativeDriver: true }),
            Animated.spring(target, { toValue: 1.0, friction: 3, useNativeDriver: true }),
        ]).start()
    }

    const handlePress = (which) => {
        setSelected(which)
        animateButton(which)
    }

    // Hàm xử lý khi click vào giọt nước
    const handleWaterTap = () => {
        // Tăng water level 5%, nhưng không vượt quá 100%
        const newWaterLevel = Math.min(waterLevel + 10, 100)
        setWaterLevel(newWaterLevel)

        // Animation cho giọt nước khi được click
        Animated.sequence([
            Animated.spring(waterTapScale, {
                toValue: 1.3,
                useNativeDriver: true,
                tension: 200,
                friction: 3
            }),
            Animated.spring(waterTapScale, {
                toValue: 1.0,
                useNativeDriver: true,
                tension: 200,
                friction: 5
            }),
        ]).start()

        // Animation hiệu ứng splash
        splashScale.setValue(0)
        splashOpacity.setValue(1)

        Animated.parallel([
            Animated.spring(splashScale, {
                toValue: 1.5,
                useNativeDriver: true,
                tension: 100,
                friction: 4
            }),
            Animated.timing(splashOpacity, {
                toValue: 0,
                duration: 800,
                useNativeDriver: true,
                easing: Easing.out(Easing.ease)
            })
        ]).start()

        // Animation hiệu ứng tưới nước từ trên xuống
        wateringOpacity.setValue(1)
        pouringWater.setValue(0)

        Animated.sequence([
            Animated.timing(pouringWater, {
                toValue: 1,
                duration: 600,
                useNativeDriver: true,
                easing: Easing.out(Easing.ease)
            }),
            Animated.timing(wateringOpacity, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
                easing: Easing.out(Easing.ease)
            })
        ]).start()
    }

    // Tạo path cho sóng nước
    const createWavePath = (animatedValue, amplitude = 8, frequency = 0.02) => {
        return animatedValue.interpolate({
            inputRange: [0, 1],
            outputRange: [
                `M 0,${radius} Q ${radius/4},${radius - amplitude} ${radius/2},${radius} T ${radius},${radius} L ${radius},${size} L 0,${size} Z`,
                `M 0,${radius} Q ${radius/4},${radius + amplitude} ${radius/2},${radius} T ${radius},${radius} L ${radius},${size} L 0,${size} Z`
            ]
        })
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.surface }}>
            <TopBar title="Watering" />

            <Background style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

                <View style={styles.waterContainer}>
                    {/* Vòng tròn viền với TouchableOpacity */}
                    <TouchableOpacity
                        style={[styles.circleContainer, { width: size, height: size, borderRadius: radius }]}
                        // onPress={setWaterLevel(60)}
                        activeOpacity={0.8}
                    >
                        <Animated.View
                            style={[
                                styles.circleInner,
                                {
                                    width: size,
                                    height: size,
                                    borderRadius: radius,
                                    transform: [{ scale: wateringScale }]
                                }
                            ]}
                        >
                            {/* Mực nước với animation */}
                            <Animated.View
                                style={[
                                    styles.waterLevel,
                                    {
                                        width: size - 4,
                                        height: waterLevelAnim.interpolate({
                                            inputRange: [0, 100],
                                            outputRange: [0, size - 4],
                                            extrapolate: 'clamp'
                                        }),
                                        borderRadius: radius - 2,
                                        bottom: waterLevelAnim.interpolate({
                                            inputRange: [0, 100],
                                            outputRange: [2, 2],
                                            extrapolate: 'clamp'
                                        })
                                    }
                                ]}
                            >
                                {/* Lớp nước cơ bản */}
                                <View style={styles.waterBase} />

                                {/* Hiệu ứng sóng đơn giản bằng CSS */}
                                <View style={styles.waveContainer}>
                                    <Animated.View
                                        style={[
                                            styles.wave1,
                                            {
                                                transform: [{
                                                    translateX: waveAnimation1.interpolate({
                                                        inputRange: [0, 1],
                                                        outputRange: [-(size-4), 0]
                                                    })
                                                }]
                                            }
                                        ]}
                                    />
                                    <Animated.View
                                        style={[
                                            styles.wave2,
                                            {
                                                transform: [{
                                                    translateX: waveAnimation2.interpolate({
                                                        inputRange: [0, 1],
                                                        outputRange: [0, size-4]
                                                    })
                                                }]
                                            }
                                        ]}
                                    />
                                </View>
                            </Animated.View>

                            {/* Hiệu ứng ánh sáng trên mặt nước */}
                            {waterLevel > 5 && (
                                <Animated.View
                                    style={[
                                        styles.waterHighlight,
                                        {
                                            width: size - 20,
                                            height: 8,
                                            borderRadius: 4,
                                            top: waterLevelAnim.interpolate({
                                                inputRange: [0, 100],
                                                outputRange: [size - 20, 10],
                                                extrapolate: 'clamp'
                                            })
                                        }
                                    ]}
                                />
                            )}

                            {/* 🌊 Hiệu ứng tưới nước từ trên xuống */}
                            <Animated.View
                                style={[
                                    styles.pouringWaterEffect,
                                    {
                                        opacity: wateringOpacity,
                                        transform: [
                                            { scaleY: pouringWater }
                                        ]
                                    }
                                ]}
                            >
                                {[...Array(8)].map((_, i) => (
                                    <Animated.View
                                        key={i}
                                        style={[
                                            styles.waterStream,
                                            {
                                                left: `${20 + i * 8}%`,
                                            }
                                        ]}
                                    />
                                ))}
                            </Animated.View>
                        </Animated.View>
                    </TouchableOpacity>

                    {/* 💧 Giọt nước ngay chính giữa */}
                    <Animated.View
                        style={[
                            styles.waterIconContainer,
                            {
                                transform: [
                                    { scale: waterTapScale },
                                    { translateY: waterFloat }
                                ],
                                width: size,
                                height: size,
                            }
                        ]}
                    >
                        <TouchableOpacity
                            onPress={handleWaterTap}
                            activeOpacity={0.7}
                            style={styles.waterIconTouchable}
                        >
                            <MaterialCommunityIcons
                                name="water"
                                size={waterIconSize}
                                color={theme.colors.primary}
                            />
                        </TouchableOpacity>

                        {/* 💥 Hiệu ứng splash */}
                        <Animated.View
                            pointerEvents="none"
                            style={[
                                styles.splashEffect,
                                {bottom: radius},
                                { transform: [{ scale: splashScale }], opacity: splashOpacity }
                            ]}
                        >
                            <MaterialCommunityIcons
                                name="water-outline"
                                size={size * 0.8}
                                color="rgba(79, 195, 247, 0.6)"
                            />
                        </Animated.View>
                    </Animated.View>

                    {/* Số % */}
                    <Text style={[styles.waterText, {
                        fontSize: size * 0.15,
                        top: size * 0.65,
                    }]}>{waterLevel}%</Text>
                </View>

                {/* ⚡ LIGHT & DIM buttons */}
                <View style={styles.buttonsContainer}>
                    {/* LIGHT */}
                    <Animated.View style={{ transform: [{ scale: lightScale }] }}>
                        <TouchableOpacity
                            style={[
                                styles.button,
                                {
                                    width: buttonSize,
                                    height: buttonSize,
                                    borderRadius: buttonSize * 0.25,
                                    backgroundColor: selected === 'light' ? theme.colors.primary : '#607D8B',
                                },
                            ]}
                            onPress={() => handlePress('light')}
                        >
                            <MaterialCommunityIcons
                                name="lightbulb-on-outline"
                                size={buttonSize * 0.4}
                                color="#fff"
                            />
                            <Text style={[styles.buttonText, { fontSize: buttonSize * 0.2 }]}>LIGHT</Text>

                            <View style={[styles.radioOuter, { top: buttonSize * 0.05 }]}>
                                {selected === 'light' && <View style={styles.radioInner} />}
                            </View>
                        </TouchableOpacity>
                    </Animated.View>

                    {/* DIM */}
                    <Animated.View style={{ transform: [{ scale: dimScale }] }}>
                        <TouchableOpacity
                            style={[
                                styles.button,
                                {
                                    width: buttonSize,
                                    height: buttonSize,
                                    borderRadius: buttonSize * 0.25,
                                    backgroundColor: selected === 'dim' ? theme.colors.primary : '#607D8B',
                                },
                            ]}
                            onPress={() => handlePress('dim')}
                        >
                            <MaterialCommunityIcons
                                name="brightness-6"
                                size={buttonSize * 0.4}
                                color="#fff"
                            />
                            <Text style={[styles.buttonText, { fontSize: buttonSize * 0.2 }]}>DIM</Text>

                            <View style={[styles.radioOuter, { top: buttonSize * 0.05 }]}>
                                {selected === 'dim' && <View style={styles.radioInner} />}
                            </View>
                        </TouchableOpacity>
                    </Animated.View>
                </View>
            </Background>

            <BottomBar navigation={navigation} current="water-outline" />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    waterContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: screenHeight * 0.05,
        position: 'relative',
    },
    circleContainer: {
        borderWidth: 8,
        borderColor: '#e0e0e0',
        backgroundColor: 'transparent',
        overflow: 'hidden',
        position: 'relative',
    },
    circleInner: {
        backgroundColor: '#f5f5f5',
        overflow: 'hidden',
        position: 'relative',
    },
    waterLevel: {
        position: 'absolute',
        backgroundColor: 'transparent',
        overflow: 'hidden',
    },
    waterBase: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        backgroundColor: '#4FC3F7',
        borderRadius: 'inherit',
    },
    waveContainer: {
        position: 'absolute',
        top: -5,
        left: 0,
        right: 0,
        height: 15,
        overflow: 'hidden',
    },
    wave1: {
        position: 'absolute',
        top: 0,
        width: '200%',
        height: 15,
        backgroundColor: 'rgba(100, 200, 255, 0.4)',
        borderRadius: 100,
    },
    wave2: {
        position: 'absolute',
        top: 2,
        width: '150%',
        height: 12,
        backgroundColor: 'rgba(80, 180, 240, 0.3)',
        borderRadius: 80,
    },
    waterHighlight: {
        position: 'absolute',
        left: 10,
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        opacity: 0.8,
    },
    pouringWaterEffect: {
        position: 'absolute',
        top: -100,
        left: 0,
        right: 0,
        height: 120,
        zIndex: 5,
    },
    waterStream: {
        position: 'absolute',
        width: 3,
        height: '100%',
        backgroundColor: 'rgba(79, 195, 247, 0.8)',
        borderRadius: 1.5,
        shadowColor: '#4FC3F7',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.8,
        shadowRadius: 3,
        elevation: 5,
    },
    waterIconContainer: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10,
    },
    waterIconTouchable: {
        padding: 10,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    waterText: {
        position: 'absolute',
        color: '#333',
        fontWeight: 'bold',
        textAlign: 'center',
        zIndex: 10,
    },
    buttonsContainer: {
        marginTop: screenHeight * 0.02,
        alignItems: 'center',
        gap: 20,
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10,
        elevation: 2,
    },
    buttonText: {
        marginTop: 6,
        color: '#fff',
        fontWeight: '600',
    },
    radioOuter: {
        position: 'absolute',
        bottom: 8,
        width: 16,
        height: 16,
        borderRadius: 8,
        borderWidth: 2,
        borderColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    radioInner: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#fff',
    },
    splashEffect: {
        position: 'absolute',
        top: screenWidth * 0.35 * 0.4,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9
    },
})