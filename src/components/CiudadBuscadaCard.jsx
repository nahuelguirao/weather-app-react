import React from 'react'

export const CiudadBuscadaCard = ({ infoBuscada, error }) => {
    //Estructura de la card con los datos de la ciudad buscada
    return (
        <>
            {/*Si hay información */}
            {infoBuscada && (
                <div className='card fadeIn' key={infoBuscada.sys.id}>
                    <div className="infoPrincipal">
                        <h2 id='tituloCard'>{infoBuscada.name}</h2>
                        <p id='temperatura'>{infoBuscada.main.temp}°C</p>
                    </div>
                    <div className='situacionActual'>
                        <img src={`https://openweathermap.org/img/w/${infoBuscada.weather[0].icon}.png`} alt='Weather icon' />
                        <p className='parrafoSecundario'>{infoBuscada.weather[0].description}</p>
                    </div>
                    <div className='dataExtra'>
                        <p className="parrafoTerciario">Mínima {infoBuscada.main.temp_min}°C</p>
                        <p className="parrafoTerciario">Máxima {infoBuscada.main.temp_max}°C</p>
                        <p className='parrafoTerciario'>Humedad {infoBuscada.main.humidity}%</p>
                    </div>
                </div>)}
            {/*Si hay un Error*/}
            {error && (
                <div className='containerError fadeIn'>
                    <img src='iconoError.png' alt="Icono error" className='imgError' />
                    <p className='parrafoError'>Algo salió mal! Intenta nuevamente.</p>
                </div>)}
        </>
    )
}
