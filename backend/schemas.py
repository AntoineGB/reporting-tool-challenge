# Defines the Pydantic models for data validation and serialization.

from pydantic import BaseModel
from typing import List, Any, Optional

# Base schema with common attributes
class LayoutBase(BaseModel):
    name: str
    content: List[Any] = []

# Schema used when creating a new layout
class LayoutCreate(LayoutBase):
    pass

# Schema used when updating a layout
class LayoutUpdate(BaseModel):
    name: Optional[str] = None
    content: Optional[List[Any]] = None

# Schema used when reading/returning a layout from the API
class Layout(LayoutBase):
    id: int

    class Config:
        # Allows Pydantic to work with ORM models
        orm_mode = True