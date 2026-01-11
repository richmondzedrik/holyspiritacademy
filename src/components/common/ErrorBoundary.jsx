import React from 'react';
import { AlertCircle, RefreshCw, Home } from 'lucide-react';
import { Link } from 'react-router-dom';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
    this.setState({
      error,
      errorInfo
    });
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 px-4">
          <div className="max-w-2xl w-full bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-gray-200 dark:border-slate-700 p-8 md:p-12 text-center">
            <div className="mb-6 flex justify-center">
              <div className="bg-red-100 dark:bg-red-900/30 p-4 rounded-full">
                <AlertCircle className="text-red-600 dark:text-red-400" size={48} />
              </div>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Oops! Something went wrong
            </h1>
            
            <p className="text-gray-600 dark:text-gray-300 mb-8 text-lg">
              We're sorry, but something unexpected happened. Please try refreshing the page or return to the homepage.
            </p>

            {process.env.NODE_ENV === 'development' && this.state.error && (
              <div className="mb-6 p-4 bg-gray-100 dark:bg-slate-700 rounded-lg text-left">
                <p className="text-sm font-mono text-red-600 dark:text-red-400 mb-2">
                  {this.state.error.toString()}
                </p>
                {this.state.errorInfo && (
                  <details className="text-xs text-gray-600 dark:text-gray-300">
                    <summary className="cursor-pointer font-semibold mb-2">
                      Stack Trace
                    </summary>
                    <pre className="overflow-auto max-h-40 text-xs">
                      {this.state.errorInfo.componentStack}
                    </pre>
                  </details>
                )}
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={this.handleReset}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg"
              >
                <RefreshCw size={20} />
                Refresh Page
              </button>
              
              <Link
                to="/"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gray-100 dark:bg-slate-700 text-gray-900 dark:text-white font-semibold rounded-xl hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors"
              >
                <Home size={20} />
                Go Home
              </Link>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
