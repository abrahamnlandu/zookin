// app/layout.tsx
import '@/app/globals.css';

export const metadata = {
  title: 'Church App',
  description: 'La plateforme numérique complète pour connecter et gérer votre communauté paroissiale',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}