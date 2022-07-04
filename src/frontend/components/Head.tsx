import React from 'react';
import Helmet from 'react-helmet';

interface HeadProps {
  title?: string;
  description?: string;
  url?: string;
  image?: string;
  children?: any;
}

/**
 * @example <caption>Example with custom values.</caption>
 * <Head title='Page title' description='Page description' url='https://eduli.com/page' image='https://asset.com/img.png' />
 * @example <caption>Example with default values.</caption>
 * <Head />
*/
const Head: React.FC<HeadProps> = ({
  title = 'Card challenge',
  description = 'Made it with love <3.',
  url = '/',
  image,
  children,
}) => {
  return (
    <Helmet>
      <title>{title}</title>
      {/* Google */}
      <meta name='title' content={title} />
      <meta name='description' content={description} />
      {/* Other social media */}
      <meta property='og:title' content={title} />
      <meta property='og:description' content={description} />
      <meta property='og:type' content='website' />
      <meta property='og:url' content={url} />
      {image && (<meta property='og:image' content={image} />)}

      {/* Twitter */}
      <meta name='twitter:card' content='summary' />
      <meta name='twitter:title' content={title} />
      <meta name='twitter:description' content={description} />
      {image && (<meta name='twitter:image:src' content={image} />)}

      {children}
    </Helmet>
  );
};

export default Head;
