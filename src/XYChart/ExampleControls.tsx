/* eslint-disable jsx-a11y/accessible-emoji */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useCallback, useMemo, useState } from 'react';
import { lightTheme, darkTheme, XYChartTheme } from '@visx/xychart';
import { PatternLines } from '@visx/pattern';
import cityTemperature, { CityTemperature } from '@visx/mock-data/lib/mocks/cityTemperature';
import customTheme from './customTheme';
import { DataKey, XYChartProps } from '../types';

const numTicks = 4;
const data = cityTemperature.slice(225, 275);
const dataMissingValues = data.map((d, i) =>
  i === 10 || i === 11
    ? { ...d, 'San Francisco': 'nope', 'New York': 'notanumber', Austin: 'null' }
    : d,
);
const dataSmall = data.slice(0, 15);
const dataSmallMissingValues = dataMissingValues.slice(0, 15);
const getDate = (d: CityTemperature) => d.date;
const getSfTemperature = (d: CityTemperature) => Number(d['San Francisco']);
const getNegativeSfTemperature = (d: CityTemperature) => -getSfTemperature(d);
const getNyTemperature = (d: CityTemperature) => Number(d['New York']);
const getAustinTemperature = (d: CityTemperature) => Number(d.Austin);
const defaultAnnotationDataIndex = 13;
const selectedDatumPatternId = 'xychart-selected-datum';

type Props = {
  children: (props: XYChartProps) => React.ReactElement;
  height: number;
  width: number;
};

export default function ExampleControls({ children, height, width }: Props) {
  // More complicated
  const [renderHorizontally, setRenderHorizontally] = useState(false);
  const [theme, setTheme] = useState<XYChartTheme>(darkTheme);
  const [renderBarStackOrGroup, setRenderBarStackOrGroup] = useState<
    'bar' | 'barstack' | 'bargroup' | 'none'
    >('none');
  const [renderAreaLineOrStack, setRenderAreaLineOrStack] = useState<
    'line' | 'area' | 'areastack' | 'none'
    >('areastack');
  const [annotationDataKey, setAnnotationDataKey] = useState<XYChartProps['annotationDataKey']>(
    null,
  );
  const [annotationDataIndex, setAnnotationDataIndex] = useState(defaultAnnotationDataIndex);
  const [negativeValues, setNegativeValues] = useState(false);
  const [fewerDatum, setFewerDatum] = useState(false);
  const [missingValues, setMissingValues] = useState(false);

  // for series that support it, return a colorAccessor which returns a custom color if the datum is selected
  const colorAccessorFactory = useCallback(
    (dataKey: DataKey) => (d: CityTemperature) =>
      annotationDataKey === dataKey && d === data[annotationDataIndex]
        ? `url(#${selectedDatumPatternId})`
        : null,
    [annotationDataIndex, annotationDataKey],
  );

  const accessors = useMemo(
    () => ({
      x: {
        'San Francisco': renderHorizontally
          ? negativeValues
            ? getNegativeSfTemperature
            : getSfTemperature
          : getDate,
        'New York': renderHorizontally ? getNyTemperature : getDate,
        Austin: renderHorizontally ? getAustinTemperature : getDate,
      },
      y: {
        'San Francisco': renderHorizontally
          ? getDate
          : negativeValues
            ? getNegativeSfTemperature
            : getSfTemperature,
        'New York': renderHorizontally ? getDate : getNyTemperature,
        Austin: renderHorizontally ? getDate : getAustinTemperature,
      },
      date: getDate,
    }),
    [renderHorizontally, negativeValues],
  );

  return (
    <>
      {children({
        accessors,
        annotationDataKey,
        annotationDatum: data[annotationDataIndex],
        colorAccessorFactory,
        data: fewerDatum
          ? missingValues
            ? dataSmallMissingValues
            : dataSmall
          : missingValues
            ? dataMissingValues
            : data,
        height,
        numTicks,
        renderHorizontally,
        renderAreaSeries: renderAreaLineOrStack === 'area',
        renderAreaStack: renderAreaLineOrStack === 'areastack',
        renderLineSeries: renderAreaLineOrStack === 'line',
        setAnnotationDataIndex,
        setAnnotationDataKey,
        theme,
        width,
      })}
      {/** This style is used for annotated elements via colorAccessor. */}
      <svg className="pattern-lines">
        <PatternLines
          id={selectedDatumPatternId}
          width={6}
          height={6}
          orientation={['diagonalRightToLeft']}
          stroke={theme?.axisStyles.x.bottom.axisLine.stroke}
          strokeWidth={1.5}
        />
      </svg>
      <div className="controls">
        {/** data */}
        <div>
          <strong>data</strong>
          <label>
            <input
              type="checkbox"
              onChange={() => setNegativeValues(!negativeValues)}
              checked={negativeValues}
            />
            negative values (SF)
          </label>
          <label>
            <input
              type="checkbox"
              onChange={() => setMissingValues(!missingValues)}
              checked={missingValues}
            />
            missing values
          </label>
          <label>
            <input
              type="checkbox"
              onChange={() => setFewerDatum(!fewerDatum)}
              checked={fewerDatum}
            />
            fewer datum
          </label>
        </div>

        {/** theme */}
        <div>
          <strong>theme</strong>
          <label>
            <input
              type="radio"
              onChange={() => setTheme(lightTheme)}
              checked={theme === lightTheme}
            />
            light
          </label>
          <label>
            <input
              type="radio"
              onChange={() => setTheme(darkTheme)}
              checked={theme === darkTheme}
            />
            dark
          </label>
          <label>
            <input
              type="radio"
              onChange={() => setTheme(customTheme)}
              checked={theme === customTheme}
            />
            custom
          </label>
        </div>

        <br />

        {/** series */}
        {/** orientation */}
        <div>
          <strong>series orientation</strong>
          <label>
            <input
              type="radio"
              onChange={() => setRenderHorizontally(false)}
              checked={!renderHorizontally}
            />
            vertical
          </label>
          <label>
            <input
              type="radio"
              onChange={() => setRenderHorizontally(true)}
              checked={renderHorizontally}
            />
            horizontal
          </label>
        </div>
        <div>
          <strong>line series</strong>
          <label>
            <input
              type="radio"
              onChange={() => {
                if (renderBarStackOrGroup === 'barstack' || renderBarStackOrGroup === 'bargroup') {
                  setRenderBarStackOrGroup('none');
                }
                setRenderAreaLineOrStack('line');
              }}
              checked={renderAreaLineOrStack === 'line'}
            />
            line
          </label>
          <label>
            <input
              type="radio"
              onChange={() => {
                if (renderBarStackOrGroup === 'barstack' || renderBarStackOrGroup === 'bargroup') {
                  setRenderBarStackOrGroup('none');
                }
                setRenderAreaLineOrStack('area');
              }}
              checked={renderAreaLineOrStack === 'area'}
            />
            area
          </label>
          <label>
            <input
              type="radio"
              onChange={() => {
                setRenderBarStackOrGroup('none');
                setRenderAreaLineOrStack('areastack');
              }}
              checked={renderAreaLineOrStack === 'areastack'}
            />
            area stack
          </label>
          <label>
            <input
              type="radio"
              onChange={() => setRenderAreaLineOrStack('none')}
              checked={renderAreaLineOrStack === 'none'}
            />
            none
          </label>
        </div>
        <div>
          <strong>bar series</strong>
          <label>
            <input
              type="radio"
              onChange={() => {
                if (renderAreaLineOrStack === 'areastack') {
                  setRenderAreaLineOrStack('none');
                }
                setRenderBarStackOrGroup('bar');
              }}
              checked={renderBarStackOrGroup === 'bar'}
            />
            bar
          </label>
          <label>
            <input
              type="radio"
              onChange={() => {
                setRenderAreaLineOrStack('none');
                setRenderBarStackOrGroup('barstack');
              }}
              checked={renderBarStackOrGroup === 'barstack'}
            />
            bar stack
          </label>
          <label>
            <input
              type="radio"
              onChange={() => {
                setRenderAreaLineOrStack('none');
                setRenderBarStackOrGroup('bargroup');
              }}
              checked={renderBarStackOrGroup === 'bargroup'}
            />
            bar group
          </label>
          <label>
            <input
              type="radio"
              onChange={() => setRenderBarStackOrGroup('none')}
              checked={renderBarStackOrGroup === 'none'}
            />
            none
          </label>
        </div>
        <br />
        {/** annotation */}
        <div>
          <strong>annotation</strong> (click chart to update)
          <label>
            <input
              type="radio"
              onChange={() => setAnnotationDataKey(null)}
              checked={annotationDataKey == null}
            />
            none
          </label>
          <label>
            <input
              type="radio"
              onChange={() => setAnnotationDataKey('San Francisco')}
              checked={annotationDataKey === 'San Francisco'}
            />
            SF
          </label>
          <label>
            <input
              type="radio"
              onChange={() => setAnnotationDataKey('New York')}
              checked={annotationDataKey === 'New York'}
            />
            NY
          </label>
          <label>
            <input
              type="radio"
              onChange={() => setAnnotationDataKey('Austin')}
              checked={annotationDataKey === 'Austin'}
            />
            Austin
          </label>
        </div>

        <br />
      </div>
      <style jsx>{`
        .controls {
          font-size: 13px;
          line-height: 1.5em;
        }
        .controls > div {
          margin-bottom: 4px;
        }
        label {
          font-size: 12px;
        }
        input[type='radio'] {
          height: 10px;
        }
        .pattern-lines {
          position: absolute;
          pointer-events: none;
          opacity: 0;
        }
      `}</style>
    </>
  );
}
