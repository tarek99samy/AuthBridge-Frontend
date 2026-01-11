import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getMe } from '@/api/auth.api';
import { updateName } from '@/api/user.api';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Link } from 'react-router-dom';

export default function ProfilePage() {
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: ['me'],
    queryFn: getMe,
  });
  const user = data?.data;
  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState(user?.name || '');

  const mutation = useMutation({
    mutationFn: (newName: string) => updateName(user?.email, { name: newName }),
    onSuccess: () => {
      toast.success('Name updated successfully');
      setEditMode(false);
      setName(name.trim());
      queryClient.invalidateQueries({ queryKey: ['me'] });
    },
    onError: (error: unknown) => {
      let errorMessage = 'Could not update name';
      if (typeof error === 'object' && error !== null && 'response' in error) {
        errorMessage = error.response?.data?.error?.message || errorMessage;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }
      toast.error(errorMessage);
    },
  });

  const cancelEdit = () => {
    setEditMode(false);
    setName(user?.name);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error('Name cannot be empty');
      return;
    }
    mutation.mutate(name.trim());
  };

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background gap-15">
      <Button size="lg" className="text-xl">
        <Link to="/">Back to home</Link>
      </Button>
      <div className="w-full max-w-lg space-y-6 rounded-xl border p-6 shadow-sm">
        <h1 className="text-3xl font-semibold text-center mb-4">Profile</h1>
        <div className="space-y-3">
          <div>
            <span className="font-medium text-xl">Email: {user?.email}</span>
          </div>
          <div>
            <span className="font-medium text-xl">
              Name:{' '}
              {editMode ? (
                <form className="inline-flex gap-2" onSubmit={handleSubmit}>
                  <Input value={name} onChange={(e) => setName(e.target.value)} className="w-1/2" minLength={3} required />
                  <Button type="submit" size="sm" disabled={mutation.isPending}>
                    {mutation.isPending ? 'Saving...' : 'Save'}
                  </Button>
                  <Button type="button" size="sm" variant="ghost" onClick={cancelEdit}>
                    Cancel
                  </Button>
                </form>
              ) : (
                <>
                  {user?.name}{' '}
                  <Button size="sm" variant="default" onClick={() => setEditMode(true)}>
                    Edit
                  </Button>
                </>
              )}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
