import {
  View,
  Button,
  FlatList,
  ActivityIndicator,
  Text,
  Pressable,
  Image,
  Linking,
  RefreshControl
} from "react-native";
import { useDiscoverNews } from "../../api/NewsApi";
import { DiscoverStyle } from "./Discover.style";
import { AntDesign } from "@expo/vector-icons";
import React, { useState, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';


const categories = [
  "business",
  "entertainment",
  "general",
  "health",
  "science",
  "sports",
  "technology",
];

const formatDateTime = (dateTimeString) => {
  const options = {
    day: "numeric",
    month: "short",
    year: "numeric",
    weekday: "short",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };
  return new Date(dateTimeString).toLocaleString("en-US", options);
};
const openUrl = (url) => {
  Linking.openURL(url);
};

const NewsScreen = () => {
  const [selectedCategory, setSelectedCategory] = useState("business");
  const [likedItems, setLikedItems] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage , refetch} =
    useDiscoverNews(selectedCategory);


      const fetchLikedItems = async () => {
        const storedLikedItems = await AsyncStorage.getItem('likedItems');
        if (storedLikedItems) {
          setLikedItems(JSON.parse(storedLikedItems));
        }
      };

      useEffect(() => {
        fetchLikedItems();
      }, [likedItems]);
    

  const toggleLike = async (item) => {
    try {
      const index = likedItems.findIndex((likedItem) => likedItem.url === item.url);

      if (index === -1) {
        const updatedLikedItems = [...likedItems, item];
        setLikedItems(updatedLikedItems);
        await AsyncStorage.setItem('likedItems', JSON.stringify(updatedLikedItems));
      } else {
        const updatedLikedItems = likedItems.filter((_, i) => i !== index);
        setLikedItems(updatedLikedItems);
        await AsyncStorage.setItem('likedItems', JSON.stringify(updatedLikedItems));
      }
    } catch (error) {
      console.error('Error toggling like:', error);
    }
  };

  const onRefresh = async () => {
    setIsRefreshing(true);
    await refetch();
    setIsRefreshing(false);
  };

  const renderItem = ({ item }) => (
    <Pressable onPress={() => openUrl(item.url)}>
      <View style={DiscoverStyle.MainCotainer}>
        <Image source={{ uri: item.urlToImage }} style={DiscoverStyle.Image} />
        <Text style={DiscoverStyle.title}>
          {item.title.length > 60
            ? `${item.title.substring(0, 60)}...`
            : item.title}
        </Text>
        <Text style={DiscoverStyle.Date}>
          {formatDateTime(item.publishedAt)}
        </Text>
        <Pressable onPress={() => toggleLike(item)}>
          <AntDesign
            name={likedItems.some((likedItem) => likedItem.url === item.url) ? "like1" : "like2"}
            size={24}
            color="#566093"
            style={DiscoverStyle.likeIcon} 
          />
        </Pressable>

      </View>
    </Pressable>
  );

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  return (
    <View style={DiscoverStyle.Container}>
      <FlatList
        horizontal
        data={categories}
        renderItem={({ item }) => (
          <View style={DiscoverStyle.categoriesContainer}>
            <Pressable
              onPress={() => handleCategoryChange(item)}
              style={
                item === selectedCategory
                  ? DiscoverStyle.selected
                  : DiscoverStyle.DisSelected
              }
            >
              <Text
                style={
                  item === selectedCategory
                    ? DiscoverStyle.selectedtext
                    : DiscoverStyle.DisSelectedtext
                }
              >
                {item}
              </Text>
            </Pressable>
          </View>
        )}
        keyExtractor={(item) => item}
        showsHorizontalScrollIndicator={false}
      />

      {data ? (
        <FlatList
          data={data?.pages.flatMap((page) => page)}
          renderItem={renderItem}
          keyExtractor={(_, index) => String(index)}
          onEndReached={fetchNextPage}
          onEndReachedThreshold={0.5}
          ListFooterComponent={
            hasNextPage ? (
              <ActivityIndicator animating={isFetchingNextPage} />
            ) : null
          }
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={onRefresh}
              colors={["#566093"]}
            />
          }
          showsVerticalScrollIndicator={false}
        />
      ) : null}
    </View>
  );
};

export default NewsScreen;
