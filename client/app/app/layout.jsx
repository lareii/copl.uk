import AuthProvider from '@/components/app/Providers/Auth';
import LayoutContent from '@/app/app/layout-content';

export default function Layout({ children }) {
  return (
    <AuthProvider>
      <LayoutContent>{children}</LayoutContent>
    </AuthProvider>
  );
}
