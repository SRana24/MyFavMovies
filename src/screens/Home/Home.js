import React, {useEffect, useRef, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Card from '../../components/Card';
import axios from 'axios';
import Pagination from '../../components/Pagination';

const Home = () => {
  const [data, setData] = useState();
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState('now_playing');

  const options = {
    method: 'GET',
    url: `https://api.themoviedb.org/3/movie/${filter}`,
    params: {language: 'en-US', page: page},
    headers: {
      accept: 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NTZkNGVkZjdkM2UzZmY3NTE4Y2ZkYzM3ZTNjODM0NyIsInN1YiI6IjY1YWJhNmVmMzVhNjFlMDEyMjI4ZjM2MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.pulF0ZiCmZAM7LWIcK8TXEK4jKzioWSvMDleuTQ1nkM',
    },
  };

  useEffect(() => {
    axios
      .request(options)
      .then(function (response) {
        setData(response?.data?.results);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, [page, filter]);

  // SCROLL REF FOR PAGINATION BUTTON AND SORT BUTTON

  const scrollViewRef = useRef();

  const handleScrollToTop = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({y: 0, animated: true});
    }
  };

  // FUNCTION FOR SORT FILTER (MOST POPULAR , TOP RATED....ETC)

  const isFilterActive = filterType => filter === filterType;

  const handlePress = filterType => {
    setFilter(filterType);
    handleScrollToTop();
  };

  // BELOW FUNCTION AND CODE FOR PAGINATION

  const onPageChange = value => {
    if (value >= 1 || value <= data?.total_pages) {
      setPage(value);
      handleScrollToTop();
    }
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <View style={{paddingBottom: '25%'}}>
        <View style={styles.container}>
          <View style={styles.headerConatiner}>
            <View>
              <Text style={styles.headerText}>TMDB</Text>
            </View>
          </View>
        </View>
        {/* SORT VIEW */}
        <View style={{backgroundColor: '#000'}}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.buttonContainer}>
            {['now_playing', 'popular', 'top_rated', 'upcoming'].map(
              (filterType, id) => (
                <TouchableOpacity
                  key={id}
                  style={{
                    ...styles.button,
                    backgroundColor: isFilterActive(filterType)
                      ? '#1DB954'
                      : '#fff',
                  }}
                  activeOpacity={0.8}
                  onPress={() => handlePress(filterType)}>
                  <Text
                    style={{
                      ...styles.buttonText,
                      color: isFilterActive(filterType) ? '#fff' : '#000',
                    }}>
                    {filterType.replace('_', ' ').toUpperCase()}
                  </Text>
                </TouchableOpacity>
              ),
            )}
          </ScrollView>
        </View>
        {/* CARDS AND PAGINATION */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          ref={scrollViewRef}
          contentContainerStyle={styles.cardContainer}
          horizontal={false}>
          {data?.map((item, id) => {
            return <Card visibleData={item} key={id} />;
          })}
          <Pagination
            currentPage={page}
            totalPages={data?.total_pages}
            onPageChange={onPageChange}
          />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',

    paddingBottom: '8%',
  },
  container: {
    height: 60,
    backgroundColor: '#000',
    justifyContent: 'center',
  },
  headerConatiner: {
    paddingHorizontal: '5%',
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
  },
  headerText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    backgroundColor: '#000',
    paddingBottom: '4%',
  },
  button: {
    height: 36,
    borderRadius: 24,
    paddingLeft: 16,
    paddingRight: 16,
    backgroundColor: '#1DB954',
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    marginRight: 10,
    marginLeft: 6,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '500',
  },
});

export default Home;
