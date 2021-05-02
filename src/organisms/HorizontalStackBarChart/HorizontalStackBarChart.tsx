import React, { useEffect, useState } from "react";
import { Grid } from "@visx/grid";
import { Group } from "@visx/group";
import { scaleBand, scaleLinear, scaleOrdinal } from "@visx/scale";
import { BarStack } from "@visx/shape";
import { useTooltip, useTooltipInPortal, defaultStyles } from "@visx/tooltip";
import { ds } from './data';

const purple1 = "#6c5efb";
const purple2 = "#c998ff";
const purple3 = "#a44afe";
const background = "#eaedff";
const defaultMargin = { bottom: 40, left: 40, right: 40, top: 40 };
const tooltipStyles = {
  ...defaultStyles,
  minWidth: 60,
  backgroundColor: "rgba(0,0,0,0.9)",
  color: "white"
};

export default function App({ width, height, margin = defaultMargin }) {
  const [aaii, setAaii] = useState([]);
  const [sentiment, setSentiment] = useState([]);

  useEffect(() => {
    let dump = ds.dataset.data.map((d) => {
      return {
        date: d[0],
        bullish: d[1] * 100,
        neutral: d[2] * 100,
        bearish: d[3] * 100
      };
    });

    setAaii(dump);
    setSentiment(Object.keys(dump[0]).filter((d) => d !== "date"));
  }, []);

  let tooltipTimeout;

  const { containerRef, TooltipInPortal } = useTooltipInPortal({
    scroll: true
  });

  const sentimentTotals = aaii.reduce((total, currentDate) => {
    const sentimentTotal = sentiment.reduce((dayTotal, k) => {
      dayTotal += currentDate[k];
      return dayTotal;
    }, 0);
    total.push(sentimentTotal);
    return total;
  }, []);

  // scales
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;
  const getDate = (d) => d.date;
  const dateScale = scaleBand({
    domain: aaii.map(getDate),
    range: [0, innerWidth],
    padding: 0.2
  });
  const aaiiScale = scaleLinear({
    domain: [0, Math.max(...sentimentTotals)],
    range: [innerHeight, 0],
    nice: true
  });
  const colorScale = scaleOrdinal({
    domain: sentiment,
    range: [purple1, purple2, purple3]
  });

  const {
    tooltipOpen,
    tooltipLeft,
    tooltipTop,
    tooltipData,
    hideTooltip,
    showTooltip
  } = useTooltip();

  return (
    <div className="app" style={{ position: "relative" }}>
      <svg ref={containerRef} width={width} height={height}>
        <rect
          x={0}
          y={0}
          width={width}
          height={height}
          fill={background}
          rx={14}
        />
        <Group left={margin.left} top={margin.top}>
          <Grid
            xScale={dateScale}
            yScale={aaiiScale}
            width={innerWidth}
            height={innerHeight}
            xOffset={dateScale.bandwidth() / 2}
          />
          <BarStack
            data={aaii}
            keys={sentiment}
            x={getDate}
            xScale={dateScale}
            yScale={aaiiScale}
            color={colorScale}
          >
            {(barStacks) =>
              barStacks.map((barStack) =>
                barStack.bars.map((bar) => (
                  <rect
                    key={`bar-stack-${barStack.index}-${bar.index}`}
                    x={bar.x}
                    y={bar.y}
                    height={bar.height}
                    width={bar.width}
                    fill={bar.color}
                    onMouseLeave={() => {
                      tooltipTimeout = window.setTimeout(() => {
                        hideTooltip();
                      }, 300);
                    }}
                    onMouseMove={(event) => {
                      if (tooltipTimeout) clearTimeout(tooltipTimeout);
                      const top = event.clientY;
                      const left = margin.left + bar.x + bar.width / 2;
                      showTooltip({
                        tooltipData: bar,
                        tooltipTop: top,
                        tooltipLeft: left
                      });
                    }}
                  />
                ))
              )
            }
          </BarStack>
        </Group>
      </svg>
      {tooltipOpen && tooltipData && (
        <TooltipInPortal
          key={Math.random()}
          top={tooltipTop}
          left={tooltipLeft}
          style={tooltipStyles}
        >
          <div style={{ color: colorScale(tooltipData.key) }}>
            <strong>{tooltipData.key}</strong>
          </div>
          <div>{JSON.stringify(tooltipData)}</div>
          <div>
            <small>{JSON.stringify(tooltipData.bar.data)}</small>
          </div>
        </TooltipInPortal>
      )}
    </div>
  );
}
