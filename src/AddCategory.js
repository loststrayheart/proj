import React from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Feather } from '@expo/vector-icons';

const AddCategory = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="dark" />
            <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity
                        style={styles.circleButton}
                        activeOpacity={0.7}
                        onPress={() => navigation?.goBack()}
                    >
                        <Feather name="arrow-left" size={24} color="#1E1E1E" />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.circleButton}
                        activeOpacity={0.7}
                        onPress={() => navigation?.navigate('Login')}
                    >
                        <Feather name="user" size={24} color="#1E1E1E" />
                    </TouchableOpacity>
                </View>

                {/* Title */}
                <Text style={styles.screenTitle}>Add Category</Text>

                {/* Genre Card */}
                <View style={styles.card}>
                    <Text style={styles.cardLabel}>Genre</Text>
                    <View style={styles.inputBox}>
                        <TextInput
                            style={styles.input}
                            placeholder=""
                            placeholderTextColor="#666666"
                        />
                    </View>
                    <TouchableOpacity
                        style={styles.addButton}
                        activeOpacity={0.85}
                    >
                        <Text style={styles.addButtonText}>Add</Text>
                    </TouchableOpacity>
                </View>

                {/* Mood Card */}
                <View style={styles.card}>
                    <Text style={styles.cardLabel}>Mood</Text>
                    <View style={styles.inputBox}>
                        <TextInput
                            style={styles.input}
                            placeholder=""
                            placeholderTextColor="#666666"
                        />
                    </View>
                    <TouchableOpacity
                        style={styles.addButton}
                        activeOpacity={0.85}
                    >
                        <Text style={styles.addButtonText}>Add</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F9FD',
    },
    scrollContent: {
        paddingHorizontal: 20,
        paddingTop: 16,
        paddingBottom: 40,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 24,
    },
    circleButton: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: '#FFFFFF',
        borderWidth: 1.5,
        borderColor: '#E8ECF2',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 6,
        elevation: 2,
    },
    screenTitle: {
        fontSize: 34,
        fontWeight: 'bold',
        color: '#556AB0',
        textAlign: 'center',
        marginBottom: 32,
    },
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 24,
        paddingHorizontal: 20,
        paddingTop: 22,
        paddingBottom: 20,
        marginBottom: 20,
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 2,
        alignItems: 'center',
    },
    cardLabel: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#111827',
        alignSelf: 'flex-start',
        marginBottom: 14,
        marginLeft: 4,
    },
    inputBox: {
        width: '100%',
        backgroundColor: '#CED9FE',
        borderRadius: 14,
        height: 52,
        paddingHorizontal: 16,
        justifyContent: 'center',
        marginBottom: 16,
    },
    input: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1E1E1E',
        height: '100%',
    },
    addButton: {
        backgroundColor: '#9BAEFF',
        borderRadius: 10,
        paddingVertical: 7,
        paddingHorizontal: 26,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#9BAEFF',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 2,
    },
    addButtonText: {
        fontSize: 15,
        fontWeight: '700',
        color: '#FFFFFF',
    },
});

export default AddCategory;
