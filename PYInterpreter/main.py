from flask import Flask, request, jsonify
import base64
import io
import sys
import hashlib
from datetime import datetime, timezone

def getDayAuthToken():
    # This function has been redacted for security reasons
    return 0

app = Flask(__name__)

@app.route('/pyinterpreter', methods=['POST'])
def run_python_code():
    data = request.get_json()
    b64_code = data.get('code')
    auth = data.get('auth')

    # check auth token
    if str(auth) != str(getDayAuthToken()):
        return jsonify({'error': 'Invalid auth token', 'details':'', 'stack':''}), 401

    if not b64_code:
        return jsonify({'error': 'No Code Provided', 'details':'', 'stack':''}), 400

    try:
        # decode from b64 to actual code
        decoded_code = base64.b64decode(b64_code).decode('utf-8')

        # capture print statements
        stdout_capture = io.StringIO()
        sys.stdout = stdout_capture

        # Execute the py code in global context to mitigate bs
        exec_globals = {}
        exec(decoded_code, exec_globals)

        # Get the value of 'result' if present.
        # Ignoring this, better to capture print statements as capturing return statements is spotty
        result = exec_globals.get('result', None)

        # set stdout back to orignial
        sys.stdout = sys.__stdout__

        # get the prints that happened during exec
        print_output = stdout_capture.getvalue()
        print_output = print_output.split("\n") if print_output else None
        print_output = [item for item in print_output if item.strip()]  # Filter out empty lines

        # return the print output and result
        return jsonify({
            'logs': print_output if print_output else None,
            'result': result if result is not None else None
        })

    except Exception as e:
        # Reset stdout in case of an error
        sys.stdout = sys.__stdout__
        return jsonify({
            'error': 'Invalid Python code',
            'details': str(e),
            'stack': ''
        }), 400

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080)
