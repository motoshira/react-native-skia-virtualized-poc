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
  y,
  entity,
  font,
}: {
  y: number;
  entity: Entity;
  font: SkFont;
}) => {
  const textStyle = {
    color: Skia.Color("black"),
    // fontFamilies: ["MPLUS1p"],
    // fontSize: FONT_SIZE,
    FontWeight: 700,
  };

  if (!font) {
    return null;
  }

  return (
    <Group transform={[{ translateY: y }]}>
      <RoundedRect
        rect={{
          rect: { x: 0, y: 0, width: 500, height: LIST_ITEM_HEIGHT },
          rx: 8,
          ry: 8,
        }}
        style="fill"
        color="#777777"
      />
      <RoundedRect
        rect={{
          rect: { x: 0, y: 0, width: 500, height: LIST_ITEM_HEIGHT },
          rx: 8,
          ry: 8,
        }}
        style="stroke"
        color="black"
        strokeWidth={2}
      />
      <Text
        font={font}
        text={entity.label}
        color="white"
        x={30}
        y={LIST_ITEM_HEIGHT - FONT_SIZE}
      />
    </Group>
  );
};

export default function NormalListView() {
  const canvasWidth = 300;
  const canvasHeight = 300;
  const entities = genRandomEitities(10);
  const font = useFont(require("../assets/fonts/MPLUS1p-Bold.ttf"), FONT_SIZE);
  if (!font) return null;

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Canvas style={{ width: canvasWidth, height: canvasHeight }}>
        {entities.map((e, i) => (
          <SkiaListItem
            key={e.id}
            entity={e}
            font={font}
            y={i * (LIST_ITEM_HEIGHT + LIST_ITEM_GAP)}
          />
        ))}
      </Canvas>
    </View>
  );
}
