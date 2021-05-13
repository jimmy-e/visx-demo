import { Config } from 'src/types';

export default (initialConfig: Config): Config => {
  const { colors, shapes } = initialConfig.theme;

  // ----- 1. Mutate shape colors ----- //

  const finalShapes: Config['theme']['shapes'] = {
    ...shapes,
  };

  Object.keys(shapes).forEach((shapeType) => {
    const shapeColors = shapes[shapeType].colors;
    const hexColors = shapeColors.map((color: string) => colors[color]);
    finalShapes[shapeType] = {
      colors: hexColors,
    };
  });

  // ----- final step: return mutated config ----- //

  return {
    ...initialConfig,
    theme: {
      ...initialConfig.theme,
      shapes: finalShapes,
    },
  };
};
