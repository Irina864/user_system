import './globals.css';

export const metadata = {
  title: 'User system',
};

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
