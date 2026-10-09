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
    Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Feather } from '@expo/vector-icons';
import { supabase } from '../lib/supabase';

const GOOGLE_LOGO_URI =
    'https://media.wired.com/photos/5926ffe47034dc5f91bed4e8/3:2/w_1920,c_limit/google-logo.jpg';

const Login = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        const input = email.trim();

        if (!input || !password) {
            Alert.alert(
                'แจ้งเตือน',
                'กรุณากรอก Username หรือ Email และ Password'
            );
            return;
        }

        setLoading(true);

        try {
            const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input);
            let loginEmail;

            if (isEmail) {
                // กรอก Email โดยตรง
                loginEmail = input.toLowerCase();
            } else {
                // กรอก Username: ค้นหา Email ก่อน
                const { data: foundEmail, error: lookupError } =
                    await supabase.rpc('find_login_email', {
                        input_username: input,
                    });

                if (lookupError) {
                    console.log('Username lookup error:', lookupError);

                    Alert.alert(
                        'เข้าสู่ระบบไม่สำเร็จ',
                        'ไม่สามารถค้นหา Username ได้ กรุณาลองใหม่'
                    );
                    return;
                }

                if (!foundEmail) {
                    Alert.alert(
                        'เข้าสู่ระบบไม่สำเร็จ',
                        'ไม่พบ Username นี้'
                    );
                    return;
                }

                loginEmail = foundEmail;
            }

            // ตรวจสอบ Email และ Password ด้วย Supabase Auth
            const { data, error } =
                await supabase.auth.signInWithPassword({
                    email: loginEmail,
                    password,
                });

            if (error) {
                console.log('Login error:', error.message);

                Alert.alert(
                    'เข้าสู่ระบบไม่สำเร็จ',
                    'Username/Email หรือ Password ไม่ถูกต้อง หรือบัญชียังไม่ได้ยืนยันอีเมล'
                );
                return;
            }

            if (data.session) {
                navigation?.navigate('Homeuser');
            }
        } catch (error) {
            console.log('Unexpected login error:', error);

            Alert.alert(
                'เกิดข้อผิดพลาด',
                'กรุณาลองใหม่อีกครั้ง'
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
                        Platform.OS === 'ios' ? 'padding' : undefined
                    }
                    style={styles.content}
                >
                    <Text style={styles.title}>Login</Text>

                    <View style={styles.formContainer}>
                        {/* Username or Email */}
                        <View style={styles.inputContainer}>
                            <Feather
                                name="user"
                                size={20}
                                color="#1A1A1A"
                                style={styles.inputIcon}
                            />

                            <TextInput
                                style={styles.input}
                                placeholder="Username or E-mail"
                                placeholderTextColor="rgba(255,255,255,0.55)"
                                keyboardType="email-address"
                                autoCapitalize="none"
                                autoCorrect={false}
                                value={email}
                                onChangeText={setEmail}
                                editable={!loading}
                            />
                        </View>

                        {/* Password */}
                        <View style={styles.inputContainer}>
                            <Feather
                                name="lock"
                                size={20}
                                color="#1A1A1A"
                                style={styles.inputIcon}
                            />

                            <TextInput
                                style={styles.input}
                                placeholder="Password"
                                placeholderTextColor="rgba(255,255,255,0.55)"
                                secureTextEntry
                                autoCapitalize="none"
                                value={password}
                                onChangeText={setPassword}
                                editable={!loading}
                            />
                        </View>

                        {/* Login Button */}
                        <TouchableOpacity
                            style={[
                                styles.loginButton,
                                loading && styles.disabledButton,
                            ]}
                            activeOpacity={0.85}
                            onPress={handleLogin}
                            disabled={loading}
                        >
                            <Text style={styles.loginButtonText}>
                                {loading ? 'Logging in...' : 'Login!'}
                            </Text>
                        </TouchableOpacity>

                        {/* Sign up */}
                        <View style={styles.signupContainer}>
                            <Text style={styles.signupText}>
                                Don't have an account?{' '}
                                <Text
                                    style={styles.signupLink}
                                    onPress={() =>
                                        navigation?.navigate('Register')
                                    }
                                >
                                    Sign up
                                </Text>
                            </Text>
                        </View>

                        {/* Divider */}
                        <Text style={styles.orText}>Or</Text>

                        {/* Google button - UI only */}
                        <TouchableOpacity
                            style={styles.googleButton}
                            activeOpacity={0.85}
                            disabled={loading}
                        >
                            <Image
                                source={{ uri: GOOGLE_LOGO_URI }}
                                style={styles.googleIcon}
                                resizeMode="contain"
                            />

                            <Text style={styles.googleButtonText}>
                                Continue with Google
                            </Text>
                        </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>
            </TouchableWithoutFeedback>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#8E2C2C',
    },

    content: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 36,
    },

    title: {
        fontSize: 52,
        fontWeight: 'bold',
        color: '#FFFFFF',
        textAlign: 'center',
        marginBottom: 44,
    },

    formContainer: {
        width: '100%',
    },

    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1.5,
        borderColor: 'rgba(255,255,255,0.65)',
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

    loginButton: {
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 12,
    },

    disabledButton: {
        opacity: 0.6,
    },

    loginButtonText: {
        fontSize: 19,
        fontWeight: '500',
        color: '#2B2B2B',
    },

    signupContainer: {
        alignItems: 'center',
        marginTop: 2,
    },

    signupText: {
        color: 'rgba(255,255,255,0.9)',
        fontSize: 13,
    },

    signupLink: {
        color: 'rgba(255,255,255,0.95)',
        fontWeight: '400',
    },

    orText: {
        fontSize: 22,
        color: '#1A1A1A',
        textAlign: 'center',
        marginVertical: 22,
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

export default Login;