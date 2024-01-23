import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import axios from 'axios';

const MovieDetail = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const movieID = route?.params?.movieId;
  const [data, setData] = useState();
  const options = {
    method: 'GET',
    url: `https://api.themoviedb.org/3/movie/${movieID}`,
    params: {language: 'en-US'},
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
        setData(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.containerHeader}>
        <View style={styles.rowConatiner}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.goBack()}
            style={{paddingRight: '4%', alignItems: 'center'}}>
            <Image
              source={require('../../assets/Images/back.png')}
              style={{height: 30, width: 30}}
            />
          </TouchableOpacity>
          <View>
            <Text style={styles.headerText}>Details</Text>
          </View>
        </View>
      </View>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}>
        {/* MAIN CARD */}
        <View style={styles.mainCard}>
          <View style={styles.leftRightParent}>
            {/* TITLE AND RATING CONTAINER */}
            <View style={styles.leftView}>
              <View style={styles.paddingAround}>
                <Text style={styles.title}>{data?.title}</Text>

                <Text style={{paddingTop: 8, color: '#000'}}>
                  {data?.tagline}
                </Text>
              </View>

              <View style={styles.rowAlign}>
                <Text style={styles.leftViewTitleKey}>Ratings:</Text>
                <View style={{paddingLeft: 6}}>
                  <Image
                    source={require('../../assets/Images/star.png')}
                    style={{height: 15, width: 15}}
                  />
                </View>

                <Text style={styles.ratingText}>
                  {Math.round(data?.vote_average)} /10
                </Text>
              </View>

              <View style={styles.rowAlign}>
                <Text style={styles.leftViewTitleKey}>Release Date:</Text>

                <Text style={styles.releaseDate}>{data?.release_date}</Text>
              </View>
              <View style={styles.rowAlign}>
                <Text style={styles.leftViewTitleKey}>Status:</Text>

                <Text style={styles.status}>{data?.status}</Text>
              </View>
            </View>
            {/* IMAGE CONTAINER */}
            <View style={styles.rightView}>
              <View style={styles.imageContainer}>
                <Image
                  source={{
                    uri: `https://image.tmdb.org/t/p/w500${data?.poster_path}`,
                  }}
                  style={styles.image}
                  resizeMode="cover"
                />
              </View>
            </View>
          </View>

          {/* OTHER DETAIL CONTAINER BELOW IMAGE */}
          <View style={styles.detailsContainer}>
            {/* ORIGINAL TITLE */}
            <View style={styles.paddingAround}>
              <Text style={styles.titleKey}>Original Title:</Text>
              <Text style={styles.title}>{data?.original_title}</Text>
            </View>

            {/* Genres */}

            <View style={styles.paddingAround}>
              <Text style={styles.titleKey}>Genres:</Text>

              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {data?.genres?.map((item, id) => (
                  <View key={id} style={styles.genreContainer}>
                    <Text style={styles.genreText}>{item?.name}</Text>
                  </View>
                ))}
              </ScrollView>
            </View>
            {/* OVERVIEW */}
            <View style={styles.paddingAround}>
              <Text style={styles.titleKey}>Overview:</Text>

              <Text style={styles.overview}>{data?.overview}</Text>
            </View>

            {/* Spoken Languages */}

            <View style={styles.paddingAround}>
              <Text style={styles.titleKey}>Languages:</Text>

              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {data?.spoken_languages?.map((element, id) => (
                  <View key={id} style={styles.languageContainer}>
                    <Text style={styles.languageText}>
                      {element?.english_name}
                    </Text>
                  </View>
                ))}
              </ScrollView>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  containerHeader: {
    height: 75,
    backgroundColor: '#000',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.5,
        shadowRadius: 2,
      },
      android: {
        elevation: 4,
      },
    }),
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
  imageContainer: {
    height: 250,
  },
  image: {
    height: '100%',
    width: '100%',
    borderRadius: 16,
  },
  scrollView: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    marginBottom: '2%',
    paddingTop: '1%',
  },
  detailsContainer: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  ratingText: {
    paddingLeft: 6,
    fontSize: 13,
    fontWeight: '500',
    color: '#1DB954',
  },
  overview: {
    fontWeight: '500',
  },
  genreContainer: {
    marginRight: 8,
    paddingVertical: 8,
    paddingHorizontal: 14,
    backgroundColor: '#fff',
    borderRadius: 20,
    borderColor: '#2243b6',
    borderWidth: 0.8,
  },
  genreText: {
    fontSize: 14,
    color: '#2243b6',
    fontWeight: 'bold',
  },
  releaseDate: {
    fontSize: 13,
    fontWeight: '500',
    color: '#1DB954',
    paddingLeft: 2,
  },
  languageContainer: {
    marginRight: 8,
    paddingVertical: 8,
    paddingHorizontal: 14,
    backgroundColor: '#fff',
    borderRadius: 20,
    borderColor: 'purple',
    borderWidth: 0.8,
  },
  languageText: {
    fontSize: 14,
    color: 'purple',
    fontWeight: 'bold',
  },
  status: {
    fontSize: 13,
    fontWeight: '500',
    color: '#1DB954',
    paddingLeft: 2,
  },
  leftRightParent: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
  },
  leftView: {
    width: '50%',
    padding: 10,
  },
  leftViewTitleKey: {
    fontSize: 13,
    color: '#000',
  },
  rightView: {
    width: '50%',
  },
  mainCard: {
    margin: 10,
    borderRadius: 16,
    backgroundColor: '#fff',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.5,
        shadowRadius: 2,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  rowAlign: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
  },
  paddingAround: {
    paddingVertical: 6,
  },
  titleKey: {
    paddingBottom: 8,
    color: '#000',
  },
});

export default MovieDetail;
