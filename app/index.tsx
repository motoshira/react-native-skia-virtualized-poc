import { Text, View } from "react-native";
import NormalListView from "./NormalListView";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "stretch",
      }}
    >
      <NormalListView />
    </View>
  );
}
