import React from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    TouchableWithoutFeedback,
    Keyboard,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Feather } from '@expo/vector-icons';

const Otp = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="dark" />

            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                    style={styles.content}
                >
                    <Text style={styles.title}>
                        Enter your OTP code{'\n'}to sign up
                    </Text>

                    <View style={styles.inputContainer}>
                        <Feather
                            name="lock"
                            size={24}
                            color="#1A1A1A"
                            style={styles.inputIcon}
                        />

                        <TextInput
                            style={styles.input}
                            keyboardType="number-pad"
                            placeholder="OTP code"
                            placeholderTextColor="#333333"
                        />
                    </View>

                    <TouchableOpacity
                        style={styles.verifyButton}
                        activeOpacity={0.85}
                        onPress={() => navigation?.navigate('Login')}
                    >
                        <Text style={styles.verifyButtonText}>
                            Verify
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.resendButton}
                        activeOpacity={0.6}
                    >
                        <Text style={styles.resendText}>
                            resend OTP
                        </Text>
                    </TouchableOpacity>
                </KeyboardAvoidingView>
            </TouchableWithoutFeedback>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },

    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 36,
    },

    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#1A1A1A',
        textAlign: 'center',
        marginBottom: 44,
        lineHeight: 40,
    },

    inputContainer: {
        width: '100%',
        height: 58,
        borderWidth: 1.5,
        borderColor: '#222222',
        borderRadius: 14,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        marginBottom: 38,
    },

    inputIcon: {
        marginRight: 12,
    },

    input: {
        flex: 1,
        fontSize: 18,
        color: '#1A1A1A',
    },

    verifyButton: {
        backgroundColor: '#4F66A8',
        borderRadius: 12,
        height: 48,
        minWidth: 148,
        paddingHorizontal: 32,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
    },

    verifyButtonText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },

    resendButton: {
        padding: 6,
    },

    resendText: {
        fontSize: 13,
        color: '#555555',
    },
});

export default Otp;