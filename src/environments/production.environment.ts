export const environment = {
    production: true,
    api: {
        name: 'production',
        protocol: 'https',
        host: 'aktyres-in.stackstaging.com/php-truck/class/employees.php',
        // port: '443',
        // version: 'v1',
        get url() {
            return `${this.protocol}://${this.host}`;
        },
    },
};
