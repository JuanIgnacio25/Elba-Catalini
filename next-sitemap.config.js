/** @type {import('next-sitemap').IConfig} */
const config = {
  siteUrl: 'https://elbacatalini.com',
  generateRobotsTxt: true,
  changefreq: 'daily',
  priority: 0.7,
  sitemapSize: 5000,
  exclude: ['/admin', '/dashboard'],
};

export default config;