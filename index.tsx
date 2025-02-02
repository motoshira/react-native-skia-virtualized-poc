import "@expo/metro-runtime";
import { App } from "expo-router/build/qualified-entry";
import { renderRootComponent } from "expo-router/build/renderRootComponent";

import { LoadSkiaWeb } from "@shopify/react-native-skia/lib/module/web";
import { Text, View } from "react-native";

LoadSkiaWeb().then(async () => {
  renderRootComponent(App);
});
