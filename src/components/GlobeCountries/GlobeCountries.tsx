import ReactGlobe from 'react-globe.gl';
import React, { useLayoutEffect, useRef, useState } from "react";
import variables from '../../styles/_variables.scss';

interface IGlobeProps {
  listCodes: string[];
  listNames: string[];
  parentWidth: number;
}

export const GlobeCountries: React.FC<IGlobeProps> = ({parentWidth, listCodes, listNames}) => {
  const [polygons, setPolygons] = useState([]);
  const globeRef = useRef<any>(null);

  useLayoutEffect(() => {
    globeRef.current.controls().enableZoom = false;
    fetch('/datasets/ne_110m_admin_0_countries.geojson')
      .then(res => res.json())
      .then(data => {
        // console.log(data);
        setPolygons(data.features);
      });
  }, [parentWidth]);

  return (
    <ReactGlobe
      ref={globeRef}
      width={parentWidth}
      height={parentWidth < 900 ? parentWidth : 900}
      polygonsData={polygons}
      polygonCapColor={(d: any) => {
        console.log(d.properties);
        return (listCodes.includes(d.properties.ISO_A2.toLowerCase()) ||
          listNames.includes(d.properties.BRK_NAME.toLowerCase())) ?
          variables.colorMenu1 :
          variables.accentColor;
      }}
      polygonSideColor={() => variables.colorButton}
      polygonStrokeColor={() => variables.colorButton}
      polygonAltitude={() => 0.02}
      globeImageUrl={"/img/shared/earth-day.jpg"}
      // bumpImageUrl="/img/shared/earth-topology.png"
      backgroundColor={'rgba(0,0,0,0)'}
      labelsData={polygons}
      labelText={(d: any) => d.properties.ISO_A2}
      // labelSize={2}
      labelColor={'blue'}
      // labelResolution={2}
    />
  )
}
