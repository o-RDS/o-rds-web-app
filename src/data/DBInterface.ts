export interface Database {
    formatData(): object;
    writeData(): boolean;
    retrieveData(): boolean;
}