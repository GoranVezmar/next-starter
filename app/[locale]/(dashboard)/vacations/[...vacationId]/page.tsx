type VacationPageProps = {
  params: Promise<{ vacationId: string }>;
};

const VacationPage = async ({ params }: VacationPageProps) => {
  const { vacationId } = await params;
  return <div>VacationPage - {vacationId}</div>;
};

export default VacationPage;
