import { useRouter } from 'next/router';
import type { ReactElement } from 'react';
import Layout from '../../components/layout';

export default function Name() {
  const router = useRouter();
  const { name } = router.query;

  return <p>Name: {name}</p>;
}

Name.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
