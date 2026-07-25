from pathlib import Path
import shutil
import zipfile

from fastapi import APIRouter, File, HTTPException, UploadFile

from app.services.project_analyzer_service import (
    ProjectAnalyzerService,
)
from app.schemas.project_analyzer import (
    ProjectAnalysisResponse,
)

router = APIRouter()

UPLOAD_DIR = Path("uploads")
EXTRACT_DIR = Path("extracted_projects")

UPLOAD_DIR.mkdir(exist_ok=True)
EXTRACT_DIR.mkdir(exist_ok=True)

project_service = ProjectAnalyzerService()


@router.post(
    "/analyze",
    response_model=ProjectAnalysisResponse,
)
def analyze_project(
    file: UploadFile = File(...),
):

    if not file.filename.endswith(".zip"):

        raise HTTPException(
            status_code=400,
            detail="Only ZIP files are supported.",
        )

    zip_path = UPLOAD_DIR / file.filename

    with open(zip_path, "wb") as buffer:

        shutil.copyfileobj(file.file, buffer)

    extract_path = EXTRACT_DIR / zip_path.stem

    if extract_path.exists():
        shutil.rmtree(extract_path)

    with zipfile.ZipFile(zip_path, "r") as zip_ref:
        zip_ref.extractall(extract_path)

    return project_service.analyze_project(
        str(extract_path)
    )