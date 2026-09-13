import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

const GENRE_ROWS = [
    ['rock', 'pop', 'jazz'],
    ['funk', 'disco', 'punk'],
];

const MOOD_ROWS = [
    ['sad', 'happy', 'relaxed'],
    ['romantic', 'epic', 'peaceful'],
];

const Homeuser = ({ navigation }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [showFilters, setShowFilters] = useState(false);
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [selectedMoods, setSelectedMoods] = useState([]);

    const toggleGenre = (genre) => {
        setSelectedGenres((prev) =>
            prev.includes(genre)
                ? prev.filter((g) => g !== genre)
                : [...prev, genre]
        );
    };

    const toggleMood = (mood) => {
        setSelectedMoods((prev) =>
            prev.includes(mood)
                ? prev.filter((m) => m !== mood)
                : [...prev, mood]
        );
    };

    const handleApply = () => {
        setShowFilters(false);
        navigation?.navigate('Result', {
            genres: selectedGenres,
            moods: selectedMoods,
        });
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="light" />
            <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.header}>
                    <TouchableOpacity activeOpacity={0.7}>
                        <Text style={styles.historyText}>History</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.avatarPlaceholder}
                        activeOpacity={0.7}
                    />
                </View>

                <Text style={styles.appTitle}>LyriSeek</Text>

                <View style={styles.forYouContainer}>
                    <Text style={styles.forYouTitle}>For You</Text>

                    <View style={styles.forYouCardBox}>
                        <TouchableOpacity
                            style={styles.songItem}
                            activeOpacity={0.8}
                        >
                            <View style={styles.imagePlaceholder} />
                            <Text
                                style={styles.songTitle}
                                numberOfLines={1}
                            >
                                song
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.songItem}
                            activeOpacity={0.8}
                        >
                            <View style={styles.imagePlaceholder} />
                            <Text
                                style={styles.songTitle}
                                numberOfLines={1}
                            >
                                song
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.searchSection}>
                    <View style={styles.searchBar}>
                        <TextInput
                            style={styles.searchInput}
                            placeholder="Search for music"
                            placeholderTextColor="#666666"
                            value={searchQuery}
                            onChangeText={setSearchQuery}
                            textAlign="center"
                        />
                        <Text style={styles.searchSubtext}>
                            lyrics/genre/mood
                        </Text>
                    </View>

                    <TouchableOpacity
                        style={[
                            styles.filterButton,
                            showFilters && styles.filterButtonActive,
                        ]}
                        activeOpacity={0.8}
                        onPress={() => setShowFilters((prev) => !prev)}
                    >
                        <Text style={styles.filterText}>FILTERS</Text>
                    </TouchableOpacity>

                    {showFilters && (
                        <View style={styles.filterPanel}>

                            <View style={styles.filterRowSection}>
                                <View style={styles.filterLabelContainer}>
                                    <Text style={styles.filterSectionTitle}>
                                        GENRE
                                    </Text>
                                </View>
                                <View style={styles.tagGridContainer}>
                                    {GENRE_ROWS.map((row, rowIndex) => (
                                        <View
                                            key={rowIndex}
                                            style={styles.tagsRow}
                                        >
                                            {row.map((genre) => {
                                                const isSelected =
                                                    selectedGenres.includes(genre);
                                                return (
                                                    <TouchableOpacity
                                                        key={genre}
                                                        style={[
                                                            styles.tagPill,
                                                            isSelected &&
                                                            styles.tagPillSelected,
                                                        ]}
                                                        activeOpacity={0.7}
                                                        onPress={() =>
                                                            toggleGenre(genre)
                                                        }
                                                    >
                                                        <Text
                                                            style={[
                                                                styles.tagText,
                                                                isSelected &&
                                                                styles.tagTextSelected,
                                                            ]}
                                                        >
                                                            {genre}
                                                        </Text>
                                                    </TouchableOpacity>
                                                );
                                            })}
                                        </View>
                                    ))}
                                </View>
                            </View>

                            <View style={styles.filterRowSection}>
                                <View style={styles.filterLabelContainer}>
                                    <Text style={styles.filterSectionTitle}>
                                        MOOD
                                    </Text>
                                </View>
                                <View style={styles.tagGridContainer}>
                                    {MOOD_ROWS.map((row, rowIndex) => (
                                        <View
                                            key={rowIndex}
                                            style={styles.tagsRow}
                                        >
                                            {row.map((mood) => {
                                                const isSelected =
                                                    selectedMoods.includes(mood);
                                                return (
                                                    <TouchableOpacity
                                                        key={mood}
                                                        style={[
                                                            styles.tagPill,
                                                            isSelected &&
                                                            styles.tagPillSelected,
                                                        ]}
                                                        activeOpacity={0.7}
                                                        onPress={() =>
                                                            toggleMood(mood)
                                                        }
                                                    >
                                                        <Text
                                                            style={[
                                                                styles.tagText,
                                                                isSelected &&
                                                                styles.tagTextSelected,
                                                            ]}
                                                        >
                                                            {mood}
                                                        </Text>
                                                    </TouchableOpacity>
                                                );
                                            })}
                                        </View>
                                    ))}
                                </View>
                            </View>

                            <TouchableOpacity
                                style={styles.applyButton}
                                activeOpacity={0.85}
                                onPress={handleApply}
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
        backgroundColor: '#C86452',
    },
    scrollContent: {
        paddingHorizontal: 24,
        paddingTop: 12,
        paddingBottom: 40,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    historyText: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#000000',
    },
    avatarPlaceholder: {
        width: 46,
        height: 46,
        borderRadius: 23,
        backgroundColor: '#FFFFFF',
    },
    appTitle: {
        fontSize: 48,
        fontWeight: 'bold',
        color: '#FFFFFF',
        textAlign: 'center',
        marginVertical: 16,
    },
    forYouContainer: {
        marginTop: 8,
        marginBottom: 24,
    },
    forYouTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000000',
        marginBottom: 10,
        marginLeft: 4,
    },
    forYouCardBox: {
        borderWidth: 1.5,
        borderColor: '#000000',
        borderRadius: 24,
        paddingVertical: 18,
        paddingHorizontal: 12,
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    songItem: {
        width: '46%',
        alignItems: 'center',
    },
    imagePlaceholder: {
        width: '100%',
        aspectRatio: 1.2,
        backgroundColor: 'rgba(0, 0, 0, 0.25)',
        borderRadius: 8,
        marginBottom: 8,
    },
    songTitle: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#FFFFFF',
        textAlign: 'center',
    },
    searchSection: {
        width: '100%',
        marginTop: 4,
    },
    searchBar: {
        backgroundColor: '#FFFFFF',
        borderRadius: 30,
        paddingVertical: 12,
        paddingHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    searchInput: {
        width: '100%',
        fontSize: 16,
        color: '#333333',
        fontWeight: '500',
        padding: 0,
    },
    searchSubtext: {
        fontSize: 11,
        color: '#777777',
        marginTop: 2,
    },
    filterButton: {
        borderWidth: 1.5,
        borderColor: 'rgba(255, 255, 255, 0.8)',
        borderRadius: 20,
        paddingVertical: 6,
        paddingHorizontal: 20,
        alignSelf: 'flex-start',
        marginTop: 12,
        marginLeft: 8,
    },
    filterButtonActive: {
        backgroundColor: '#A84B3B',
        borderColor: '#FFFFFF',
    },
    filterText: {
        fontSize: 13,
        fontWeight: 'bold',
        color: '#FFFFFF',
        letterSpacing: 0.5,
    },
    filterPanel: {
        borderWidth: 1.5,
        borderColor: '#000000',
        borderRadius: 24,
        paddingVertical: 20,
        paddingHorizontal: 16,
        marginTop: 14,
    },
    filterRowSection: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    filterLabelContainer: {
        width: 68,
        justifyContent: 'center',
    },
    filterSectionTitle: {
        fontSize: 13,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
    tagGridContainer: {
        flex: 1,
    },
    tagsRow: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginVertical: 3,
    },
    tagPill: {
        backgroundColor: '#B55747',
        borderRadius: 14,
        paddingVertical: 5,
        paddingHorizontal: 14,
        marginHorizontal: 4,
        alignItems: 'center',
        justifyContent: 'center',
    },
    tagPillSelected: {
        backgroundColor: '#FFFFFF',
    },
    tagText: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
    tagTextSelected: {
        color: '#C86452',
    },
    applyButton: {
        backgroundColor: '#FFFFFF',
        borderRadius: 14,
        paddingVertical: 6,
        paddingHorizontal: 22,
        alignSelf: 'flex-end',
        marginTop: 8,
        marginRight: 4,
    },
    applyButtonText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#C86452',
    },
});

export default Homeuser;
