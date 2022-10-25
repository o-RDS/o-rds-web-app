import { Database } from "./DBInterface";

export class NoSQL implements Database {
    formatData() {
        return {};
    }

    writeData() {
        return false;
    }

    retrieveData() {
        return false;
    }
}