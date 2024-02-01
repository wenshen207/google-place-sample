import React, { FunctionComponent, useState } from 'react'
import {
  View,
  TextInput,
  ViewStyle,
  FlatList,
  TouchableOpacity,
  Text
} from 'react-native'
import { SuggestionType } from '../../App'
import { styles } from './SearchBar.style'

type SearchBarProps = {
  value: string
  style?: ViewStyle | ViewStyle[]
  onChangeText: (text: string) => void
  suggestion: SuggestionType[]
  showSuggestion: boolean
  onPredictionTapped: (placeId: string, description: string) => void
}

const SearchBarWithSuggestion: FunctionComponent<SearchBarProps> = props => {
  const [inputSize, setInputSize] = useState({ width: 0, height: 0 })

  const {
    value,
    style,
    onChangeText,
    onPredictionTapped,
    suggestion,
    showSuggestion
  } = props

  const {
    container,
    inputStyle
  } = styles
  const passedStyles = Array.isArray(style) ? Object.assign({}, ...style) : style
  const inputBottomRadius = showSuggestion ?
    {
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0
    }
    :
    {
      borderBottomLeftRadius: 20,
      borderBottomRightRadius: 20
    }

  const _renderPredictions = (predictions: SuggestionType[]) => {
    const {
      predictionsContainer,
      predictionRow
    } = styles
    const calculatedStyle = { 
      width: inputSize.width
    }
    
    return (
      <FlatList
        data={predictions}
        renderItem={({ item, index }) => {
          return (
            <TouchableOpacity
              style={predictionRow}
              onPress={() => onPredictionTapped(item.place_id, item.description)}
            >
              <Text
                numberOfLines={1}
              >
                {item.description}
              </Text>
            </TouchableOpacity>
          )
        }}
        keyExtractor={(item) => item.place_id}
        keyboardShouldPersistTaps='handled'
        style={[predictionsContainer, calculatedStyle]}
      />
    )
  }

  return (
    <View style={[container, { ...passedStyles }]}>
      <TextInput
        style={[inputStyle, inputBottomRadius]}
        placeholder='Search by address'
        placeholderTextColor='gray'
        value={value}
        onChangeText={onChangeText}
        returnKeyType='search'
        onLayout={(event) => {
          const { height, width } = event.nativeEvent.layout
          setInputSize({ height, width })
        }}
      />
      {showSuggestion && _renderPredictions(suggestion)}
    </View>
  )
}


export default SearchBarWithSuggestion