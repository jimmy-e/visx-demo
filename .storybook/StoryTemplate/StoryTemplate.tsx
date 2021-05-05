import React from 'react';
import { EuiFlexGroup, EuiFlexItem, EuiText } from '@elastic/eui';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Story } from '@storybook/react/types-6-0';
import MockWrapper from 'src/__mocks__/MockWrapper';
import './storyTemplate.scss';

export interface Props {
  children: React.ReactElement | React.ReactElement[];
  description?: string;
  hasPadding?: boolean;
  isFullPage?: boolean;
  title?: string;
}

const StoryTemplateChildren: React.FC = ({ children }) => {
  if (React.Children.count(children)) {
    return (
      <>
        {React.Children.map(children, (child) => (
          <EuiFlexItem>{child}</EuiFlexItem>
        ))}
      </>
    );
  }

  return <EuiFlexItem>{children}</EuiFlexItem>;
};

const StoryTemplate: Story<Props> = ({
  children,
  description,
  hasPadding = true,
  isFullPage,
  title,
}) => {
  if (isFullPage) {
    return <div className="fullPageContainer">{children}</div>;
  }

  return (
    <MockWrapper>
      <div className={['storyTemplate', hasPadding ? 'hasPadding' : undefined].join(' ')}>
        <EuiFlexGroup direction="column">
          {title && (
            <EuiFlexItem>
              <EuiText>
                <h1>{title}</h1>
              </EuiText>
            </EuiFlexItem>
          )}
          {description && (
            <EuiFlexItem>
              <EuiText>
                <p>{description}</p>
              </EuiText>
            </EuiFlexItem>
          )}
          <StoryTemplateChildren>{children}</StoryTemplateChildren>
        </EuiFlexGroup>
      </div>
    </MockWrapper>
  );
};

export default StoryTemplate;
