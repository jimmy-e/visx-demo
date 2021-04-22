import React, { useState } from 'react';
import {
  AnimatedAnnotation,
  Annotation as StaticAnnotation,
  AnnotationCircleSubject,
  AnnotationConnector,
  AnnotationLabel,
  AnnotationLineSubject,
} from '@visx/xychart';
import { AnnotationProps } from '@visx/xychart/lib/components/annotation/Annotation';
import { XYChartProps } from 'src/XYChart/types';

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

  const [annotationLabelPosition, setAnnotationLabelPosition] = useState({ dx: -40, dy: -20 });

  return (
    <VisxAnnotation
      dx={annotationLabelPosition.dx}
      dy={annotationLabelPosition.dy}
      onDragEnd={({ dx, dy }) => setAnnotationLabelPosition({ dx, dy })}
      {...props}
    >
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
