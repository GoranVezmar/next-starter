type CategoryPageProps = {
  params: Promise<{ categoryId: string }>;
};

const CategoryPage = async ({ params }: CategoryPageProps) => {
  const { categoryId } = await params;
  return <div>CategoryPage: {categoryId}</div>;
};

export default CategoryPage;
