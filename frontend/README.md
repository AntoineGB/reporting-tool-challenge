# **Dynamic Reporting Tool**

This is a full-stack web application that serves as a proof-of-concept for a no-code reporting tool. It allows users to dynamically create, save, and manage multi-element report layouts. Users can define layouts by adding custom text, images, tables, and graphs, and then visualize them with sample data.  
This project was built to fulfill the requirements of a 4-hour take-home technical exercise.

## **Features**

* **Dynamic Layout Builder:** Add, edit, and remove elements (Text, Image, Chart, Table) in a vertical, list-style report builder.  
* **Database Persistence:** All created layouts are saved to a database via a robust backend API.  
* **Full CRUD Functionality:** Create, retrieve, update, and delete any report layout through the UI.  
* **State Management:** Utilizes Zustand for clean, centralized frontend state management.  
* **Random Population:** Instantly populate a report with a random assortment of elements to quickly visualize a layout.  
* **Containerized Backend:** The FastAPI backend is fully containerized with Docker for easy and consistent setup.  
* **Simplified Tooling:** Includes a Makefile for one-command management of the backend service.  
* **Error Handling:** A top-level React Error Boundary prevents the entire app from crashing due to rendering errors in any single component.

## **Tech Stack**

* **Frontend:** React (with Vite), Zustand, Tailwind CSS, Recharts, Lucide React  
* **Backend:** Python, FastAPI, SQLAlchemy  
* **Database:** SQLite  
* **Containerization:** Docker  
* **Tooling:** make

## **How to Run Locally**

### **Prerequisites**

* [Docker](https://www.docker.com/get-started)  
* [Node.js](https://nodejs.org/en/) (v18 or later)  
* make (pre-installed on macOS/Linux; available on Windows via WSL or Chocolatey)

### **1\. Clone the Repository**

Clone this repository to your local machine:  
git clone \<your-repo-url\>  
cd \<repository-folder\>

### **2\. Run the Backend (Docker)**

The backend runs inside a Docker container.  
\# Navigate to the backend directory  
cd backend

\# Build the Docker image  
make build

\# Run the container in detached mode  
make run

The API will now be running and accessible at http://localhost:8000.

### **3\. Run the Frontend (React)**

The frontend runs with a standard Node.js development server.  
\# Navigate to the frontend directory (from the root)  
cd frontend

\# Install dependencies  
npm install

\# Start the development server  
npm run dev

The React application will now be running. Open http://localhost:5173 (or the port indicated in your terminal) in your browser.

## **Submission Questions**

#### **1\. Briefly describe your process for completing the project from start to finish. Include details on assumptions made and key decisions taken / tradeoffs made for each step (if relevant).**

My process was structured in three phases, prioritizing a solid foundation and iterative feature implementation.

* **Phase 1: Strategy & Backend Foundation (Hour 1\)**  
  * **Key Decision:** The most critical decision was to simplify the "no-code report builder." A true drag-and-drop interface is a significant undertaking. I made the assumption that demonstrating the core logic (defining, saving, and rendering a layout of mixed elements) was the priority.  
  * **Tradeoff:** I chose a **vertical, list-based builder** over a freeform canvas. This sacrifices layout flexibility but makes the project achievable within 4 hours.  
  * **Implementation:** I built the entire backend first, using FastAPI for its speed and SQLAlchemy with SQLite for its zero-configuration setup. I defined the data model to store the entire layout content as a single JSON field, which simplifies the backend logic significantly. I used Docker and a Makefile from the start to ensure a reproducible environment.  
* **Phase 2: Frontend Core & State Management (Hours 2-3)**  
  * **Key Decision:** I chose Zustand for state management. For an application with interconnected state (a list of reports, an active report, save status), passing props down multiple levels ("prop drilling") becomes messy. Zustand provides a simple, centralized store that decouples the components.  
  * **Implementation:** I built the main two-column UI, then implemented the logic to fetch and display the list of reports. I then focused on the ReportBuilder component, creating individual components for each element type (Text, Image, etc.) and the logic to add/remove them from the active report's state in the Zustand store.  
* **Phase 3: Feature Completion & Polish (Hour 4\)**  
  * **Key Decision:** I implemented a manual "Save" button. While an auto-save feature is slicker, it introduces complexity (debouncing, handling race conditions) that can be risky under a tight deadline. A manual save is explicit and robust.  
  * **Implementation:** I connected the frontend save/delete actions to the backend API. I then added the "Randomly Populate" feature as a quick way to demonstrate the dynamic rendering. Finally, I added an Error Boundary as a sign of robust application design and wrote this documentation.

#### **2\. Are you happy with your solution? Why or why not?**

Meeeeeh, I tried to make a complex frontend, but it bit me back.

* **What I'm happy with:** It successfully meets all the core requirements of the prompt in a robust, end-to-end fashion. The architecture is clean and scalable: the frontend is decoupled from the backend, and the state management is centralized. The code is organized, and the use of Docker and a Makefile makes it professional and easy to run.  
* **What could be better:** The ImageElement is flickering (lack of time), The UI for editing elements is very basic. For example, the table element's headers are not editable through the UI. The user experience could be enhanced with loading skeletons, notifications, and more detailed error handling.

#### **3\. What would you do differently if you got to do this over again?**

With more time, I would make:

1. **Enhance Element Editing:** I would build modals or inline forms to edit the properties of each element (e.g., a UI for adding/removing table columns, a color picker for charts).  
2. **Implement Drag-and-Drop:** I would integrate a library like react-beautiful-dnd or Dnd-kit to allow users to reorder the elements in the report, getting closer to a true "no-code" feel.  
3. **Refine the UX:** I would add loading skeletons for a smoother initial load, user-friendly toast notifications for save/delete actions (instead of alert()), and more specific error messages.  
4. **Add User Authentication:** To make this a true multi-user application, I would add a user login system and ensure that users can only see and edit their own reports.

#### **4\. Did you get stuck anywhere? How’d you get unstuck?**

Yes, I briefly got stuck on a subtle bug involving state management. When I initially implemented an auto-save feature, updates from the server were causing the component to re-render, which in turn was re-triggering the auto-save, creating an infinite loop.

* **How I got unstuck:** I first tried to fix the loop by refining the dependencies in my useEffect hook. When that proved too complex, I recognized that the feature itself was the source of the complexity. I made a strategic decision to pivot: I removed the auto-save feature and reverted to a simpler, more robust manual "Save" button. This was a classic "less is more" engineering decision, prioritizing a working, stable application over a potentially buggy, "nicer" feature within the given time constraint.