import { useApp } from '../context/AppContext';

const Toast = () => {
  const { toasts, dismissToast } = useApp();

  if (!toasts.length) return null;

  const getColors = (type) => {
    switch (type) {
      case 'success':
        return 'bg-green-600/95 border-green-400';
      case 'error':
        return 'bg-red-600/95 border-red-400';
      case 'info':
      default:
        return 'bg-gray-800/95 border-gray-600';
    }
  };

  const getIcon = (type) => {
    switch (type) {
      case 'success':
        return '✓';
      case 'error':
        return '✕';
      case 'info':
      default:
        return 'ℹ';
    }
  };

  return (
    <div className="fixed top-20 right-4 z-[9999] flex flex-col gap-2 pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`pointer-events-auto flex items-center gap-3 px-5 py-3 rounded-lg border backdrop-blur-md text-white shadow-2xl min-w-[260px] max-w-md animate-slide-in ${getColors(
            toast.type
          )}`}
          role="alert"
        >
          <span className="text-lg font-bold">{getIcon(toast.type)}</span>
          <p className="flex-1 text-sm font-medium">{toast.message}</p>
          <button
            onClick={() => dismissToast(toast.id)}
            className="text-white/70 hover:text-white text-lg leading-none"
            aria-label="Close notification"
          >
            ×
          </button>
        </div>
      ))}
    </div>
  );
};

export default Toast;
