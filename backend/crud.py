# Contains the functions that interact with the database.

from sqlalchemy.orm import Session
import models
import schemas

def get_layout(db: Session, layout_id: int):
    """Fetch a single layout by its ID."""
    return db.query(models.Layout).filter(models.Layout.id == layout_id).first()

def get_layouts(db: Session, skip: int = 0, limit: int = 100):
    """Fetch all layouts with pagination."""
    return db.query(models.Layout).offset(skip).limit(limit).all()

def create_layout(db: Session, layout: schemas.LayoutCreate):
    """Create a new layout record in the database."""
    db_layout = models.Layout(name=layout.name, content=layout.content)
    db.add(db_layout)
    db.commit()
    db.refresh(db_layout)
    return db_layout

def update_layout(db: Session, layout_id: int, layout_update: schemas.LayoutUpdate):
    """Update an existing layout record."""
    db_layout = get_layout(db, layout_id)
    if not db_layout:
        return None
    
    update_data = layout_update.dict(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_layout, key, value)
        
    db.add(db_layout)
    db.commit()
    db.refresh(db_layout)
    return db_layout

def delete_layout(db: Session, layout_id: int):
    """Delete a layout record from the database."""
    db_layout = get_layout(db, layout_id)
    if not db_layout:
        return None
    db.delete(db_layout)
    db.commit()
    return db_layout