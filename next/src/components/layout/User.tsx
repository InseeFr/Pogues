import Avatar from '@/components/ui/Avatar';
import { User as UserType } from '@/hooks/useAuth';

interface UserProps {
  user?: UserType;
}
export default function User({ user }: Readonly<UserProps>) {
  const initials = `${user?.givenName?.charAt(0).toUpperCase()}${user?.familyName?.charAt(0).toUpperCase()}`;
  return <Avatar initials={initials} />;
}
