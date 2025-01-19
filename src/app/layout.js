import ProviderRedux from '@/store/provider';
import './globals.css';
import ModalProvider from '@/components/modals/ModalProvider';

export const metadata = {
  title: 'User system',
};

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <body>
        <ProviderRedux>
          {children}
          <ModalProvider />
        </ProviderRedux>
      </body>
    </html>
  );
}
