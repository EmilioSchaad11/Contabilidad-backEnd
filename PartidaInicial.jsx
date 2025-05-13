// frontend/PartidaInicial.jsx

import { useState, useEffect } from "react";
import axios from "axios";

export default function PartidaInicial() {
  const [partidais, setpartidas] = useState([]);
  const [descripcion, setDescripcion] = useState("ingrese texto");
  const [tipoCuenta, setTipoCuenta] = useState("Capital");
  const [monto, setMonto] = useState("");
  const [FechaI, setFechaI] = useState("");

  useEffect(() => {
    axios.get("http://localhost:5000/partidais")
      .then((res) => setpartidas(res.data.partidas))
      .catch((err) => console.error("Error al obtener partidas iniciales:", err));
  }, []);

  const agregarpartidaI = async () => {
    if (monto.trim() === "") {
      alert("Ingrese un monto válido.");
      return;
    }

    if (FechaI.trim() === "") {
      alert("Ingrese fecha para partida inicial");
      return;
    }

    const nuevapartidai = { FechaI, descripcion, tipoCuenta, monto };

    try {
      const response = await axios.post("http://localhost:5000/partidais", nuevapartidai);
      
      setpartidas([...partidais, response.data]);
      
      setMonto("");
      setFechaI("");
    } catch (error) {
      console.error("Error al guardar la partida inicial:", error);
      alert("Error al guardar la partida inicial en el servidor");
    }
  };

  const eliminarpartidaI = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/partidais/${id}`);
      setpartidas(partidais.filter(partida => partida._id !== id));
    } catch (error) {
      console.error('Error al eliminar partida inicial:', error);
      alert('Error al eliminar la partida inicial');
    }
  };
  

  return (
    <div className="PartidaInicial">
      <h1>PARTIDA INICIAL</h1>

      <div className="caja">

        <div className="grupo">
          <label>FECHA:</label>
          <input
            type="date"
            value={FechaI}
            onChange={(e) => setFechaI(e.target.value)}
            placeholder="Fecha"
          />
        </div>
        
        <div className="grupo">
          <label>Descripcion:</label>
          <textarea 
            className="desc"
            type="string"
            onChange={(e) => setDescripcion(e.target.value)}
          />
        </div>
    
        <div className="grupo">
          <label>Tipo de cuenta:</label>
          <select value={tipoCuenta} onChange={(e) => setTipoCuenta(e.target.value)}>
            <option value="Capital">Capital</option>
          </select>
        </div>

        <div className="grupo">
          <label>MONTO:</label>
          <input
            type="number"
            value={monto}
            onChange={(e) => setMonto(e.target.value)}
            placeholder="Ingrese monto"
          />
        </div>

        <div className="grupo">
          <button onClick={agregarpartidaI}>AGREGAR</button>
        </div>
      </div>

      <div className="cajaT">
        <table>
          <thead>
            <tr>
              <th className="encabezado">FECHA</th>
              <th className="encabezado">Descripcion</th>
              <th className="encabezado">TIPO DE CUENTA</th>
              <th className="encabezado">MONTO</th>
              <th className="encabezado">ACCIÓN</th>
            </tr>
          </thead>
          <tbody>
            {partidais.map((partida, index) => (
              <tr key={index}>
                <td className="fila">{partida.FechaI}</td>
                <td className="fila">{partida.descripcion}</td>
                <td className="fila">{partida.tipoCuenta}</td>
                <td className="fila">{partida.monto}</td>
                <td>
                  <button onClick={() => eliminarpartidaI(partida._id)}>
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
