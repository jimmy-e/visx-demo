import React, { useEffect, useState } from 'react';
import ParentSize from '@visx/responsive/lib/components/ParentSize';
import { BarStack } from '@visx/shape';
import { Grid } from '@visx/grid';
import { Group } from '@visx/group';
import { scaleBand, scaleLinear, scaleOrdinal } from '@visx/scale';
import { useTooltip, useTooltipInPortal, defaultStyles } from '@visx/tooltip';
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

interface Props {
  height: number;
  width: number;
}

const VerticalBarStackExpand: React.FC<Props> = ({ height, width }) => {
  const margin = defaultMargin;
  const [data, setData] = useState([]);
  const [sentiment, setSentiment] = useState([]);

  useEffect(() => {
    let data = ds.map((datum) => {
      return {
        date: datum[0],
        bullish: datum[1],
        neutral: datum[2],
        bearish: datum[3],
      };
    });

    setData(data);
    setSentiment(Object.keys(data[0]).filter((d) => d !== "date"));
  }, []);

  let tooltipTimeout;

  const { containerRef, TooltipInPortal } = useTooltipInPortal({
    scroll: true
  });

  const sentimentTotals = data.reduce((total, currentDate) => {
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
    domain: data.map(getDate),
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
            stroke="black"
            strokeOpacity={0.1}
            xOffset={dateScale.bandwidth() / 2}
          />
          <BarStack
            data={data}
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

// ----- ADDING RESPONSIVENESS ----- //

const VerticalBarStackExpandContainer: React.FC = () => (
  <ParentSize>
    {
      ({ height, width }) => (
        <VerticalBarStackExpand height={height} width={width} />
      )
    }
  </ParentSize>
);

export default VerticalBarStackExpandContainer;
