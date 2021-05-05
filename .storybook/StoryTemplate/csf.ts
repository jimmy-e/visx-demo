// eslint-disable-next-line import/no-extraneous-dependencies
import { ArgTypes, Meta } from '@storybook/react/types-6-0';

export default (
  path: string,
  options?: { argTypes?: ArgTypes; root?: 'Design System' | 'DemoPages' | 'Theme' },
): Meta => ({
  title: options?.root ? `${options.root}/${path}` : `Design System/${path}`,
  argTypes: options?.argTypes || {},
});
