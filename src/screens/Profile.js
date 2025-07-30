// Profile.js
import React from 'react'
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    TouchableOpacity,
    Dimensions,
} from 'react-native'
import Background from '../components/Background'
import TopBar from '../components/TopBar'
import BottomBar from '../components/BottomBar'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { theme } from '../core/theme'

// Lấy đúng chiều rộng màn hình
const { width: deviceWidth } = Dimensions.get('window')

export default function Profile({ navigation }) {
    const gardenName   = 'Small Garden'
    const firmwareVer  = '2.0.3'
    const serialNumber = 'esg01010012440'
    const lastReported = '5m'

    return (
        <SafeAreaView style={styles.safe}>
            <TopBar
                title="Small Garden"
                onMenuPress={() => console.log('Menu pressed')}
                onGridPress={() => console.log('Grid pressed')}
            />

            <Background style={styles.background}>
                <ScrollView
                    style={styles.scrollView}
                    contentContainerStyle={styles.container}
                >

                    {/* Firmware */}
                    <View style={styles.rowContainer}>
                        <TouchableOpacity
                            style={styles.rowContent}
                        >
                            <MaterialCommunityIcons
                                name="cube-outline"
                                size={24}
                                color={theme.colors.primary}
                            />
                            <View style={styles.rowText}>
                                <Text style={styles.rowLabel}>Innovation and Entrepreneurship</Text>
                                <Text style={styles.rowSubLabel}>
                                    Course code: CH2021
                                </Text>
                            </View>
                            <Text style={styles.rowAction}>Course</Text>
                        </TouchableOpacity>
                        <View style={styles.separator} />
                    </View>

                    <View style={styles.rowContainer}>
                        <View style={styles.rowContent}>
                            <MaterialCommunityIcons
                                name="code-braces"
                                size={24}
                                color={theme.colors.primary}
                            />
                            <View style={styles.rowText}>
                                <Text style={styles.rowLabel}>Tran Hoai Nam</Text>
                                <Text style={styles.rowSubLabel}>MSSV: 20230054</Text>
                            </View>
                            <Text style={styles.rowAction}>Developer</Text>
                        </View>
                        <View style={styles.separator} />
                    </View>
                    <View style={styles.rowContainer}>
                        <View style={styles.rowContent}>
                            <MaterialCommunityIcons
                                name="code-braces"
                                size={24}
                                color={theme.colors.primary}
                            />
                            <View style={styles.rowText}>
                                <Text style={styles.rowLabel}>Vu Tuan Minh</Text>
                                <Text style={styles.rowSubLabel}>MSSV: 20230053</Text>
                            </View>
                            <Text style={styles.rowAction}>Developer</Text>
                        </View>
                        <View style={styles.separator} />
                    </View>
                    <View style={styles.rowContainer}>
                        <View style={styles.rowContent}>
                            <MaterialCommunityIcons
                                name="account-tie"
                                size={24}
                                color={theme.colors.primary}
                            />
                            <View style={styles.rowText}>
                                <Text style={styles.rowLabel}>Nguyen Quy Duong</Text>
                                <Text style={styles.rowSubLabel}>MSSV: 202412476</Text>
                            </View>
                            <Text style={styles.rowAction}>Team leader</Text>
                        </View>
                        <View style={styles.separator} />
                    </View>
                    <View style={styles.rowContainer}>
                        <View style={styles.rowContent}>
                            <MaterialCommunityIcons
                                name="account"
                                size={24}
                                color={theme.colors.primary}
                            />
                            <View style={styles.rowText}>
                                <Text style={styles.rowLabel}>Le Khoi Manh</Text>
                                <Text style={styles.rowSubLabel}>MSSV: 20236233</Text>
                            </View>
                            <Text style={styles.rowAction}>Team member</Text>
                        </View>
                        <View style={styles.separator} />
                    </View>
                    <View style={styles.rowContainer}>
                        <View style={styles.rowContent}>
                            <MaterialCommunityIcons
                                name="account"
                                size={24}
                                color={theme.colors.primary}
                            />
                            <View style={styles.rowText}>
                                <Text style={styles.rowLabel}>Nguyen Xuan Dung</Text>
                                <Text style={styles.rowSubLabel}>MSSV: 20236128</Text>
                            </View>
                            <Text style={styles.rowAction}>Team member</Text>
                        </View>
                        <View style={styles.separator} />
                    </View>
                    <View style={styles.rowContainer}>
                        <View style={styles.rowContent}>
                            <MaterialCommunityIcons
                                name="account"
                                size={24}
                                color={theme.colors.primary}
                            />
                            <View style={styles.rowText}>
                                <Text style={styles.rowLabel}>Nguyen Quoc Anh</Text>
                                <Text style={styles.rowSubLabel}>MSSV: 20200032</Text>
                            </View>
                            <Text style={styles.rowAction}>Team member</Text>
                        </View>
                        <View style={styles.separator} />
                    </View>
                </ScrollView>
            </Background>

            <BottomBar navigation={navigation} current="profile-outline" />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    safe: {
        flex: 1,
        backgroundColor: theme.colors.surface,
    },
    background: {
        flex: 1,
        justifyContent: 'flex-start', // Căn từ top xuống
    },
    scrollView: {
        flex: 1,
        width: deviceWidth, // ScrollView có full width
    },
    container: {
        flexGrow: 1,
        paddingTop: 30,
        width: deviceWidth, // Đảm bảo container có full width
        // Removed backgroundColor: "red" for clean look
    },
    fieldSection: {
        paddingHorizontal: 20,
        marginBottom: 30,
    },
    fieldLabel: {
        fontSize: 14,
        color: theme.colors.primary,
    },
    fieldValueText: {
        fontSize: 16,
        color: theme.colors.primary,
        marginTop: 4,
    },

    rowContainer: {
        width: deviceWidth,    // separator full-width
    },
    rowContent: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 14,
    },
    rowText: {
        flex: 1,
        marginLeft: 16,
    },
    rowLabel: {
        fontSize: 16,
        color: theme.colors.primary,
    },
    rowSubLabel: {
        fontSize: 14,
        color: theme.colors.primary,
        marginTop: 2,
    },
    rowAction: {
        fontSize: 16,
        fontWeight: '600',
        color: theme.colors.primary,
    },

    separator: {
        height: StyleSheet.hairlineWidth,
        backgroundColor: theme.colors.border,
    },
})