import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Image,
    KeyboardAvoidingView,
    Platform,
    TouchableWithoutFeedback,
    Keyboard,
    ScrollView,
    Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Feather } from '@expo/vector-icons';

import { supabase } from '../lib/supabase';

const GOOGLE_LOGO_URI =
    'https://media.wired.com/photos/5926ffe47034dc5f91bed4e8/3:2/w_1920,c_limit/google-logo.jpg';

const Register = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);

    const handleCreate = async () => {
        // =========================
        // Validate Username
        // =========================
        if (!username.trim()) {
            Alert.alert('แจ้งเตือน', 'กรุณากรอก Username');
            return;
        }

        if (username.trim().length > 25) {
            Alert.alert(
                'แจ้งเตือน',
                'Username ต้องมีความยาวไม่เกิน 25 ตัวอักษร'
            );
            return;
        }

        // =========================
        // Validate Email
        // =========================
        if (!email.trim()) {
            Alert.alert('แจ้งเตือน', 'กรุณากรอก Email');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email.trim())) {
            Alert.alert('แจ้งเตือน', 'กรุณากรอก Email ให้ถูกต้อง');
            return;
        }

        setLoading(true);

        try {
            const emailToSend = email.trim().toLowerCase();

            // =========================
            // DEBUG LOG
            // =========================
            console.log('========== SEND OTP ==========');
            console.log(
                'Supabase URL:',
                process.env.EXPO_PUBLIC_SUPABASE_URL
            );
            console.log('Email:', emailToSend);

            // =========================
            // Send OTP
            // =========================
            const { data, error } = await supabase.auth.signInWithOtp({
                email: emailToSend,
            });

            // =========================
            // DEBUG RESULT
            // =========================
            console.log('OTP data:', data);
            console.log('OTP error:', error);
            console.log('==============================');

            // =========================
            // Check Error
            // =========================
            if (error) {
                Alert.alert(
                    'เกิดข้อผิดพลาด',
                    error.message
                );
                return;
            }

            // =========================
            // Go to OTP page
            // =========================
            navigation.navigate('Otp', {
                email: emailToSend,
                username: username.trim(),
            });

        } catch (error) {
            console.log('Send OTP error:', error);

            Alert.alert(
                'เกิดข้อผิดพลาด',
                'ไม่สามารถส่ง OTP ได้ กรุณาลองใหม่อีกครั้ง'
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="light" />

            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <KeyboardAvoidingView
                    behavior={
                        Platform.OS === 'ios'
                            ? 'padding'
                            : undefined
                    }
                    style={styles.keyboardAvoid}
                >
                    <ScrollView
                        contentContainerStyle={styles.content}
                        showsVerticalScrollIndicator={false}
                        keyboardShouldPersistTaps="handled"
                    >
                        <Text style={styles.title}>
                            Create Account
                        </Text>

                        <View style={styles.formContainer}>

                            {/* Username */}
                            <View style={styles.inputContainer}>
                                <Feather
                                    name="user"
                                    size={20}
                                    color="#1A1A1A"
                                    style={styles.inputIcon}
                                />

                                <TextInput
                                    style={styles.input}
                                    placeholder="Username"
                                    placeholderTextColor="rgba(255, 255, 255, 0.55)"
                                    autoCapitalize="none"
                                    value={username}
                                    onChangeText={setUsername}
                                    maxLength={25}
                                    editable={!loading}
                                />
                            </View>

                            {/* Email */}
                            <View style={styles.inputContainer}>
                                <Feather
                                    name="mail"
                                    size={20}
                                    color="#1A1A1A"
                                    style={styles.inputIcon}
                                />

                                <TextInput
                                    style={styles.input}
                                    placeholder="E-mail"
                                    placeholderTextColor="rgba(255, 255, 255, 0.55)"
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    value={email}
                                    onChangeText={setEmail}
                                    editable={!loading}
                                />
                            </View>

                            {/* Create Button */}
                            <TouchableOpacity
                                style={[
                                    styles.createButton,
                                    loading && styles.disabledButton,
                                ]}
                                activeOpacity={0.85}
                                onPress={handleCreate}
                                disabled={loading}
                            >
                                <Text style={styles.createButtonText}>
                                    {loading
                                        ? 'Sending...'
                                        : 'Create'}
                                </Text>
                            </TouchableOpacity>

                            {/* Or */}
                            <Text style={styles.orText}>
                                Or
                            </Text>

                            {/* Google */}
                            <TouchableOpacity
                                style={styles.googleButton}
                                activeOpacity={0.85}
                                disabled={loading}
                            >
                                <Image
                                    source={{
                                        uri: GOOGLE_LOGO_URI,
                                    }}
                                    style={styles.googleIcon}
                                    resizeMode="contain"
                                />

                                <Text style={styles.googleButtonText}>
                                    Continue with Google
                                </Text>
                            </TouchableOpacity>

                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </TouchableWithoutFeedback>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#4F66A8',
    },

    keyboardAvoid: {
        flex: 1,
    },

    content: {
        flexGrow: 1,
        justifyContent: 'center',
        paddingHorizontal: 36,
        paddingVertical: 20,
    },

    title: {
        fontSize: 42,
        fontWeight: 'bold',
        color: '#FFFFFF',
        textAlign: 'center',
        marginBottom: 32,
    },

    formContainer: {
        width: '100%',
    },

    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1.5,
        borderColor: 'rgba(255, 255, 255, 0.65)',
        borderRadius: 8,
        height: 52,
        paddingHorizontal: 14,
        marginBottom: 16,
    },

    inputIcon: {
        marginRight: 10,
    },

    input: {
        flex: 1,
        fontSize: 16,
        color: '#FFFFFF',
    },

    createButton: {
        backgroundColor: '#FFFFFF',
        borderRadius: 24,
        height: 48,
        minWidth: 140,
        paddingHorizontal: 36,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 16,
        marginBottom: 8,
    },

    disabledButton: {
        opacity: 0.6,
    },

    createButtonText: {
        fontSize: 18,
        fontWeight: '600',
        color: '#4F66A8',
    },

    orText: {
        fontSize: 22,
        color: '#1A1A1A',
        textAlign: 'center',
        marginVertical: 20,
    },

    googleButton: {
        backgroundColor: '#F4F5F7',
        borderRadius: 12,
        paddingHorizontal: 18,
        height: 44,
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
    },

    googleIcon: {
        width: 28,
        height: 28,
        marginRight: 8,
    },

    googleButtonText: {
        fontSize: 13,
        color: '#3C4043',
        fontWeight: '500',
    },
});

export default Register;