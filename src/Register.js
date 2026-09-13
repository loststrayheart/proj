import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

const Register = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="light" />
            <View style={styles.content}>
                <Text style={styles.title}>Create Account</Text>

                <View style={styles.formContainer}>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder="Username"
                            placeholderTextColor="rgba(255, 255, 255, 0.55)"
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder="E-mail"
                            placeholderTextColor="rgba(255, 255, 255, 0.55)"
                            keyboardType="email-address"
                            autoCapitalize="none"
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder="Password"
                            placeholderTextColor="rgba(255, 255, 255, 0.55)"
                            secureTextEntry
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder="Confirm password"
                            placeholderTextColor="rgba(255, 255, 255, 0.55)"
                            secureTextEntry
                        />
                    </View>

                    <TouchableOpacity
                        style={styles.createButton}
                        activeOpacity={0.85}
                        onPress={() => navigation?.navigate('Otp')}
                    >
                        <Text style={styles.createButtonText}>Create</Text>
                    </TouchableOpacity>

                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#4E64A6',
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 32,
    },
    title: {
        fontSize: 52,
        fontWeight: 'bold',
        color: '#FFFFFF',
        textAlign: 'center',
        marginBottom: 36,
    },
    formContainer: {
        width: '100%',
    },
    inputContainer: {
        borderWidth: 1.5,
        borderColor: 'rgba(255, 255, 255, 0.65)',
        borderRadius: 8,
        height: 52,
        justifyContent: 'center',
        paddingHorizontal: 16,
        marginBottom: 16,
    },
    input: {
        fontSize: 16,
        color: '#FFFFFF',
    },
    createButton: {
        backgroundColor: '#FFFFFF',
        borderRadius: 26,
        height: 52,
        minWidth: 160,
        paddingHorizontal: 40,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 20,
    },
    createButtonText: {
        fontSize: 18,
        fontWeight: '600',
        color: '#425C9E',
    },
    footerContainer: {
        alignItems: 'center',
        marginTop: 4,
    },
    footerText: {
        color: 'rgba(255, 255, 255, 0.85)',
        fontSize: 14,
    },
    signInText: {
        color: '#FFFFFF',
        fontWeight: '600',
        textDecorationLine: 'underline',
    },
});

export default Register;


