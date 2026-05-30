# Pipeline Builder

A visual workflow builder for composing node-based pipelines on a canvas. Users can drag nodes from a toolbar, connect them with edges, and submit the graph to a FastAPI backend for validation.

## Project Structure

```text
frontend_technical_assessment/
├── README.md
├── frontend/          # React application (React Flow canvas)
└── backend/           # FastAPI backend

```

All commands below assume your working directory is:

```text
frontend_technical_assessment/

```

---

## Setup

### Prerequisites

- Node.js 16+
- npm
- Python 3.9+

### Frontend

```bash
cd frontend
npm install

```

### Backend

```bash
cd backend
pip install fastapi uvicorn pydantic

```

---

## Running the Project

Start the backend first, then the frontend.

### Backend

```bash
cd backend
uvicorn main:app --reload

```

Backend URL:

```text
http://127.0.0.1:8000

```

### Frontend

```bash
cd frontend
npm start

```

Frontend URL:

```text
http://localhost:3000

```

---

## Implemented Features

### Visual Pipeline Editor

- React Flow based workflow canvas
- Drag-and-drop node creation
- Edge connections between nodes
- Pan, zoom, minimap, and grid snapping

### Node Types

Implemented the following node types:

- Input
- Output
- Text
- LLM
- API Request
- Filter
- Transform
- Database
- Notification

### Graph State Management

- Nodes and edges stored in Zustand
- React Flow integration for graph editing
- Dynamic edge creation through node handles

### Submit & Parse Flow

- Sends pipeline data to `POST /pipelines/parse`
- Displays:
  - Number of nodes
  - Number of edges
  - DAG validation result

### Empty Canvas State

- Displays a placeholder message when no nodes are present on the canvas

---

## BaseNode Abstraction

Custom nodes share a reusable `BaseNode` component located at:

```text
frontend/src/nodes/BaseNode.js

```

The abstraction provides:

- Consistent card layout
- Shared styling and spacing
- Configurable input handles
- Configurable output handles
- Category-based node headers
- Optional width and height configuration

Individual node implementations focus only on node-specific fields and behavior while reusing the common node shell.

---

## Dynamic Text Node Handles

The Text node supports variable placeholders using the format:

```text
{{ variableName }}

```

Features:

- Automatically detects variables inside the textarea
- Creates dynamic input handles on the left side
- Uses the variable name as the handle id
- Prevents duplicate handles for repeated variables
- Automatically resizes as content grows
- Preserves the existing output handle

Example:

```text
Hello {{name}}

Summarize {{document}}

Use {{name}} again

```

Generates input handles for:

```text
name
document

```

---

## Backend DAG Validation

### Endpoint

```http
POST /pipelines/parse

```

### Request

```json
{
  "nodes": [...],
  "edges": [...]
}

```

### Response

```json
{
  "num_nodes": 4,
  "num_edges": 2,
  "is_dag": true
}

```

### Validation Logic

The backend validates whether the submitted graph forms a Directed Acyclic Graph (DAG).

Cycle detection is implemented using Kahn's Topological Sort Algorithm.

CORS is enabled for local React development origins.

---

## Technologies Used


| Layer            | Technology         |
| ---------------- | ------------------ |
| Frontend         | React 18           |
| Flow Editor      | React Flow 11      |
| State Management | Zustand            |
| Backend          | FastAPI            |
| Validation       | Pydantic           |
| Server           | Uvicorn            |
| Styling          | Custom CSS         |
| Language         | JavaScript, Python |


---

