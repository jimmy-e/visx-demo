import React from 'react';
import { EuiSpacer, EuiText } from '@elastic/eui';
import './storySection.scss';

interface Props {
  direction?: 'column' | 'row';
  title?: string;
}

const StorySectionChildren: React.FC = ({ children }) => {
  if (React.Children.count(children)) {
    return (
      <>
        {React.Children.map(children, (child) => (
          <div className="childContainer">{child}</div>
        ))}
      </>
    );
  }

  return <div className="childContainer">{children}</div>;
};

const StorySection: React.FC<Props> = ({ children, direction = 'column', title }) => (
  <div className="container">
    {title && (
      <>
        <EuiText>
          <h2>{title}</h2>
        </EuiText>
        <EuiSpacer />
      </>
    )}
    <div className={['childrenContainer', direction].join(' ')}>
      <StorySectionChildren>{children}</StorySectionChildren>
    </div>
  </div>
);

export default StorySection;
