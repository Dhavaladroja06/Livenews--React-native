import { StyleSheet } from "react-native";

export const LikeStyle = StyleSheet.create({
  Container: {
    flex: 1,
    paddingHorizontal: 3,
  },
  MainCotainer: {
    margin: 5,
    padding: 10,
    borderRadius: 15,
    height: 300,
    width: "auto",
    backgroundColor: "#fff",
    elevation: 10,
  },
  ImageView: {
    justifyContent: "center",
    alignItems: "center",
  },
  Image: {
    height: 175,
    width: "100%",
    resizeMode: "cover",
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    marginTop: 10,
  },
  Date: {
    fontSize: 16,
    fontWeight: "500",
    marginTop: 5,
  },
  likeIcon: {
    position:"absolute",
    right: 10,
    bottom: 2
  },
  EmptyContainer:{
    flex:1,
    justifyContent:"center",
    alignItems:"center",
    backgroundColor:"#fff"
  },
  EmptyText:{
    fontSize: 24,
    fontWeight:"700",
  }
});
