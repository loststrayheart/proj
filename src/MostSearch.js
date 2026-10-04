import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Feather } from '@expo/vector-icons';

const MostSearch = ({ navigation }) => {
    // State ready for future database integration
    const [mostSearchedSongs, setMostSearchedSongs] = useState([]);
    const [selectedIds, setSelectedIds] = useState([]);

    const toggleSelect = (id) => {
        if (selectedIds.includes(id)) {
            setSelectedIds(selectedIds.filter((item) => item !== id));
        } else {
            setSelectedIds([...selectedIds, id]);
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
                <Text style={styles.screenTitle}>Most searched songs</Text>

                {/* White Container */}
                <View style={styles.cardContainer}>
                    {/* Song List */}
                    <View style={styles.listContainer}>
                        {mostSearchedSongs.length > 0 ? (
                            mostSearchedSongs.map((item, index) => {
                                const itemId = item.id || String(index);
                                const isSelected = selectedIds.includes(itemId);
                                return (
                                    <TouchableOpacity
                                        key={itemId}
                                        style={styles.songItem}
                                        activeOpacity={0.8}
                                        onPress={() => toggleSelect(itemId)}
                                    >
                                        <View style={styles.imagePlaceholder} />
                                        <Text style={styles.songTitle} numberOfLines={2}>
                                            {item.title}
                                        </Text>
                                        <View
                                            style={[
                                                styles.selectDot,
                                                isSelected && styles.selectDotActive,
                                            ]}
                                        />
                                    </TouchableOpacity>
                                );
                            })
                        ) : (
                            /* UI Placeholders when waiting for DB */
                            <>
                                {[1, 2, 3].map((placeholderId) => {
                                    const idStr = String(placeholderId);
                                    const isSelected = selectedIds.includes(idStr);
                                    return (
                                        <TouchableOpacity
                                            key={placeholderId}
                                            style={styles.songItem}
                                            activeOpacity={0.8}
                                            onPress={() => toggleSelect(idStr)}
                                        >
                                            <View style={styles.imagePlaceholder} />
                                            <Text style={styles.songTitle} numberOfLines={1}>
                                                Song Title
                                            </Text>
                                            <View
                                                style={[
                                                    styles.selectDot,
                                                    (isSelected || placeholderId === 1) && styles.selectDotActive,
                                                ]}
                                            />
                                        </TouchableOpacity>
                                    );
                                })}
                            </>
                        )}
                    </View>

                    {/* Bottom Action Row */}
                    <View style={styles.bottomRow}>
                        <Text style={styles.recommendLabel}>add to recommend</Text>
                        <TouchableOpacity
                            style={styles.addButton}
                            activeOpacity={0.85}
                            onPress={() => navigation?.goBack()}
                        >
                            <Text style={styles.addButtonText}>Add</Text>
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
        fontSize: 30,
        fontWeight: 'bold',
        color: '#111827',
        textAlign: 'center',
        marginBottom: 28,
    },
    cardContainer: {
        backgroundColor: '#FFFFFF',
        borderRadius: 28,
        paddingHorizontal: 20,
        paddingTop: 28,
        paddingBottom: 28,
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 12,
        elevation: 2,
        minHeight: 460,
        justifyContent: 'space-between',
    },
    listContainer: {
        width: '100%',
    },
    songItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 26,
    },
    imagePlaceholder: {
        width: 72,
        height: 60,
        backgroundColor: '#E2E8F0',
        borderRadius: 6,
        marginRight: 16,
    },
    songTitle: {
        flex: 1,
        fontSize: 15,
        fontWeight: 'bold',
        color: '#111827',
        lineHeight: 22,
    },
    selectDot: {
        width: 18,
        height: 18,
        borderRadius: 9,
        backgroundColor: '#E2E8F0',
        marginLeft: 10,
    },
    selectDotActive: {
        backgroundColor: '#91AAFD',
    },
    bottomRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 20,
        paddingTop: 10,
    },
    recommendLabel: {
        fontSize: 15,
        color: '#6B7280',
        fontWeight: '500',
    },
    addButton: {
        backgroundColor: '#98A6FE',
        borderRadius: 14,
        height: 48,
        minWidth: 140,
        paddingHorizontal: 36,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#98A6FE',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.25,
        shadowRadius: 6,
        elevation: 3,
    },
    addButtonText: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#556AB0',
    },
});

export default MostSearch;
