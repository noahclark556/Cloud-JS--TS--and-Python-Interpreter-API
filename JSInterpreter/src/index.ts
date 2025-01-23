import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import ts from 'typescript'; 
import { createHash } from 'crypto';

function getDayAuthToken(): number {
    // This function has been redacted for security reasons
   return 0;
}

const app = express();
const port = process.env.PORT || 3001;

app.use(bodyParser.json());
app.use(cors());

app.post('/jsinterpreter', async (req, res) => {
    const { code, isTypeScript, auth } = req.body;

    // Check the day auth stuff
    // Easier than linking a cloud run func to firebase auth, less spotty
    if(!auth || auth.toString() != getDayAuthToken().toString()){
        return res.status(400).json({ error: 'Invalid Auth Token' });
    }

    if (!code) {
        console.log(code);
        return res.status(400).json({ error: 'No Code Provided' });
    }

    // Store log to set back later
    const originalLog = console.log;
    try {
        let decodedCode = Buffer.from(code, 'base64').toString('utf-8');
        
        if (isTypeScript) {
            // compile ts if thats what is being used
            decodedCode = ts.transpileModule(decodedCode, {
                compilerOptions: { module: ts.ModuleKind.CommonJS }
            }).outputText;
        }
        // setting console log to capture in an array instead of default console
        const logs: string[] = [];
        console.log = function (...args) {
            logs.push(args.join(' '));
        };

        // execute the code
        let result = eval(decodedCode);

        // in the case that the code has async
        if (result instanceof Promise) {
            result = await result;
        }
        // set log back to original guy
        console.log = originalLog;

        return res.json({
            logs: logs.length ? logs : null,
            result: result !== undefined ? result : null
        });

    } catch (error: any) {
        console.log = originalLog;
        return res.status(400).json({
            error: 'Invalid JavaScript code',
            details: error.message,
            stack: error.stack // Include the stack trace in the response
        });
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
