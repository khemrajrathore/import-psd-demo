// @ts-nocheck
enum ObjectTypes {
  TEXTBOX = "StaticText",
  IMAGE = "StaticImage",
}
function getFormatDetails(designData: any) {
  const format = {
    width: designData.bounds.width,
    height: designData.bounds.height,
  };
  return format;
}

function getTextObjects(designData: any) {
  const layers = designData.layers;
  const textObjects: any[] = [];
  layers.forEach((layer, index) => {
    if (layer.type === "textLayer") {
      const bounds = layer.bounds;
      const baseProperties = {
        top: bounds.top,
        left: bounds.left,
        width: bounds.width,
        height: bounds.height,
        zIndex: index,
      };
      const text = layer.text;
      const defaultStyle = text!.defaultStyle;
      const color = defaultStyle.color;
      const textProperties = {
        type: ObjectTypes.TEXTBOX,

        fill: `rgba(${color.r},${color.g}, ${color.b}, ${color.a})`,
        metadata: {
          text: text!.value,
          fontSize: defaultStyle.font.size,
          textAlign: defaultStyle.font.align,
          fontFamily: defaultStyle.font.name,
        },
      };

      const textObject = Object.assign({}, textProperties, baseProperties);
      textObjects.push(textObject);
    }
  });
  return textObjects;
}

function getImageObjects(designData) {
  const layers = designData.layers;
  const imageObjects: any[] = [];
  layers.forEach((layer, index) => {
    if (layer.type === "layer" && layer.visible) {
      const bounds = layer.bounds;
      const baseProperties = {
        top: bounds.top,
        left: bounds.left,
        width: bounds.width,
        height: bounds.height,
        zIndex: index,
      };
      const imageProperties = {
        type: ObjectTypes.IMAGE,
        metadata: {
          src: layer.bitmap.filename,
        },
      };
      const imageObject = Object.assign({}, imageProperties, baseProperties);
      imageObjects.push(imageObject);
    }
  });
  return imageObjects;
}

function compare(a: any, b: any) {
  if (a.zIndex < b.zIndex) {
    return 1;
  }
  if (a.zIndex > b.zIndex) {
    return -1;
  }
  return 0;
}

export function parseDesign(designData) {
  const frame = getFormatDetails(designData);
  const objects = [
    ...getTextObjects(designData),
    ...getImageObjects(designData),
  ].sort(compare);
  // const orderedObjects = objects.sort(compare)
  return {
    frame,
    objects,
  };
}
