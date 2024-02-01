import React, { useState } from 'react'
import {
  SafeAreaView,
  StyleSheet,
  StatusBar,
  View
} from 'react-native'
import axios from 'axios'

import SearchBar from './src/components/SearchBar'
import { useDebounce } from './src/hooks/useDebounce'

const GOOGLE_PACES_API_BASE_URL = 'https://maps.googleapis.com/maps/api/place'

const API_KEY = 'ENTER_YOUR_KEY_HERE';

export type SuggestionType = {
  description: string
  place_id: string
  reference: string
  matched_substrings: any[]
  tructured_formatting: Object
  terms: Object[]
  types: string[]
}

const App = () => {
  const [search, setSearch] = useState({ term: '', fetchSuggestion: false })
  const [showSuggestion, setShowSuggestion] = useState(false)
  const [suggestion, setSuggestion] = useState<SuggestionType[]>([])

  const { container, body } = styles

  const onChangeText = async () => {
    if (search.term.trim() === '') return
    if (!search.fetchSuggestion) return

    const apiUrl = `${GOOGLE_PACES_API_BASE_URL}/autocomplete/json?key=${API_KEY}&input=${search.term}`
    try {
      const result = await axios.request({
        method: 'post',
        url: apiUrl
      })
      console.log(result);
      
      if (result) {
        const { data: { predictions } } = result
        setSuggestion(predictions)
        setShowSuggestion(true)
      }
    } catch (e) {
      console.log(e)
    }
  }
  useDebounce(onChangeText, 1500, [search.term])

  const onPredictionTapped = async (placeId: string, description: string) => {
    const apiUrl = `${GOOGLE_PACES_API_BASE_URL}/details/json?key=${API_KEY}&place_id=${placeId}`
    try {
      const result = await axios.request({
        method: 'post',
        url: apiUrl
      })
      if (result) {
        const { data: { result: { geometry: { location } } } } = result
        const { lat, lng } = location
        setShowSuggestion(false)
        setSearch({ term: description, fetchSuggestion: false })
      }
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={container}>
        <View style={body}>
          <SearchBar
            value={search.term}
            onChangeText={(text) => {
              setSearch({ term: text, fetchSuggestion: true })
            }}
            showSuggestion={showSuggestion}
            suggestion={suggestion}
            onPredictionTapped={onPredictionTapped}
          />
        </View>
      </SafeAreaView>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  body: {
    paddingHorizontal: 20,
    paddingTop: 20,
    backgroundColor: '#D3D3D3',
    height: '100%'

  }
})

export default App