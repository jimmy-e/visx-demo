import React from 'react';
import { Tooltip as VisxTooltip } from '@visx/xychart';
import { TooltipProps } from '@visx/xychart/lib/components/Tooltip';

// ToDo: Repalce `any` with proper datum typing
type Props = TooltipProps<any>;

const XYTooltip: React.FC<Props> = ({ ...props }) => <VisxTooltip {...props} />;

export default XYTooltip;
