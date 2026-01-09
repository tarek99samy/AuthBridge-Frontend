import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export default function NotfoundPage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-background gap-6">
      <img src="/404.svg" alt="Page Not Found" className="w-xl" />
      <h1 className="text-3xl font-bold">Page Not Found</h1>
      <p className="generic-page-description">Sorry, the page you are looking for does not exist.</p>
      <Link to="/">
        <Button variant="default" className="generic-page-button" size="lg">
          Go back to Home
        </Button>
      </Link>
    </main>
  );
}
