# Javascript, TypeScript, and Python Interpreter API

**Written by**: Noah Clark 

**Date Created**: 2024-03-15

**Last Updated**: 2025-01-23

**Language**: JavaScript, TypeScript, Python

**Target Platform**: Google Cloud Run

**Development Environment**: macOS Sequoia 15.2, MacBook M2 Pro 2023 14-inch

## Description

This repository contains a multi-language interpreter API that allows you to execute JavaScript, TypeScript, and Python code via HTTP requests. The API is built using Node.js for JavaScript/TypeScript and Flask for Python.

## Note to Viewer
Excuse the lack of comments and notes, I was rushing during the time of dev and took hand written notes.

## Features

- Execute JavaScript and TypeScript code with support for async functions.
- Execute Python code with output capturing.
- Base64 encoding for code submission.
- Authentication token validation for secure access.

## Getting Started

### Prerequisites

- Node.js (for JavaScript/TypeScript interpreter)
- Python 3.9 or higher (for Python interpreter)
- Docker (optional, for containerization)
- Google Cloud SDK (for deployment)

### Installation

1. Clone this repository:

2. Install dependencies for JavaScript/TypeScript:

   ```bash
   cd JSInterpreter
   npm install
   ```

3. Install dependencies for Python:

   ```bash
   cd PYInterpreter
   pip install -r requirements.txt
   ```

### Running Locally

#### JavaScript/TypeScript Interpreter

To run the JavaScript/TypeScript interpreter locally:

```bash
PORT=3001 node dist/index.js
```

#### Python Interpreter

To run the Python interpreter locally:

```bash
python main.py
```

### Testing the API

#### JavaScript/TypeScript Interpreter

You can test the JavaScript/TypeScript interpreter using `curl`. Here are some example requests:

```bash
curl -X POST http://localhost:3001/jsinterpreter -H "Content-Type: application/json" -d '{"code": "CiAgY29uc3Qgc3VtID0gMSArIDI7CiAgc3VtOwogIA=="}'
```

#### Python Interpreter

You can test the Python interpreter using `curl` as well:

```bash
curl -X POST -H "Content-Type: application/json" -d '{"code": "result = 5 + 10", "auth": "123"}' http://127.0.0.1:8080/pyinterpreter
```

### Docker Support

You can build and run the interpreters using Docker.

#### JavaScript/TypeScript Interpreter

1. Build the Docker image:

   ```bash
   docker build -t jsinterpreter -f JSInterpreter/Dockerfile .
   ```

2. Run the Docker container:

   ```bash
   docker run -p 8080:8080 jsinterpreter
   ```

#### Python Interpreter

1. Build the Docker image:

   ```bash
   docker build -t pyinterpreter -f PYInterpreter/Dockerfile .
   ```

2. Run the Docker container:

   ```bash
   docker run -p 8080:8080 pyinterpreter
   ```

### Deployment to Google Cloud Run

To deploy the interpreters to Google Cloud Run, follow these steps:

1. Build and submit the Docker image:

   ```bash
   gcloud builds submit --tag gcr.io/{CONTAINER_NAME}/jsinterpreter
   gcloud builds submit --tag gcr.io/{CONTAINER_NAME}/pyinterpreter
   ```

2. Deploy to Cloud Run:

   ```bash
   gcloud run deploy jsinterpreter --image gcr.io/{CONTAINER_NAME}/jsinterpreter --platform managed
   gcloud run deploy pyinterpreter --image gcr.io/{CONTAINER_NAME}/pyinterpreter --platform managed
   ```

3. Get the URL of the deployed service:

   ```bash
   gcloud run services describe jsinterpreter --platform managed --format="get(status.url)"
   gcloud run services describe pyinterpreter --platform managed --format="get(status.url)"
   ```

### Notes

- Ensure to replace `{CONTAINER_NAME}` with your actual Google Cloud project name.
- The authentication token is required for accessing the interpreters. Modify the `getDayAuthToken` function to implement your authentication logic.
