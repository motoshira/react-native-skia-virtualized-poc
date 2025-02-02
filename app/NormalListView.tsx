import React, { useState } from "react";
import { View } from "react-native";
import {
  Skia,
  Canvas,
  Circle,
  TextAlign,
  useFont,
  useFonts,
  Paragraph,
  SkTypefaceFontProvider,
  RoundedRect,
  PaintStyle,
  SkFont,
  Text,
  FontWeight,
  Group,
} from "@shopify/react-native-skia";
import { useMemo } from "react";
import {
  useSharedValue,
  useDerivedValue,
  SharedValue,
} from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
// import MPLUS1pRegular from "../assets/fonts/MPLUS1p-Regular.ttf";

const randomString = () => Math.random().toString(32).substring(2);

type Entity = {
  id: string;
  label: string;
};

const genRandomEitities = (amount: number) => {
  const entities: Entity[] = [];
  for (let i = 0; i < amount; i++) {
    entities.push({
      id: randomString(),
      label: randomString(),
    });
  }
  return entities;
};

const LIST_ITEM_HEIGHT = 36;
const LIST_ITEM_GAP = 8;
const FONT_SIZE = 16;

const SkiaListItem = ({
  index,
  entity,
  font,
  width,
  padding,
}: {
  index: number;
  entity: Entity;
  font: SkFont;
  width: number;
  padding: number;
}) => {
  if (!font) {
    return null;
  }

  return (
    <>
      <RoundedRect
        rect={{
          rect: {
            x: padding,
            y: 0,
            width: width - padding * 2,
            height: LIST_ITEM_HEIGHT,
          },
          rx: 8,
          ry: 8,
        }}
        style="fill"
        color="#777777"
      />
      <RoundedRect
        rect={{
          rect: {
            x: padding,
            y: 0,
            width: width - padding * 2,
            height: LIST_ITEM_HEIGHT,
          },
          rx: 8,
          ry: 8,
        }}
        style="stroke"
        color="black"
        strokeWidth={2}
      />
      <Text
        font={font}
        text={`${index}: ${entity.label}`}
        color="white"
        x={30}
        y={LIST_ITEM_HEIGHT - FONT_SIZE}
      />
    </>
  );
};

const ListItemWrap = ({
  offsetY,
  index,
  children,
}: {
  offsetY: SharedValue<number>;
  index: number;
  children: React.ReactNode;
}) => {
  const transform = useDerivedValue(() => [
    { translateY: offsetY.value + index * (LIST_ITEM_HEIGHT + LIST_ITEM_GAP) },
  ]);
  return <Group transform={transform}>{children}</Group>;
};

export default function NormalListView() {
  const [canvasWidth, setCanvasWidth] = useState(0);
  const [canvasHeight, setCanvasHeight] = useState(0);
  const entities = genRandomEitities(1000);
  const font = useFont(require("../assets/fonts/MPLUS1p-Bold.ttf"), FONT_SIZE);
  const offsetY = useSharedValue(0);
  const startY = useSharedValue(0);

  const dragGesture = Gesture.Pan()
    .onBegin((_) => {
      startY.value = offsetY.value;
    })
    .onUpdate((e) => {
      offsetY.value = Math.min(0, startY.value + e.translationY);
    });

  if (!font) return null;

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
      onLayout={(e) => {
        console.log("onLayout", e.nativeEvent.layout);
        setCanvasHeight(e.nativeEvent.layout.height);
        setCanvasWidth(e.nativeEvent.layout.width);
      }}
    >
      <GestureDetector gesture={dragGesture}>
        <Canvas
          style={{
            width: canvasWidth,
            height: canvasHeight,
          }}
        >
          {entities.map((e, i) => (
            <ListItemWrap key={e.id} offsetY={offsetY} index={i}>
              <SkiaListItem
                index={i}
                entity={e}
                font={font}
                width={canvasWidth}
                padding={8}
              />
            </ListItemWrap>
          ))}
        </Canvas>
      </GestureDetector>
    </View>
  );
}
