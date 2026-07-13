import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description, keywords, url, image }) => {
  const siteTitle = title ? `${title} | Vividh Talks` : 'Vividh Talks | Where Stories Come Alive';
  const siteDescription = description || "India's boldest podcast platform and production suite for creators, founders, and brands that deserve to be heard.";
  const siteKeywords = keywords || "podcast studio, video podcasting, creators, founders, vividh talks";
  const siteUrl = url || "https://vividhtalks.com";
  const siteImage = image || "https://vividhtalks.com/images/hero_studio.webp"; // Example OpenGraph image

  return (
    <Helmet>
      {/* Standard Metadata */}
      <title>{siteTitle}</title>
      <meta name="description" content={siteDescription} />
      <meta name="keywords" content={siteKeywords} />
      
      {/* OpenGraph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={siteUrl} />
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={siteDescription} />
      <meta property="og:image" content={siteImage} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={siteUrl} />
      <meta name="twitter:title" content={siteTitle} />
      <meta name="twitter:description" content={siteDescription} />
      <meta name="twitter:image" content={siteImage} />
    </Helmet>
  );
};

export default SEO;
