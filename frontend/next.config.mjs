/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects(){
    return [
      {
        source: "/admin/:slug/:slug*",
        destination: "/admin",
        permanent: false,
        missing: [
          {
            type: "cookie",
            key: "token"
          }
        ]
      }
    ]
  }
};

export default nextConfig;
