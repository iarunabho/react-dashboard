'use client'

import React, { memo, useState } from "react";
import { ComposableMap, Geographies, Geography, Marker, ZoomableGroup } from "react-simple-maps";
import { scaleLinear } from "d3-scale";
import { Tooltip } from 'react-tooltip'

const geoUrl = "https://unpkg.com/world-atlas@2.0.2/countries-110m.json";

const WorldMap = ({ data }) => {
  const [tooltipContent, setTooltipContent] = useState("");
  const maxLearners = Math.max(...data.map(d => d.learner_count));
  const minLearners = Math.min(...data.map(d => d.learner_count));

  const colorScale = scaleLinear()
    .domain([minLearners, maxLearners])
    .range(["#CFD8DC", "#00796B"]);

  return (
    <>
      <ComposableMap 
        projection="geoMercator" 
        projectionConfig={{ scale: 100 }}
        style={{ width: "100%", height: "100%" }}
      >
        <ZoomableGroup center={[0, 20]} zoom={2}>
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const countryData = data.find(d => d.country_name === geo.properties.name);
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill={countryData ? colorScale(countryData.learner_count) : "#CFD8DC"}
                    stroke="#FFFFFF"
                    strokeWidth={0.5}
                    data-tooltip-id="my-tooltip"
                    data-tooltip-content={countryData ? `${countryData.country_name}: ${countryData.learner_count} learners` : geo.properties.name}
                    style={{
                      default: { outline: "none" },
                      hover: { outline: "none", fill: "#F53" },
                      pressed: { outline: "none" },
                    }}
                  />
                );
              })
            }
          </Geographies>
          {data.map((country) => (
            <Marker key={country.country_name} coordinates={getCoordinates(country.country_name)}>
              <circle r={3} fill="#F00" stroke="#FFF" strokeWidth={1} />
            </Marker>
          ))}
        </ZoomableGroup>
      </ComposableMap>
      <Tooltip id="my-tooltip" />
    </>
  );
};

const getCoordinates = (countryName) => {
  const coordinates = {
    'United States of America': [-95, 38],
    'Spain': [-3, 40],
    'Germany': [10, 51],
    'India': [78, 20],
    'Canada': [-106, 56],
    'Brazil': [-55, -10],
    'South Korea': [128, 36]
  };
  return coordinates[countryName] || [0, 0];
};

export default memo(WorldMap);