export const environment = {
  production: false,
  api: {
    name: "development",
    protocol: "http",
    host: "localhost:3000",
    // port: "5088",
    // version: "v1",
    get url() {
      return `${this.protocol}://${this.host}`;
    },
  },
  basePath: "/",
};
