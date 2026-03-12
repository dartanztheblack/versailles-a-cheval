import { useState, useEffect } from "react";
import type { User } from "firebase/auth";
import { getCurrentUser, logoutUser } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User as UserIcon, LogOut } from "lucide-react";
import { AuthModal } from "./AuthModal";

interface UserMenuProps {
  onAuthSuccess?: () => void;
}

export function UserMenu({ onAuthSuccess }: UserMenuProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getCurrentUser().then((currentUser) => {
      setUser(currentUser);
      setIsLoading(false);
    });
  }, []);

  const handleLogout = async () => {
    await logoutUser();
    setUser(null);
  };

  const handleAuthSuccess = () => {
    getCurrentUser().then((currentUser) => {
      setUser(currentUser);
      setIsAuthModalOpen(false);
      onAuthSuccess?.();
    });
  };

  if (isLoading) {
    return null;
  }

  return (
    <>
      {user ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="text-[#1C1C1C] hover:text-[#8C7B6B]"
            >
              <UserIcon className="h-5 w-5 mr-2" />
              {user.email?.split("@")[0]}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Déconnexion
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Button
          variant="ghost"
          onClick={() => setIsAuthModalOpen(true)}
          className="text-[#1C1C1C] hover:text-[#8C7B6B]"
        >
          <UserIcon className="h-5 w-5 mr-2" />
          Mon compte
        </Button>
      )}

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onSuccess={handleAuthSuccess}
      />
    </>
  );
}
