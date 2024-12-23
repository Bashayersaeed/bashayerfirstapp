import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity, FlatList } from 'react-native';
import restaurantCategories from '../components/restaurantCategories';
import restaurants from '../components/restaurants';
import { useState } from 'react';

export default function HomeScreen({ navigation }) {
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Filter restaurants based on selected category
  const filteredRestaurants = selectedCategory
    ? restaurants.filter(restaurant => restaurant.category === selectedCategory)
    : restaurants;

  const renderRestaurantItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.restaurantCard}
      onPress={() => navigation.navigate('Restaurant', { restaurant: item })}
    >
      <Image
        source={{ uri: item.image }}
        style={styles.restaurantImage}
        resizeMode="cover"
      />
      <View style={styles.restaurantInfo}>
        <View style={styles.restaurantHeader}>
          <Text style={styles.restaurantName}>{item.name}</Text>
          <View style={styles.ratingContainer}>
            <Text style={styles.rating}>★ {item.rating}</Text>
          </View>
        </View>
        <View style={styles.restaurantDetails}>
          <Text style={styles.cuisine}>{item.category}</Text>
          <Text style={styles.dot}>•</Text>
          <Text style={styles.deliveryTime}>{item.deliveryTime}</Text>
        </View>
        <Text style={styles.menuPreview}>
          {item.menuItems.length} items available
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.sectionTitle}>Cuisines</Text>
        <TouchableOpacity 
          onPress={() => navigation.navigate('Cart')}
          style={styles.cartButton}
        >
          <Text style={styles.cartButtonText}>Cart</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.categoriesWrapper}>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesContainer}
        >
          {restaurantCategories.map((category) => (
            <TouchableOpacity 
              key={category.id} 
              style={[
                styles.categoryCard,
                selectedCategory === category.categoryName && styles.selectedCategoryCard
              ]}
              onPress={() => {
                setSelectedCategory(
                  selectedCategory === category.categoryName 
                    ? null 
                    : category.categoryName
                );
              }}
            >
              <Image
                source={{ uri: category.categoryImage }}
                style={styles.categoryImage}
                resizeMode="cover"
              />
              <Text style={[
                styles.categoryName,
                selectedCategory === category.categoryName && styles.selectedCategoryName
              ]}>
                {category.categoryName}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <Text style={styles.sectionTitle}>
        {selectedCategory ? `${selectedCategory} Restaurants` : 'All Restaurants'}
      </Text>
      <FlatList
        data={filteredRestaurants}
        renderItem={renderRestaurantItem}
        keyExtractor={item => item.id.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.restaurantsContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 20,
    marginBottom: 15,
  },
  categoriesWrapper: {
    height: 140,
  },
  categoriesContainer: {
    paddingHorizontal: 15,
  },
  categoryCard: {
    width: 100,
    marginHorizontal: 5,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  categoryImage: {
    width: 100,
    height: 60,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  categoryName: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
    padding: 10,
  },
  restaurantsContainer: {
    padding: 15,
  },
  restaurantCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 3.84,
    elevation: 5,
    overflow: 'hidden',
  },
  restaurantImage: {
    width: '100%',
    height: 180,
    backgroundColor: '#f5f5f5',
  },
  restaurantInfo: {
    padding: 15,
  },
  restaurantHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  restaurantName: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
  },
  ratingContainer: {
    backgroundColor: '#FFE3E3',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginLeft: 8,
  },
  rating: {
    color: '#FF424E',
    fontWeight: '600',
  },
  restaurantDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  cuisine: {
    color: '#666',
  },
  dot: {
    color: '#666',
    marginHorizontal: 8,
  },
  deliveryTime: {
    color: '#666',
  },
  menuPreview: {
    color: '#888',
    fontSize: 13,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: 20,
  },
  cartButton: {
    backgroundColor: '#007AFF',
    padding: 8,
    borderRadius: 8,
  },
  cartButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  selectedCategoryCard: {
    backgroundColor: '#007AFF',
  },
  selectedCategoryName: {
    color: '#fff',
  },
}); 