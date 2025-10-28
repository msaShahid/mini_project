import { Link, isRouteErrorResponse, useRouteError } from 'react-router-dom';

export const NotFound:  React.FC = () => {
  const error = useRouteError();

  const is404 = isRouteErrorResponse(error) && error.status === 404;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 text-center">
      <div className="max-w-md">
        <div className="text-7xl mb-4">🚫</div>

        <h1 className="text-4xl font-extrabold text-gray-900 mb-2">
          {is404 ? '404 - Page Not Found' : 'Something went wrong'}
        </h1>

        <p className="text-gray-600 mb-6">
          {is404
            ? (error as any)?.statusText ||
            'The page you’re looking for doesn’t exist or has been moved.'
            : (error as any)?.statusText ||
            (error as Error)?.message ||
            'An unexpected error occurred.'}
        </p>

        <Link
          to="/"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200"
        >
          Go Back Home
        </Link>

        {!is404 && (
          <pre className="bg-red-100 text-red-800 p-3 mt-6 rounded text-sm text-left whitespace-pre-wrap overflow-auto">
            {(error as Error)?.message || JSON.stringify(error, null, 2)}
          </pre>
        )}
      </div>
    </div>
  );
};

