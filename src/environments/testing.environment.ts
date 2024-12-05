export const environment = {
    production: false,
    api: {
        name: 'testing',
        protocol: 'https',
        host: 'aktyres-in.stackstaging.com/php-truck/class',
        port: '80',
        version: 'v1',
        get url() {
            return `${this.protocol}://${this.host}`;
        },
    },
    basePath: '/',
}