import { useMutation, useQueryClient } from '@tanstack/react-query';
import { logout } from '@/api/auth.api';
import { Button } from '@/components/ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from '@/components/ui/navigation-menu';

export default function HomePage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: ['me'] });
      navigate('/login');
    },
  });

  return (
    <main className="flex flex-col items-center justify-center w-full p-4">
      <NavigationMenu className="flex justify-center max-w-full w-full mb-8 p-10">
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuLink asChild className="text-2xl">
              <Button size="lg" className="mx-8">
                <Link to="/profile">Profile</Link>
              </Button>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink asChild className="text-2xl">
              <Button onClick={() => mutate()} disabled={isPending} variant="destructive" size="lg" className="mx-8">
                Logout
              </Button>
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <h1 className="text-3xl font-bold">Welcome to the AuthBridge application</h1>
    </main>
  );
}
