type UsersPageProps = {
  params: Promise<{ userId: string }>;
};

const UsersPage = async ({ params }: UsersPageProps) => {
  const { userId } = await params;
  return <div>UsersPage - {userId}</div>;
};

export default UsersPage;
