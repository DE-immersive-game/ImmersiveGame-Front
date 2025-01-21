import './globals.css';
import { WebSocketProvider } from './context/WebSocketContext';

export const metadata = {
  title: 'My App',
  description: 'Description of my app',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <WebSocketProvider>
          {children}
        </WebSocketProvider>
      </body>
    </html>
  );
}
