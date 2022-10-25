import { Database } from "./DBInterface";

export class SQL implements Database {
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