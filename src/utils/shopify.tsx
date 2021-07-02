import Client from 'shopify-buy';

const client = Client.buildClient({
  domain: 'astrohappy.com.br',
  storefrontAccessToken: 'b57fb74daecfc78b5fe938c4344874c0'
});

export { client }