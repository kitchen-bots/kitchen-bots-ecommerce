import { useState, useCallback, useEffect } from 'react';

export type CustomerRoute =
  | 'overview' | 'orders' | 'order-detail'
  | 'enquiries' | 'documents' | 'service'
  | 'equipment' | 'profile' | 'addresses';

export type AdminRoute =
  | 'overview'
  | 'users' | 'user-detail'
  | 'products' | 'product-add' | 'product-edit'
  | 'orders' | 'order-detail'
  | 'documents' | 'services' | 'settings';

export function useDashboardNav(base: 'dashboard' | 'admin') {
  const getInitialRoute = () => {
    const path = window.location.pathname;
    const segment = path.replace(`/${base}/`, '').replace(`/${base}`, '') || 'overview';
    return segment.split('/')[0];
  };

  const [route, setRoute] = useState(getInitialRoute);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const navigate = useCallback((newRoute: string, id?: string) => {
    setRoute(newRoute);
    if (id !== undefined) setSelectedId(id);
    const path = newRoute === 'overview' ? `/${base}` : `/${base}/${newRoute}${id ? `/${id}` : ''}`;
    window.history.pushState({}, '', path);
  }, [base]);

  useEffect(() => {
    const handlePop = () => {
      const path = window.location.pathname;
      const segment = path.replace(`/${base}/`, '').replace(`/${base}`, '') || 'overview';
      setRoute(segment.split('/')[0]);
    };
    window.addEventListener('popstate', handlePop);
    return () => window.removeEventListener('popstate', handlePop);
  }, [base]);

  return { route, selectedId, navigate };
}
