import React from "react";
import { AlertTriangle } from "lucide-react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  // This lifecycle method is invoked after an error has been thrown by a descendant component.
  // It receives the error that was thrown as a parameter and should return a value to update state.
  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error: error };
  }

  // This lifecycle method is also called after an error has been thrown by a descendant component.
  // It is a good place for logging errors to an external service.
  componentDidCatch(error, errorInfo) {
    // For this exercise, we'll just log it to the console.
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div className="flex items-center justify-center h-screen bg-gray-900 text-white">
          <div className="text-center p-8 bg-gray-800 rounded-lg shadow-xl">
            <AlertTriangle className="mx-auto h-12 w-12 text-red-500" />
            <h1 className="mt-4 text-2xl font-bold text-red-400">
              Something went wrong.
            </h1>
            <p className="mt-2 text-gray-400">
              An unexpected error occurred. Please try refreshing the page.
            </p>
            <pre className="mt-4 p-2 bg-gray-900 text-left text-xs text-red-300 rounded-md overflow-auto max-h-40">
              {this.state.error && this.state.error.toString()}
            </pre>
          </div>
        </div>
      );
    }

    // If there's no error, render the children as normal.
    return this.props.children;
  }
}

export default ErrorBoundary;
