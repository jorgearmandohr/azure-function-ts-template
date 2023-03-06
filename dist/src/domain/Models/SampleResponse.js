"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SampleResponse {
    constructor(statusCode, message) {
        this.json = () => {
            return JSON.stringify(this);
        };
        this.statusCode = statusCode;
        this.message = message;
    }
}
exports.default = SampleResponse;
//# sourceMappingURL=SampleResponse.js.map