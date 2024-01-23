import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  Platform,
  TouchableOpacity,
} from 'react-native';
// import FontAwesome from 'react-native-vector-icons/FontAwesome';
// ICONS ARE NOT WORKING IN ANDROID PROJECT
import {useNavigation} from '@react-navigation/native';

const Card = ({visibleData}) => {
  const navigation = useNavigation();

  const handleCardClick = id => {
    navigation.navigate('DetailStackNavigation', {
      screen: 'MovieDetail',
      params: {
        movieId: id,
      },
    });
  };

  const renderDescription = text => {
    const maxCharacters = 35; // Set your desired maximum number of characters for the description
    return (
      <Text>
        {text.length > maxCharacters
          ? `${text.slice(0, maxCharacters)}...`
          : text}
      </Text>
    );
  };
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={styles.cardContainer}
      onPress={() => handleCardClick(visibleData?.id)}>
      <View style={styles.imageContainer}>
        <Image
          source={{
            uri: `https://image.tmdb.org/t/p/w500${visibleData?.poster_path}`,
          }}
          style={styles.image}
          resizeMode="stretch"
        />
      </View>
      <View style={styles.contentContainer}>
        <View style={styles.titleContainer}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: 'bold',
              color: '#000',
              height: 40,
            }}
            numberOfLines={2}
            ellipsizeMode="tail">
            {visibleData?.title}
          </Text>
        </View>
        <View style={styles.starContainer}>
          <Image
            source={require('../assets/Images/star.png')}
            style={{height: 14, width: 14}}
          />
          <Text style={{paddingLeft: 6, color: '#000'}}>
            {Math.round(visibleData?.vote_average)} /10
          </Text>
        </View>
        <View style={styles.descriptionContainer}>
          <Text style={{color: '#000'}}>
            {renderDescription(visibleData?.overview)}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: '44%',
    aspectRatio: 0.6,
    backgroundColor: '#fff',
    borderRadius: 16,
    margin: 10,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.2,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  titleContainer: {
    paddingHorizontal: 8,
    paddingTop: 6,
  },
  starContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 6,
    flexGrow: 1,
  },
  imageContainer: {
    height: '62%',
  },
  image: {
    flex: 1,
    width: '100%',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  descriptionContainer: {
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
});
export default Card;
