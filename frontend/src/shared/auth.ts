import { Profile } from '@models';
import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/react'

export const adminOnlyPage: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  if (session.user.profile !== Profile.ADMINISTRATOR) {
    return {
      redirect: {
        destination: "/dashboard",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}
