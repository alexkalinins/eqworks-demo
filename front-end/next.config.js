//proxy for api
module.exports = {
    async rewrites() {
      return [
        {
          source: '/api/:path*',
          destination: 'http://eqworks-demo-backend.vercel.app/:path*',
        },
      ]
    },
  }