import React, { useEffect, useState } from 'react';
import '../styles/ciudadesComponent.css'
import '../styles/animacionCarga.css'
import { fetchClima } from '../helpers/fetchClima';
import { motion } from 'framer-motion'

export const CiudadesComponent = () => {
    const [datos, setDatos] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const ciudadesPrincipales = ['Londres', 'Nueva York', 'Sydney', 'Tokio']
            try {
                //Utilizo Promise.all para esperar que esten todos los fetch realizados
                const resultados = await Promise.all(
                    ciudadesPrincipales.map(async (ciudad) => {
                        return await fetchClima(ciudad)
                    }))
                //seteo la informacion en datos
                setDatos(resultados)
            } catch (error) {
                console.error(error)
            }
        }
        fetchData()
    }, [])

    //Pestaña de carga mientras realiza las consultas a la API
    if (datos.length === 0) return (
        <motion.div id="contenedor" animate={{ opacity: [0.5, 0] }} transition={{ delay: 2 }}>
            <div className="contenedor-loader">
                <div className="rueda"></div>
            </div>
            <div className="cargando">Cargando...</div>
        </motion.div>
    )

    return (
        <motion.div className='containerSecundario' animate={{ opacity: [0, 0.5, 1], x: [-500, -100, 0] }} >
            <div className='climaEnVivo'>
                <h2>Clima en vivo</h2>
                <img src='/iconoVivo.png'></img>
            </div>
            <div className='cardCiudadesContainer'>
                {datos.map((ciudad, index) => {
                    return (
                        <motion.div className='cardCiudades' id='cardEstirable' key={index} whileHover={{ scale: 1.05 }} whileInView={{ opacity: [0, 0.5, 1] }}>
                            <div className="infoPrincipal">
                                <h2 id='tituloCard'>{ciudad.datos.name}</h2>
                                <p id='temperatura'>{ciudad.datos.main.temp}°C</p>
                            </div>
                            <div className='situacionActual'>
                                <img src={`https://openweathermap.org/img/w/${ciudad.datos.weather[0].icon}.png`} alt='Weather icon' />
                                <p className='parrafoSecundario'>{ciudad.datos.weather[0].description}</p>
                            </div>
                            <div className='dataExtra'>
                                <p className='parrafoTerciario'>Humedad {ciudad.datos.main.humidity}%</p>
                                <p className="parrafoTerciario">Mínima {ciudad.datos.main.temp_min}°C</p>
                                <p className="parrafoTerciario">Máxima {ciudad.datos.main.temp_max}°C</p>
                            </div>
                        </motion.div>
                    )
                })}
            </div>
        </motion.div>
    )
}
