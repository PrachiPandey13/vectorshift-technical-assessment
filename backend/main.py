from collections import defaultdict, deque

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, ConfigDict

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class NodeModel(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str


class EdgeModel(BaseModel):
    model_config = ConfigDict(extra="ignore")
    source: str
    target: str


class PipelineParseRequest(BaseModel):
    nodes: list[NodeModel]
    edges: list[EdgeModel]


class PipelineParseResponse(BaseModel):
    num_nodes: int
    num_edges: int
    is_dag: bool


@app.get("/")
def read_root():
    return {"Ping": "Pong"}


def _directed_edges_form_dag(edges: list[EdgeModel]) -> bool:
    if not edges:
        return True

    graph: defaultdict[str, list[str]] = defaultdict(list)
    indegree: defaultdict[str, int] = defaultdict(int)
    vertices: set[str] = set()

    for edge in edges:
        u, v = edge.source, edge.target
        vertices.add(u)
        vertices.add(v)
        graph[u].append(v)
        indegree[v] += 1

    queue = deque(node for node in vertices if indegree[node] == 0)
    processed = 0

    while queue:
        node = queue.popleft()
        processed += 1
        for neighbor in graph[node]:
            indegree[neighbor] -= 1
            if indegree[neighbor] == 0:
                queue.append(neighbor)

    return processed == len(vertices)


@app.post("/pipelines/parse", response_model=PipelineParseResponse)
def parse_pipeline(body: PipelineParseRequest) -> PipelineParseResponse:
    return PipelineParseResponse(
        num_nodes=len(body.nodes),
        num_edges=len(body.edges),
        is_dag=_directed_edges_form_dag(body.edges),
    )
