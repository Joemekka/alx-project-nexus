import { useRouter } from 'next/router';

export const routeToDest = (source: string) => {
  const router = useRouter();

  const gotoPage = () => {
    router.push(source);
  };
  return gotoPage;
};
