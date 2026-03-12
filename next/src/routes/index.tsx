import { createFileRoute } from '@tanstack/react-router';

import { loginLoader } from '@/utils/loginLoader';

export const Route = createFileRoute('/')({
  beforeLoad: () => loginLoader(),
});
