import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';

// Sample book data - In a real app, this would come from an API or database
const sampleBooks = [
    {
        id: 1,
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        content: "In my younger and more vulnerable years my father gave me some advice that I've been turning over in my mind ever since..."
    },
    {
        id: 2,
        title: "Pride and Prejudice",
        author: "Jane Austen",
        content: "It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife..."
    },
    {
        id: 3,
        title: "To Kill a Mockingbird",
        author: "Harper Lee",
        content: "When he was nearly thirteen, my brother Jem got his arm badly broken at the elbow..."
    }
];

const ReadScreen = () => {
    const [selectedBook, setSelectedBook] = useState(null);
    const [fontSize, setFontSize] = useState(16);

    const handleBookSelect = (book) => {
        setSelectedBook(book);
    };

    const increaseFontSize = () => {
        setFontSize(prev => prev + 2);
    };

    const decreaseFontSize = () => {
        setFontSize(prev => Math.max(12, prev - 2));
    };

    return (
        <View style={styles.container}>
            {!selectedBook ? (
                <View style={styles.bookListContainer}>
                    <Text style={styles.header}>My Library</Text>
                    <ScrollView style={styles.bookList}>
                        {sampleBooks.map((book) => (
                            <TouchableOpacity
                                key={book.id}
                                style={styles.bookItem}
                                onPress={() => handleBookSelect(book)}
                            >
                                <Text style={styles.bookTitle}>{book.title}</Text>
                                <Text style={styles.bookAuthor}>by {book.author}</Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>
            ) : (
                <View style={styles.readingContainer}>
                    <View style={styles.readingHeader}>
                        <TouchableOpacity
                            style={styles.backButton}
                            onPress={() => setSelectedBook(null)}
                        >
                            <Text style={styles.backButtonText}>← Back to Library</Text>
                        </TouchableOpacity>
                        <View style={styles.fontControls}>
                            <TouchableOpacity onPress={decreaseFontSize} style={styles.fontButton}>
                                <Text>A-</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={increaseFontSize} style={styles.fontButton}>
                                <Text>A+</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <ScrollView style={styles.contentContainer}>
                        <Text style={styles.bookTitle}>{selectedBook.title}</Text>
                        <Text style={styles.bookAuthor}>by {selectedBook.author}</Text>
                        <Text style={[styles.bookContent, { fontSize }]}>
                            {selectedBook.content}
                        </Text>
                    </ScrollView>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    bookListContainer: {
        flex: 1,
        padding: 20,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#333',
    },
    bookList: {
        flex: 1,
    },
    bookItem: {
        backgroundColor: 'white',
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 3,
    },
    bookTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 5,
    },
    bookAuthor: {
        fontSize: 14,
        color: '#666',
    },
    readingContainer: {
        flex: 1,
        backgroundColor: '#fff',
    },
    readingHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    backButton: {
        padding: 10,
    },
    backButtonText: {
        color: '#007AFF',
        fontSize: 16,
    },
    fontControls: {
        flexDirection: 'row',
    },
    fontButton: {
        padding: 10,
        marginHorizontal: 5,
        backgroundColor: '#f0f0f0',
        borderRadius: 5,
    },
    contentContainer: {
        flex: 1,
        padding: 20,
    },
    bookContent: {
        lineHeight: 24,
        color: '#333',
        marginTop: 20,
    },
});

export default ReadScreen;
