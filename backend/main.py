# This file serves as the main entry point for the FastAPI application.
# For now, it contains a simple root endpoint to confirm the server is running.

from typing import List
from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

import crud
import models
import schemas
from database import SessionLocal, engine

# Create all database tables on application startup.
models.Base.metadata.create_all(bind=engine)

# Initialize the FastAPI application
app = FastAPI(
    title="Reporting Tool API",
    description="API for creating, managing, and retrieving report layouts.",
    version="1.0.0"
)

# Configure CORS (Cross-Origin Resource Sharing)
# This allows the React frontend to communicate with this backend.
# It's configured to allow all origins, methods, and headers for development ease.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, this should be restricted to the frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Dependency to get a DB session for each request
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# --- API Endpoints ---

@app.get("/", tags=["Root"])
async def read_root():
    """
    A simple root endpoint that returns a welcome message.
    Useful for health checks and verifying the server is up.
    """
    return {"message": "Welcome to the Reporting Tool API!"}

@app.post("/api/layouts/", response_model=schemas.Layout, tags=["Layouts"])
def create_layout(layout: schemas.LayoutCreate, db: Session = Depends(get_db)):
    """Create a new report layout."""
    return crud.create_layout(db=db, layout=layout)

@app.get("/api/layouts/", response_model=List[schemas.Layout], tags=["Layouts"])
def read_layouts(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    """Retrieve all report layouts."""
    layouts = crud.get_layouts(db, skip=skip, limit=limit)
    return layouts

@app.get("/api/layouts/{layout_id}", response_model=schemas.Layout, tags=["Layouts"])
def read_layout(layout_id: int, db: Session = Depends(get_db)):
    """Retrieve a single report layout by its ID."""
    db_layout = crud.get_layout(db, layout_id=layout_id)
    if db_layout is None:
        raise HTTPException(status_code=404, detail="Layout not found")
    return db_layout

@app.put("/api/layouts/{layout_id}", response_model=schemas.Layout, tags=["Layouts"])
def update_layout(layout_id: int, layout: schemas.LayoutUpdate, db: Session = Depends(get_db)):
    """Update an existing report layout."""
    db_layout = crud.update_layout(db=db, layout_id=layout_id, layout_update=layout)
    if db_layout is None:
        raise HTTPException(status_code=404, detail="Layout not found")
    return db_layout

@app.delete("/api/layouts/{layout_id}", response_model=schemas.Layout, tags=["Layouts"])
def delete_layout(layout_id: int, db: Session = Depends(get_db)):
    """Delete a report layout."""
    db_layout = crud.delete_layout(db=db, layout_id=layout_id)
    if db_layout is None:
        raise HTTPException(status_code=404, detail="Layout not found")
    return db_layout