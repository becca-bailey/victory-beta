import * as React from 'react';

interface PathProps extends React.SVGProps<SVGPathElement> {
  desc?: string;
}

const Path = ({ desc, ...rest }: PathProps) => {
  return desc ? (
    <path {...rest}>
      <desc>{desc}</desc>
    </path>
  ) : (
    <path {...rest} />
  );
};

export default Path;
