import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  Image,
  Pressable,
  Linking,
  RefreshControl,
} from "react-native";
import { useBreakingNews } from "../../api/NewsApi";
import { HomeStyle } from "./Home.style";
import { AntDesign } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const HomeScreen = () => {
  const { data, isLoading, isError, fetchNextPage, hasNextPage, refetch } =
    useBreakingNews();

  const [likedItems, setLikedItems] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  
  const fetchLikedItems = async () => {
    const storedLikedItems = await AsyncStorage.getItem("likedItems");
    if (storedLikedItems) {
      setLikedItems(JSON.parse(storedLikedItems));
    }
  };

  useEffect(() => {
    fetchLikedItems();
  }, [likedItems]);


  const openUrl = (url) => {
    Linking.openURL(url);
  };

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

  const toggleLike = async (item) => {
    try {
      const index = likedItems.findIndex(
        (likedItem) => likedItem.url === item.url
      );

      if (index === -1) {
        const updatedLikedItems = [...likedItems, item];
        setLikedItems(updatedLikedItems);
        await AsyncStorage.setItem(
          "likedItems",
          JSON.stringify(updatedLikedItems)
        );
      } else {
        const updatedLikedItems = likedItems.filter((_, i) => i !== index);
        setLikedItems(updatedLikedItems);
        await AsyncStorage.setItem(
          "likedItems",
          JSON.stringify(updatedLikedItems)
        );
      }
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };

  const onRefresh = async () => {
    setIsRefreshing(true);
    await refetch();
    setIsRefreshing(false);
  };

  if (isLoading) {
    return (
      <View style={HomeStyle.isError}>
        <ActivityIndicator size="large" color="#566093" />
      </View>
    );
  }

  if (isError) {
    return (
      <View style={HomeStyle.isError}>
        <Text>Error fetching data</Text>
      </View>
    );
  }

  return (
    <View style={HomeStyle.Container}>
      <FlatList
        data={data.pages.flatMap((page) => page)}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Pressable onPress={() => openUrl(item.url)}>
            <View style={HomeStyle.MainCotainer}>
              <View style={HomeStyle.ImageView}>
                <Image
                  source={{ uri: item.urlToImage }}
                  style={HomeStyle.Image}
                />
              </View>
              <Text style={HomeStyle.title}>
                {item.title.length > 60
                  ? `${item.title.substring(0, 60)}...`
                  : item.title}
              </Text>
              <Text style={HomeStyle.Date}>
                {formatDateTime(item.publishedAt)}
              </Text>
              <Pressable onPress={() => toggleLike(item)}>
                <AntDesign
                  name={
                    likedItems.some((likedItem) => likedItem.url === item.url)
                      ? "like1"
                      : "like2"
                  }
                  size={24}
                  color="#566093"
                  style={HomeStyle.likeIcon}
                />
              </Pressable>
            </View>
          </Pressable>
        )}
        onEndReached={() => {
          if (hasNextPage) {
            fetchNextPage();
          }
        }}
        onEndReachedThreshold={1}
        ListFooterComponent={() =>
          isLoading ? <ActivityIndicator size="large" color="#566093" /> : null
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
    </View>
  );
};

export default HomeScreen;
