import { Config } from 'src/types';

export default (initialConfig: Config): Config => {
  const { colors, shapes, tools } = initialConfig.theme;

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

  // ----- 2. Mutate tool colors ----- //

  const finalToools: Config['theme']['tools'] = {
    ...tools,
    axis: {
      ...tools.axis,
      color: colors[tools.axis.color],
    },
    background: {
      ...tools.background,
      backgroundColor: colors[tools.background.backgroundColor],
    },
    grid: {
      ...tools.grid,
      stroke: colors[tools.grid.stroke],
    },
    tooltip: {
      ...tools.tooltip,
      backgroundColor: colors[tools.tooltip.backgroundColor],
      color: colors[tools.tooltip.color],
    },
  };

  // ----- final step: return mutated config ----- //

  return {
    ...initialConfig,
    theme: {
      ...initialConfig.theme,
      shapes: finalShapes,
      tools: finalToools,
    },
  };
};
