import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  RefreshControl,
  Pressable,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AntDesign } from "@expo/vector-icons";
import { LikeStyle } from "./Like.style";

const LikeScreen = () => {
  const [likedItems, setLikedItems] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const fetchLikedItems = async () => {
    const storedLikedItems = await AsyncStorage.getItem("likedItems");
    if (storedLikedItems) {
      setLikedItems(JSON.parse(storedLikedItems));
    }
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchLikedItems().then(() => setRefreshing(false));
  }, []);

  useEffect(() => {
    fetchLikedItems();
  }, []);

  const toggleLike = async (item) => {
    try {
      const updatedLikedItems = likedItems.filter(
        (likedItem) => likedItem.url !== item.url
      );
      setLikedItems(updatedLikedItems);
      await AsyncStorage.setItem(
        "likedItems",
        JSON.stringify(updatedLikedItems)
      );
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };

  return (
    <View style={LikeStyle.Container}>
      <FlatList
        data={likedItems}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={LikeStyle.MainCotainer}>
            <View style={LikeStyle.ImageView}>
              <Image
                source={{ uri: item.urlToImage }}
                style={LikeStyle.Image}
              />
            </View>
            <Text style={LikeStyle.title}>
              {item.title.length > 60
                ? `${item.title.substring(0, 60)}...`
                : item.title}
            </Text>
            <Text style={LikeStyle.Date}>{item.publishedAt}</Text>
            <Pressable onPress={() => toggleLike(item)}>
              <AntDesign
                name="like1"
                size={24}
                color="#566093"
                style={LikeStyle.likeIcon}
              />
            </Pressable>
          </View>
        )}
        ListEmptyComponent={() => (
          <View style={LikeStyle.EmptyContainer}>
            <Text style={LikeStyle.EmptyText}>No liked items</Text>
          </View>
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </View>
  );
};

export default LikeScreen;
