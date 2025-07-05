# Defines the SQLAlchemy ORM models (the database table schemas).
from sqlalchemy import Column, Integer, String, JSON
from database import Base

class Layout(Base):
    """
    SQLAlchemy model for the 'layouts' table.
    """
    __tablename__ = "layouts"

    # Define table columns
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    
    # The 'content' column will store the report's structure as a JSON object.
    content = Column(JSON)