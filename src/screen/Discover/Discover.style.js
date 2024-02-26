import { StyleSheet } from "react-native";

export const DiscoverStyle = StyleSheet.create({
  
  Container: {
    flex: 1,
    paddingHorizontal: 3,
  },
  selected: {
    fontSize: 18,
    backgroundColor: "#566093",
    borderRadius: 20,
    marginBottom: 5,
    height: 30,
    width: 120,
    justifyContent: "center",
    alignItems: "center",
    padding: 3,
    elevation: 5,
  },
  DisSelected: {
    backgroundColor: "#fff",
    borderRadius: 20,
    height: 30,
    width: 120,
    justifyContent: "center",
    alignItems: "center",
    padding: 3,
    elevation: 5,
  },
  selectedtext: {
    fontSize: 16,
    color: "#fff",
  },
  DisSelectedtext: {
    fontSize: 16,
  },
  categoriesContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: 3,
    backgroundColor: "#fff"
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
  Image:{
    width:"100%",
    height:175,
    resizeMode:"cover"
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
});
