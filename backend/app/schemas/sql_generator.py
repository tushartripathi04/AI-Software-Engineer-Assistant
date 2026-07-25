from pydantic import BaseModel


class SQLGenerationRequest(BaseModel):
    database: str
    prompt: str


class SQLGenerationResponse(BaseModel):
    database: str
    sql_query: str
    explanation: str
    query_type: str
    optimization_tips: str