import ConsultasFiltradas from './ConsultasFiltradas';

const DiazGill = () => {
  return (
    <ConsultasFiltradas
      companyKey="DiazGill"
      pageTitle="Consultas Diaz Gill"
      subtitle="Visualiza solo los agendamientos de Diaz Gill y sus variantes"
      filterRegex={/Diaz\s*Gill|DiazGill|DG|DiasGill/i}
    />
  );
};

export default DiazGill;
