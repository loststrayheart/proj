import React from 'react';
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
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Feather } from '@expo/vector-icons';

const GOOGLE_LOGO_URI =
    'https://media.wired.com/photos/5926ffe47034dc5f91bed4e8/3:2/w_1920,c_limit/google-logo.jpg';

const Login = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="light" />

            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                    style={styles.content}
                >
                    <Text style={styles.title}>Login</Text>

                    <View style={styles.formContainer}>

                        {/* Username or E-mail Input */}
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
                                placeholderTextColor="rgba(255, 255, 255, 0.55)"
                                autoCapitalize="none"
                            />
                        </View>

                        {/* Password Input */}
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
                                placeholderTextColor="rgba(255, 255, 255, 0.55)"
                                secureTextEntry
                            />
                        </View>

                        {/* Login Button */}
                        <TouchableOpacity
                            style={styles.loginButton}
                            activeOpacity={0.85}
                            onPress={() =>
                                navigation?.navigate('Homeuser')
                            }
                        >
                            <Text style={styles.loginButtonText}>
                                Login!
                            </Text>
                        </TouchableOpacity>

                        {/* Don't have an account? Sign up */}
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

                        {/* Or Divider */}
                        <Text style={styles.orText}>Or</Text>

                        {/* Continue with Google Button */}
                        <TouchableOpacity
                            style={styles.googleButton}
                            activeOpacity={0.85}
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

    loginButton: {
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 12,
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
        color: 'rgba(255, 255, 255, 0.9)',
        fontSize: 13,
    },

    signupLink: {
        color: 'rgba(255, 255, 255, 0.95)',
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