import React from 'react';
import {
  AnimatedAnnotation,
  Annotation as StaticAnnotation,
  AnnotationCircleSubject,
  AnnotationConnector,
  AnnotationLabel,
  AnnotationLineSubject,
} from '@visx/xychart';
import { AnnotationProps } from '@visx/xychart/lib/components/annotation/Annotation';
import { XYChartProps } from 'src/types';

// ToDo: Repalce `any` with proper XScale, YScale, and Datum typing
type VisxAnnotationProps = Omit<AnnotationProps<any, any, any>, 'children'>;

interface Props extends VisxAnnotationProps {
  annotationType: 'circle' | 'line';
  isAnimated: XYChartProps['isAnimated'];
  stroke: string;
  subtitle: string;
  title: string;
}

const Annotation: React.FC<Props> = ({
  annotationType,
  isAnimated,
  stroke,
  subtitle,
  title,
  ...props
}) => {
  const VisxAnnotation = isAnimated ? AnimatedAnnotation : StaticAnnotation;

  return (
    <VisxAnnotation {...props}>
      <AnnotationConnector />
      {annotationType === 'circle' ? <AnnotationCircleSubject /> : <AnnotationLineSubject />}
      <AnnotationLabel
        title={title}
        subtitle={subtitle}
        width={135}
        backgroundProps={{
          stroke,
          strokeOpacity: 0.5,
          fillOpacity: 0.8,
        }}
      />
    </VisxAnnotation>
  );
}

export default Annotation;
