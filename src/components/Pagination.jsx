import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

const Pagination = ({currentPage, totalPages, onPageChange}) => {
  return (
    <View style={styles.paginationContainer}>
      {/* PREV BUTTON */}
      <TouchableOpacity
        activeOpacity={currentPage <= 1 ? 1 : 0.5}
        disabled={!currentPage > 1}
        style={[
          styles.btnClass,
          {backgroundColor: currentPage <= 1 ? 'grey' : 'blue'},
        ]}
        onPress={() => onPageChange(currentPage - 1)}>
        <Text style={[styles.pageNumberText]}>Previous Page</Text>
      </TouchableOpacity>
      {/* DISPLAY THE CURRENT PAGE */}
      <Text style={{color: '#000'}}>Page: {currentPage}</Text>
      {/* NEXT BUTTON */}
      <TouchableOpacity
        activeOpacity={currentPage === totalPages <= 1 ? 1 : 0.5}
        disabled={currentPage === totalPages}
        style={[
          styles.btnClass,
          {backgroundColor: currentPage === totalPages ? 'grey' : '#1DB954'},
        ]}
        onPress={() => onPageChange(currentPage + 1)}>
        <Text style={[styles.pageNumberText]}>Next Page</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  paginationContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 10,
    width: '100%',
  },
  pageNumberText: {
    color: '#FFF',
    fontWeight: '400',
  },
  activePageBackground: {
    backgroundColor: '#000',
    borderColor: '#0056b3',
  },
  activePageText: {
    color: '#fff',
  },
  btnClass: {
    padding: '2.5%',
    borderRadius: 10,
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
});

export default Pagination;
