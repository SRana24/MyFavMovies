import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useRef, useState} from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';
import {StyleSheet, TouchableOpacity} from 'react-native';

import axios from 'axios';
import Card from '../../components/Card';
import Pagination from '../../components/Pagination';
import Loader from '../../components/Loader';

const Search = () => {
  const navigation = useNavigation();
  const [searchData, setSearchData] = useState();
  const [inputData, setInputData] = useState();
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const options = {
    method: 'GET',
    url: 'https://api.themoviedb.org/3/search/movie',
    params: {
      query: inputData,
      include_adult: 'false',
      language: 'en-US',
      page: page,
    },
    headers: {
      accept: 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NTZkNGVkZjdkM2UzZmY3NTE4Y2ZkYzM3ZTNjODM0NyIsInN1YiI6IjY1YWJhNmVmMzVhNjFlMDEyMjI4ZjM2MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.pulF0ZiCmZAM7LWIcK8TXEK4jKzioWSvMDleuTQ1nkM',
    },
  };
  useEffect(() => {
    setLoading(true);
    axios
      .request(options)
      .then(function (response) {
        setSearchData(response?.data?.results);
      })
      .catch(function (error) {
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [inputData, page]);
  // SEARCH FUNCTION
  const handleInputChange = text => {
    setInputData(text);
  };

  // FUNCTION AND CODE FOR PAGINATION
  const scrollViewRef = useRef();

  const handleScrollToTop = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({y: 0, animated: true});
    }
  };

  const onPageChange = value => {
    if (value >= 1 || value <= searchData?.total_pages) {
      setPage(value);
      handleScrollToTop();
    }
  };

  const clearText = () => {
    setInputData('');
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      {/* HEADER AND SEARCH FIELD */}
      <View style={styles.container}>
        <View style={styles.rowConatiner}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.goBack()}
            style={{paddingRight: '4%'}}>
            <Image
              source={require('../../assets/Images/back.png')}
              style={{height: 30, width: 30}}
            />
          </TouchableOpacity>
          <View>
            <Text style={styles.headerText}>Finder</Text>
          </View>
        </View>

        <View style={styles.Inputcontainer}>
          <TextInput
            style={styles.input}
            placeholder="Search"
            placeholderTextColor="#888"
            value={inputData}
            onChangeText={handleInputChange}
          />
          {inputData?.length > 0 && (
            <TouchableOpacity
              onPress={clearText}
              style={styles.clearButton}
              activeOpacity={0.8}>
              <Image
                source={require('../../assets/Images/cancel.png')}
                style={{height: 24, width: 24}}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {loading ? (
        <Loader />
      ) : (
        <ScrollView
          ref={scrollViewRef}
          contentContainerStyle={styles.cardContainer}
          horizontal={false}>
          {searchData?.length > 0 ? (
            <>
              {searchData.map((item, index) => (
                <Card key={index} visibleData={item} />
              ))}
              <Pagination
                currentPage={page}
                totalPages={searchData.total_pages}
                onPageChange={onPageChange}
              />
            </>
          ) : (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>Please Search to see results</Text>
            </View>
          )}
        </ScrollView>
      )}
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    height: 150,
    backgroundColor: '#000',
  },
  cardContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingBottom: '6%',
  },
  rowConatiner: {
    paddingHorizontal: '5%',
    paddingVertical: '6%',
    alignItems: 'center',
    justifyContent: 'flex-start',
    display: 'flex',
    flexDirection: 'row',
  },
  headerText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
  },
  emptyContainer: {
    flex: 1,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
  },
  Inputcontainer: {
    position: 'relative',
    flexDirection: 'row',
    alignSelf: 'center',
  },
  input: {
    borderRadius: 24,
    backgroundColor: '#fff',
    width: '90%',
    alignSelf: 'center',
    paddingVertical: '4%',
    paddingHorizontal: '6%',
  },
  clearButton: {
    position: 'absolute',
    right: 10,
    padding: 8,
    top: 3,
  },
});
export default Search;
