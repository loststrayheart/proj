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

const AddSong = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="dark" />
            <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {/* Header (Back button on left, Avatar on right) */}
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
                        onPress={() => navigation?.navigate('AdminProfile')}
                    >
                        <Feather name="user" size={24} color="#1E1E1E" />
                    </TouchableOpacity>
                </View>

                {/* Form Card Container */}
                <View style={styles.cardContainer}>
                    <Text style={styles.formTitle}>Add Song</Text>

                    {/* Song name */}
                    <View style={styles.inputBox}>
                        <TextInput
                            style={styles.input}
                            placeholder="Song name"
                            placeholderTextColor="#2D3748"
                        />
                    </View>

                    {/* Artist */}
                    <View style={styles.inputBox}>
                        <TextInput
                            style={styles.input}
                            placeholder="Artist"
                            placeholderTextColor="#2D3748"
                        />
                    </View>

                    {/* Lyrics */}
                    <View style={[styles.inputBox, styles.lyricsBox]}>
                        <TextInput
                            style={[styles.input, styles.lyricsInput]}
                            placeholder="Lyrics"
                            placeholderTextColor="#2D3748"
                            multiline
                            textAlignVertical="top"
                        />
                    </View>

                    {/* Genre Dropdown Trigger */}
                    <TouchableOpacity
                        style={[styles.inputBox, styles.dropdownBox]}
                        activeOpacity={0.8}
                    >
                        <Text style={[styles.dropdownText, styles.placeholderText]}>
                            Genre
                        </Text>
                        <Feather name="chevron-down" size={24} color="#1E1E1E" />
                    </TouchableOpacity>

                    {/* Mood Dropdown Trigger */}
                    <TouchableOpacity
                        style={[styles.inputBox, styles.dropdownBox]}
                        activeOpacity={0.8}
                    >
                        <Text style={[styles.dropdownText, styles.placeholderText]}>
                            Mood
                        </Text>
                        <Feather name="chevron-down" size={24} color="#1E1E1E" />
                    </TouchableOpacity>

                    {/* Enter Button */}
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={styles.enterButton}
                            activeOpacity={0.85}
                            onPress={() => navigation?.goBack()}
                        >
                            <Text style={styles.enterButtonText}>Enter</Text>
                        </TouchableOpacity>
                    </View>
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
        marginBottom: 20,
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
    cardContainer: {
        backgroundColor: '#FFFFFF',
        borderRadius: 28,
        paddingHorizontal: 20,
        paddingVertical: 26,
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 12,
        elevation: 2,
    },
    formTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#111827',
        marginBottom: 22,
    },
    inputBox: {
        backgroundColor: '#D1DCFE',
        borderRadius: 14,
        paddingHorizontal: 18,
        height: 52,
        justifyContent: 'center',
        marginBottom: 16,
    },
    input: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1E1E1E',
    },
    lyricsBox: {
        height: 160,
        paddingVertical: 14,
    },
    lyricsInput: {
        height: '100%',
        lineHeight: 22,
    },
    dropdownBox: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    dropdownText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1E1E1E',
    },
    placeholderText: {
        color: '#1E1E1E',
    },
    buttonContainer: {
        alignItems: 'center',
        marginTop: 18,
        marginBottom: 6,
    },
    enterButton: {
        backgroundColor: '#91AAFD',
        borderRadius: 24,
        height: 48,
        minWidth: 140,
        paddingHorizontal: 36,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#91AAFD',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 3,
    },
    enterButtonText: {
        fontSize: 18,
        fontWeight: '700',
        color: '#FFFFFF',
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.4)',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 28,
    },
    modalContent: {
        width: '100%',
        maxHeight: '60%',
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        padding: 20,
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 10,
        elevation: 5,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#111827',
        marginBottom: 14,
        textAlign: 'center',
    },
    modalScroll: {
        maxHeight: 280,
    },
    modalItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 14,
        paddingHorizontal: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#F3F4F6',
    },
    modalItemSelected: {
        backgroundColor: '#EFF3FF',
        borderRadius: 8,
    },
    modalItemText: {
        fontSize: 16,
        color: '#374151',
        fontWeight: '500',
    },
    modalItemTextSelected: {
        color: '#4A60A4',
        fontWeight: '700',
    },
});

export default AddSong;
