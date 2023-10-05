import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  FlatList,
  Pressable,
} from 'react-native';
import { BLACK, WHITE } from '../styles/colors';
import { getResponsiveValue } from '../styles/responsive';
const Searchbar = (props) => {
  const [searchText, setSearchText] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  // Sample list of suggestions (replace with your own data)
  const predefinedSuggestions = [
    'All','Good morning', 'Good Night', 'Love', 'Motivational', 'Festival',
    'Spacial Day', 'Devotional', 'Birthday',

  ];

  const handleTextInputChange = (text) => {
    setSearchText(text);

    // Display suggestions only when searchText has at least 2 characters
    if (text.length >= 2) {
      // Filter suggestions based on the input text
      const filteredSuggestions = predefinedSuggestions.filter((item) =>
        item.toLowerCase().includes(text.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    } else {
      // Clear suggestions if searchText is less than 2 characters
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (selectedSuggestion) => {
    // Update the search text with the selected suggestion
    setSearchText(selectedSuggestion);
    // Clear the suggestions
    setSuggestions([]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.iconStack}>
        <TextInput
          placeholder="Search..."
          placeholderTextColor = "#fefefe"
          style={styles.textInput}
          onChangeText={handleTextInputChange}
          value={searchText}
        />
      </View>

      {suggestions.length > 0 && (
        <FlatList
          data={suggestions}
          renderItem={({ item }) => (
            <Pressable onPress={() => handleSuggestionClick(item)}>
              <View style={styles.suggestionItem}>
                <Text style={styles.Item} >{item}</Text>
              </View>
            </Pressable>
          )}
          keyExtractor={(item) => item.toString()}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  iconStack: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textInput: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: 3,
    paddingBottom: 3,
    marginRight: 8,
    paddingLeft: 10,
    height: getResponsiveValue(50, 34),
    borderWidth: getResponsiveValue(3, 2),
    borderColor: WHITE,
    borderRadius: getResponsiveValue(25, 22),
    color: WHITE,
  
  },
  suggestionItem: {
    flex: 1,
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: WHITE,
    color: WHITE,
  },
  Item:{
    color: WHITE,
    top:5,
  },
});

export default Searchbar;