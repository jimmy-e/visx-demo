// eslint-disable-next-line import/no-extraneous-dependencies
import { ArgTypes, Meta } from '@storybook/react/types-6-0';

export default (path: string, options?: { argTypes?: ArgTypes }): Meta => ({
  argTypes: options?.argTypes || {},
  title: path,
});
