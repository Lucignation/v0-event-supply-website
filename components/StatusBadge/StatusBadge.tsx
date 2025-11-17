export const StatusBadge = ({ status, statusLabel } : { status: string; statusLabel: string }) => {
    // Define color schemes for different statuses
    const statusStyles = {
      success: 'bg-green-100 text-green-800 border-green-300',
      error: 'bg-red-100 text-red-800 border-red-300',
      warning: 'bg-yellow-100 text-yellow-800 border-yellow-300',
      info: 'bg-blue-100 text-blue-800 border-blue-300',
      pending: 'bg-yellow-100 text-yellow-800 border-yellow-300',
      active: 'bg-purple-100 text-purple-800 border-purple-300',
      confirmed: 'bg-green-100 text-green-800 border-green-300',
      completed: 'bg-green-100 text-green-800 border-green-300',
    };
  
    // Get the appropriate style or default to gray
    const badgeStyle = statusStyles[status as keyof typeof statusStyles] || statusStyles.pending;
  
    return (
      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${badgeStyle}`}>
        {statusLabel}
      </span>
    );
  };