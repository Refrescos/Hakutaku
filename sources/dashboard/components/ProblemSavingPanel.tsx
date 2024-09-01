import ProgressBar from './ProgressBar'; // Certifique-se de ajustar o caminho para o componente ProgressBar

const ProblemSolvingPanel = () => {
  return (
    <div className="w-1/2 p-4">
      <div className="bg-white rounded-lg p-4 shadow-md flex flex-col">
        <div className="flex flex-row justify-between border-b py-1">
          <div className="flex flex-col">
            <h2 className="font-semibold text-[#A0AEC0]">PROBLEM SOLVING</h2>
            <h2 className="font-semibold">Índice de resolução de problema por produto</h2>
          </div>
          <button className="bg-black p-2 text-white rounded-xl">Text</button>
        </div>

        {/* Tabela abaixo dos textos */}
        <table className="mt-4 w-full">
          <thead>
            <tr className="bg-white">
              <th className="p-2 text-left">PRODUTO</th>
              <th className="p-2 text-left">REQ. PARA RESOLUÇÃO</th>
              <th className="p-2 text-left">Progresso</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-2 border-b">Cartão</td>
              <td className="p-2 border-b">1</td>
              <td className="p-2 border-b"><ProgressBar value={70} /></td>
            </tr>
            <tr>
              <td className="p-2 border-b">API</td>
              <td className="p-2 border-b">Dados 5</td>
              <td className="p-2 border-b"><ProgressBar value={50} /></td>
            </tr>
            <tr>
              <td className="p-2 border-b">PIX</td>
              <td className="p-2 border-b">Dados 8</td>
              <td className="p-2 border-b"><ProgressBar value={30} /></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProblemSolvingPanel;
