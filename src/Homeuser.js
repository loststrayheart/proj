import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    Alert,
    Platform,
    ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Feather } from '@expo/vector-icons';
import {
    useAudioRecorder,
    requestRecordingPermissionsAsync,
    setAudioModeAsync,
    RecordingPresets,
    IOSOutputFormat,
    AudioQuality,
} from 'expo-audio';
import * as FileSystem from 'expo-file-system/legacy';

// ตั้งค่าการอัดเสียงให้รองรับ Google Speech-to-Text
const RECORDING_OPTIONS =
    Platform.OS === 'ios'
        ? {
            ...RecordingPresets.HIGH_QUALITY,
            extension: '.wav',
            sampleRate: 16000,
            numberOfChannels: 1,
            ios: {
                outputFormat: IOSOutputFormat.LINEARPCM,
                audioQuality: AudioQuality.HIGH,
                linearPCMBitDepth: 16,
                linearPCMIsBigEndian: false,
                linearPCMIsFloat: false,
            },
        }
        : {
            ...RecordingPresets.HIGH_QUALITY,
            extension: '.amr',
            sampleRate: 16000,
            numberOfChannels: 1,
            bitRate: 23850,
            android: {
                outputFormat: 'amrwb',
                audioEncoder: 'amr_wb',
            },
        };

const GOOGLE_AUDIO_CONFIG =
    Platform.OS === 'ios'
        ? { encoding: 'LINEAR16', sampleRateHertz: 16000 }
        : { encoding: 'AMR_WB', sampleRateHertz: 16000 };

const Homeuser = ({ navigation, route }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [showFilters, setShowFilters] = useState(false);
    const [forYouList, setForYouList] = useState([]);
    const [isRecording, setIsRecording] = useState(false);
    const [isTranscribing, setIsTranscribing] = useState(false);

    const recorder = useAudioRecorder(RECORDING_OPTIONS);

    const startRecording = async () => {
        try {
            const permission = await requestRecordingPermissionsAsync();
            if (!permission.granted) {
                Alert.alert('คำเตือน', 'กรุณาอนุญาตการใช้งานไมโครโฟน');
                return;
            }
            await setAudioModeAsync({ allowsRecording: true, playsInSilentMode: true });
            await recorder.prepareToRecordAsync();
            recorder.record();
            setIsRecording(true);
        } catch (err) {
            console.error('Failed to start recording:', err);
            Alert.alert('เกิดข้อผิดพลาด', 'ไม่สามารถเปิดไมโครโฟนได้');
        }
    };

    const stopRecording = async () => {
        setIsRecording(false);
        setIsTranscribing(true);
        try {
            await recorder.stop();
            await setAudioModeAsync({ allowsRecording: false });
            const uri = recorder.uri;
            if (!uri) throw new Error('ไม่พบไฟล์เสียง');

            const base64Audio = await FileSystem.readAsStringAsync(uri, {
                encoding: FileSystem.EncodingType.Base64,
            });

            const apiKey = process.env.EXPO_PUBLIC_GOOGLE_SPEECH_API_KEY;
            if (!apiKey) {
                Alert.alert('ข้อผิดพลาด', 'ไม่พบ API key (ลอง npx expo start -c)');
                return;
            }

            const response = await fetch(
                `https://speech.googleapis.com/v1/speech:recognize?key=${apiKey}`,
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        config: { ...GOOGLE_AUDIO_CONFIG, languageCode: 'th-TH' },
                        audio: { content: base64Audio },
                    }),
                }
            );

            const data = await response.json();
            console.log('STT response:', JSON.stringify(data));

            if (data.error) {
                Alert.alert('Google API Error', data.error.message);
            } else if (data.results?.length > 0) {
                const transcript = data.results[0].alternatives?.[0]?.transcript?.trim() || '';
                setSearchQuery(transcript);
            } else {
                Alert.alert('แจ้งเตือน', 'ไม่พบเสียงพูด หรือไม่สามารถแปลงเสียงได้');
            }
        } catch (error) {
            console.error('Speech to text error:', error);
            Alert.alert('ข้อผิดพลาด', String(error?.message || error));
        } finally {
            setIsTranscribing(false);
        }
    };

    const handleMicPress = () => {
        if (isTranscribing) return;
        if (isRecording) {
            stopRecording();
        } else {
            startRecording();
        }
    };

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
                        activeOpacity={0.7}
                        onPress={() => navigation?.navigate('History')}
                    >
                        <Text style={styles.historyText}>History</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.avatarButton}
                        activeOpacity={0.7}
                        onPress={() => navigation?.navigate('Profile', {
                            userId: route?.params?.userId,
                            username: route?.params?.username,
                        })}
                    >
                        <Feather name="user" size={24} color="#111111" />
                    </TouchableOpacity>
                </View>

                {/* App Title */}
                <Text style={styles.appTitle}>
                    Lyri<Text style={styles.appTitleHighlight}>Seek</Text>
                </Text>

                {/* For You Section */}
                <View style={styles.forYouContainer}>
                    <Text style={styles.forYouTitle}>For You</Text>

                    <View style={styles.forYouCardBox}>
                        {forYouList.length > 0 ? (
                            forYouList.map((song, index) => (
                                <TouchableOpacity
                                    key={song.id || index}
                                    style={styles.songItem}
                                    activeOpacity={0.8}
                                    onPress={() => navigation?.navigate('Result')}
                                >
                                    <View style={styles.cardPlaceholder} />
                                    <Text style={styles.songTitle} numberOfLines={1}>
                                        {song.title}
                                    </Text>
                                </TouchableOpacity>
                            ))
                        ) : (
                            /* Placeholder UI when waiting for DB */
                            <>
                                <TouchableOpacity
                                    style={styles.songItem}
                                    activeOpacity={0.8}
                                    onPress={() => navigation?.navigate('Result')}
                                >
                                    <View style={styles.cardPlaceholder} />
                                    <Text style={styles.songTitle} numberOfLines={1}>
                                        Song Title
                                    </Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={styles.songItem}
                                    activeOpacity={0.8}
                                    onPress={() => navigation?.navigate('Result')}
                                >
                                    <View style={styles.cardPlaceholder} />
                                    <Text style={styles.songTitle} numberOfLines={1}>
                                        Song Title
                                    </Text>
                                </TouchableOpacity>
                            </>
                        )}
                    </View>
                </View>

                {/* Search & Filter Section */}
                <View style={styles.searchSection}>
                    <View style={styles.searchBar}>
                        <Feather name="search" size={22} color="#C24A3B" style={styles.searchIcon} />
                        <View style={styles.searchInputWrapper}>
                            <TextInput
                                style={styles.searchInput}
                                placeholder="Search for music"
                                placeholderTextColor="#777777"
                                textAlign="center"
                                value={searchQuery}
                                onChangeText={setSearchQuery}
                                onSubmitEditing={() => navigation?.navigate('Result')}
                            />
                            <Text style={styles.searchSubtext}>lyrics/genre/mood</Text>
                        </View>
                        <TouchableOpacity
                            activeOpacity={0.7}
                            style={[styles.micButton, isRecording && styles.micButtonRecording]}
                            onPress={handleMicPress}
                            disabled={isTranscribing}
                        >
                            {isTranscribing ? (
                                <ActivityIndicator size="small" color="#C24A3B" />
                            ) : (
                                <Feather
                                    name={isRecording ? 'square' : 'mic'}
                                    size={22}
                                    color={isRecording ? '#E53E3E' : '#C24A3B'}
                                />
                            )}
                        </TouchableOpacity>
                    </View>

                    {/* Filter Toggle Button */}
                    <TouchableOpacity
                        style={[styles.filterButton, showFilters && styles.filterButtonActive]}
                        activeOpacity={0.8}
                        onPress={() => setShowFilters(!showFilters)}
                    >
                        <Feather name="filter" size={14} color="#C24A3B" style={styles.filterIcon} />
                        <Text style={styles.filterText}>FILTERS</Text>
                    </TouchableOpacity>

                    {/* Collapsible Filter Panel (empty - ready for DB) */}
                    {showFilters && (
                        <View style={styles.filterPanel}>
                            <TouchableOpacity
                                style={styles.applyButton}
                                activeOpacity={0.85}
                                onPress={() => navigation?.navigate('Result')}
                            >
                                <Text style={styles.applyButtonText}>apply</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF8F6',
    },
    scrollContent: {
        paddingHorizontal: 22,
        paddingTop: 12,
        paddingBottom: 40,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    historyText: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#111111',
    },
    avatarButton: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: '#D1D1D1',
        borderWidth: 1.5,
        borderColor: '#C5C5C5',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.12,
        shadowRadius: 3,
        elevation: 2,
    },
    appTitle: {
        fontSize: 48,
        fontWeight: 'bold',
        color: '#1F1F1F',
        textAlign: 'center',
        marginVertical: 12,
        letterSpacing: 0.5,
    },
    appTitleHighlight: {
        color: '#C24A3B',
    },
    forYouContainer: {
        marginTop: 6,
        marginBottom: 20,
    },
    forYouTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#111111',
        marginBottom: 10,
        marginLeft: 4,
    },
    forYouCardBox: {
        backgroundColor: '#FDEEEB',
        borderWidth: 1.5,
        borderColor: '#F6D5CE',
        borderRadius: 24,
        paddingVertical: 16,
        paddingHorizontal: 12,
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    songItem: {
        width: '46%',
        alignItems: 'center',
    },
    cardPlaceholder: {
        width: '100%',
        aspectRatio: 1.15,
        backgroundColor: '#EACCC5',
        borderRadius: 12,
        marginBottom: 8,
    },
    songTitle: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#111111',
        textAlign: 'center',
    },
    searchSection: {
        width: '100%',
        marginTop: 4,
    },
    searchBar: {
        backgroundColor: '#FFFFFF',
        borderRadius: 30,
        paddingVertical: 10,
        paddingHorizontal: 18,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
        shadowRadius: 6,
        elevation: 2,
    },
    searchIcon: {
        marginRight: 6,
    },
    searchInputWrapper: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    searchInput: {
        width: '100%',
        fontSize: 15,
        color: '#333333',
        fontWeight: '500',
        padding: 0,
        textAlign: 'center',
    },
    searchSubtext: {
        fontSize: 11,
        color: '#888888',
        marginTop: 2,
        textAlign: 'center',
    },
    micButton: {
        marginLeft: 6,
        padding: 4,
    },
    micButtonRecording: {
        backgroundColor: '#FFE5E5',
        borderRadius: 16,
    },
    filterButton: {
        backgroundColor: '#FFFFFF',
        borderWidth: 1.5,
        borderColor: '#F0C0B6',
        borderRadius: 20,
        paddingVertical: 6,
        paddingHorizontal: 14,
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-start',
        marginTop: 14,
        marginLeft: 4,
    },
    filterButtonActive: {
        backgroundColor: '#FFF1EE',
        borderColor: '#E8A599',
    },
    filterIcon: {
        marginRight: 6,
    },
    filterText: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#B84A3B',
        letterSpacing: 0.5,
    },
    filterPanel: {
        backgroundColor: '#FDEEEB',
        borderWidth: 1.5,
        borderColor: '#F6D5CE',
        borderRadius: 24,
        paddingVertical: 18,
        paddingHorizontal: 14,
        marginTop: 12,
        minHeight: 60,
    },
    applyButton: {
        backgroundColor: '#FFFFFF',
        borderRadius: 14,
        paddingVertical: 6,
        paddingHorizontal: 22,
        alignSelf: 'flex-end',
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.08,
        shadowRadius: 3,
        elevation: 1,
    },
    applyButtonText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#B84A3B',
    },
});

export default Homeuser;