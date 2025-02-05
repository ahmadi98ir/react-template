export class BuildLogger {
    static log(message: string, type: 'info' | 'error' | 'warning' = 'info') {
        const timestamp = new Date().toISOString();
        console.log(`[${timestamp}] [${type.toUpperCase()}] ${message}`);
    }

    static error(message: string, error?: Error) {
        this.log(message, 'error');
        if (error) {
            console.error('Error details:', error);
        }
    }
}
