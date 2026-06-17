import ConsultasFiltradas from './ConsultasFiltradas';

const MeyerLab = () => {
  return (
    <ConsultasFiltradas
      companyKey="MeyerLab"
      pageTitle="Consultas Meyer Lab"
      subtitle="Visualiza solo los agendamientos de Meyer Lab y sus variantes"
      filterRegex={/Meyer\s*Lab|MeyerLab|Meyer/i}
    />
  );
};

export default MeyerLab;
