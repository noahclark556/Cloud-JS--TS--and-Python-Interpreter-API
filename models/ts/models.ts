// These aren't used in the Cloud Run Func but are used in the Firebase func to translate the data and handle it better

export interface IntepreterResponse {
    logs: Map<string, Array<string>>;
    result: string;
}

export class InterpreterSuccess {
    response: IntepreterResponse;
    constructor(response: IntepreterResponse) {
        this.response = {
            logs: response.logs,
            result: response.result
        }
    }
}

export class InterpreterError {
    error: Map<string, string>;
    constructor(response: Map<string, string>) {
        this.error = response;
    }
}