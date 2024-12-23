import { useState } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native';

export default function RestaurantScreen({ route, navigation, onAddToCart }) {
  const { restaurant } = route.params;
  const [selectedItem, setSelectedItem] = useState(null);

  const renderMenuItem = (item) => (
    <TouchableOpacity 
      key={item.id}
      style={styles.menuItem}
      onPress={() => setSelectedItem(item)}
    >
      <Image
        source={{ uri: item.image }}
        style={styles.menuItemImage}
        resizeMode="cover"
      />
      <View style={styles.menuItemInfo}>
        <Text style={styles.menuItemName}>{item.name}</Text>
        <Text style={styles.menuItemPrice}>${item.price.toFixed(2)}</Text>
        <Text style={styles.menuItemDescription} numberOfLines={2}>
          {item.description}
        </Text>
        <TouchableOpacity 
          style={styles.addButton}
          onPress={() => onAddToCart(item)}
        >
          <Text style={styles.addButtonText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.backButton} 
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backButtonText}>←</Text>
      </TouchableOpacity>
      <ScrollView>
        <Image
          source={{ uri: restaurant.image }}
          style={styles.restaurantImage}
          resizeMode="cover"
        />
        <View style={styles.restaurantInfo}>
          <Text style={styles.restaurantName}>{restaurant.name}</Text>
          <View style={styles.restaurantDetails}>
            <Text style={styles.rating}>★ {restaurant.rating}</Text>
            <Text style={styles.category}>{restaurant.category}</Text>
            <Text style={styles.deliveryTime}>{restaurant.deliveryTime}</Text>
          </View>
        </View>
        
        <View style={styles.menuList}>
          {restaurant.menuItems.map(renderMenuItem)}
        </View>
      </ScrollView>

      {selectedItem && (
        <View style={styles.itemDetails}>
          <TouchableOpacity 
            style={styles.closeButton}
            onPress={() => setSelectedItem(null)}
          >
            <Text style={styles.closeButtonText}>×</Text>
          </TouchableOpacity>
          <Image
            source={{ uri: selectedItem.image }}
            style={styles.detailImage}
            resizeMode="cover"
          />
          <Text style={styles.detailName}>{selectedItem.name}</Text>
          <Text style={styles.detailPrice}>${selectedItem.price.toFixed(2)}</Text>
          <Text style={styles.detailDescription}>{selectedItem.description}</Text>
          <TouchableOpacity 
            style={styles.detailAddButton}
            onPress={() => {
              onAddToCart(selectedItem);
              setSelectedItem(null);
            }}
          >
            <Text style={styles.detailAddButtonText}>Add to Cart</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  restaurantImage: {
    width: '100%',
    height: 200,
  },
  restaurantInfo: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  restaurantName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  restaurantDetails: {
    flexDirection: 'row',
    gap: 15,
  },
  rating: {
    color: '#FF424E',
    fontWeight: '600',
  },
  category: {
    color: '#666',
  },
  deliveryTime: {
    color: '#666',
  },
  menuList: {
    padding: 15,
  },
  menuItem: {
    flexDirection: 'row',
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
  },
  menuItemImage: {
    width: 100,
    height: 100,
  },
  menuItemInfo: {
    flex: 1,
    padding: 12,
  },
  menuItemName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  menuItemPrice: {
    fontSize: 14,
    color: '#FF424E',
    marginBottom: 4,
  },
  menuItemDescription: {
    fontSize: 13,
    color: '#666',
    marginBottom: 8,
  },
  addButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  itemDetails: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  closeButton: {
    position: 'absolute',
    right: 20,
    top: 20,
    zIndex: 1,
  },
  closeButtonText: {
    fontSize: 24,
    color: '#666',
  },
  detailImage: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    marginBottom: 15,
  },
  detailName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  detailPrice: {
    fontSize: 18,
    color: '#FF424E',
    marginBottom: 8,
  },
  detailDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
    lineHeight: 20,
  },
  detailAddButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  detailAddButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 1,
    backgroundColor: 'rgba(255,255,255,0.8)',
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButtonText: {
    fontSize: 24,
    color: '#333',
  },
}); 