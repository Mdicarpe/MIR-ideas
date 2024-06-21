import React, { useState, useEffect } from 'react';

const EnhancedInteractiveCOPDScale = () => {
  const [exacerbations, setExacerbations] = useState(0);
  const [mMRC, setMMRC] = useState(0);
  const [CAT, setCAT] = useState(0);
  const [group, setGroup] = useState('');
  const [showGlossary, setShowGlossary] = useState(false);

  useEffect(() => {
    updateGroup();
  }, [exacerbations, mMRC, CAT]);

  const updateGroup = () => {
    const highRisk = exacerbations >= 2 || (exacerbations === 1 && exacerbations.toString().includes('hosp'));
    const highSymptoms = mMRC >= 2 || CAT >= 10;

    if (!highRisk && !highSymptoms) setGroup('A');
    else if (!highRisk && highSymptoms) setGroup('B');
    else if (highRisk && !highSymptoms) setGroup('C');
    else setGroup('D');
  };

  const getTreatmentRecommendation = () => {
    switch (group) {
      case 'A':
        return "Broncodilatador de acción corta (SABA o SAMA) a demanda.";
      case 'B':
        return "Broncodilatador de acción prolongada (LABA o LAMA). Considerar combinar LABA + LAMA si los síntomas persisten.";
      case 'C':
        return "LAMA como primera opción. Considerar LABA + LAMA o LABA + ICS si las exacerbaciones persisten.";
      case 'D':
        return "LABA + LAMA como primera opción. Considerar añadir ICS si las exacerbaciones persisten. En casos severos, considerar añadir roflumilast o azitromicina.";
      default:
        return "Consulte con un médico para recomendaciones de tratamiento.";
    }
  };

  const medicationGlossary = [
    { term: 'LABA', definition: 'Long-Acting Beta Agonists (Agonistas beta de acción prolongada)', examples: 'Ejemplos: formoterol, salmeterol, indacaterol' },
    { term: 'LAMA', definition: 'Long-Acting Muscarinic Antagonists (Antagonistas muscarínicos de acción prolongada)', examples: 'Ejemplos: tiotropio, aclidinio, glicopirronio' },
    { term: 'SABA', definition: 'Short-Acting Beta Agonists (Agonistas beta de acción corta)', examples: 'Ejemplos: salbutamol, terbutalina' },
    { term: 'SAMA', definition: 'Short-Acting Muscarinic Antagonists (Antagonistas muscarínicos de acción corta)', examples: 'Ejemplos: ipratropio' },
    { term: 'ICS', definition: 'Inhaled Corticosteroids (Corticosteroides inhalados)', examples: 'Ejemplos: fluticasona, budesonida' }
  ];

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Escala de Gravedad EPOC Interactiva</h2>
      <div className="flex flex-wrap">
        <div className="w-full md:w-1/2 p-2">
          <label className="block mb-4">
            Exacerbaciones por año:
            <select 
              value={exacerbations} 
              onChange={(e) => setExacerbations(e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="0">0-1 sin hospitalización</option>
              <option value="1">1 con hospitalización</option>
              <option value="2">≥ 2 o ≥ 1 con hospitalización</option>
            </select>
          </label>
          <label className="block mb-4">
            mMRC (Disnea):
            <input
              type="range"
              min="0"
              max="4"
              value={mMRC}
              onChange={(e) => setMMRC(parseInt(e.target.value))}
              className="w-full"
            />
            <span>Valor: {mMRC}</span>
          </label>
          <label className="block mb-4">
            CAT (Impacto):
            <input
              type="range"
              min="0"
              max="40"
              value={CAT}
              onChange={(e) => setCAT(parseInt(e.target.value))}
              className="w-full"
            />
            <span>Valor: {CAT}</span>
          </label>
        </div>
        <div className="w-full md:w-1/2 p-2">
          <div className="mb-4">
            <h3 className="text-xl font-semibold">Grupo EPOC: {group}</h3>
            <p>Riesgo: {exacerbations >= 2 || (exacerbations === 1 && exacerbations.toString().includes('hosp')) ? 'Alto' : 'Bajo'}</p>
            <p>Síntomas: {mMRC >= 2 || CAT >= 10 ? 'Más sintomático' : 'Menos sintomático'}</p>
          </div>
          <div className="mb-4">
            <h3 className="text-lg font-semibold">Recomendación de tratamiento:</h3>
            <p>{getTreatmentRecommendation()}</p>
          </div>
        </div>
      </div>
      <div className="mt-4">
        <button 
          onClick={() => setShowGlossary(!showGlossary)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          {showGlossary ? 'Ocultar Glosario' : 'Mostrar Glosario de Medicamentos'}
        </button>
        {showGlossary && (
          <div className="mt-4 p-3 bg-gray-100 rounded">
            <h3 className="text-lg font-semibold mb-2">Glosario de Medicamentos</h3>
            {medicationGlossary.map((item, index) => (
              <div key={index} className="mb-2">
                <p><strong>{item.term}:</strong> {item.definition}</p>
                <p className="text-sm text-gray-600">{item.examples}</p>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="mt-4 p-3 bg-blue-100 rounded">
        <h3 className="font-semibold">Explicación:</h3>
        <p>
          La clasificación GOLD de la EPOC se basa en tres factores principales:
        </p>
        <ul className="list-disc list-inside">
          <li>Exacerbaciones: Frecuencia y gravedad de las crisis</li>
          <li>mMRC: Escala de disnea (0-4)</li>
          <li>CAT: Impacto en la calidad de vida (0-40)</li>
        </ul>
        <p>
          Esta clasificación ayuda a determinar el tratamiento más adecuado. En el examen MIR, es crucial entender cómo estos factores influyen en la elección del tratamiento y conocer los diferentes tipos de medicamentos utilizados en la EPOC.
        </p>
      </div>
    </div>
  );
};

export default EnhancedInteractiveCOPDScale;
