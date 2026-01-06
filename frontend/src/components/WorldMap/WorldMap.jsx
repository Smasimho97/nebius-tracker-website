import React, { useState } from "react";
import styles from "./WorldMap.module.css";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
  Marker,
} from "react-simple-maps";
import markerStyles from "./Marker.module.css";
import { nebiusSites } from "../../data/nebiusSites.js";

const worldGeoUrl =
  "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-50m.json";
const usGeoUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";

export default function MapChart() {
  const width = 1280;
  const height = 720;

  const activePower = nebiusSites
      .filter(site => site.status === "Active")
      .reduce((sum, site) => sum + site.mw, 0);

  const status_colors = {
    Active: "#00ffddff",
    Construction: "#f9ff4fff",
    Potential: "#ff4f81ff",
    HQ: "#9359ffff",
  };

  const [activeMarker, setActiveMarker] = useState(null);
  const [activeInfo, setActiveInfo] = useState(null);

  return (
    <div className="constructorContainer">
      <section className="section" />
      <h2 className={styles.mapHeader}> DATACENTER TRACKER </h2>

      <div className={styles.mapWindow}>
        <ComposableMap
          projection="geoMercator"
          projectionConfig={{
            rotate: [-12, 0],
            center: [0, 30],
            // parallels: [0, 0],
            scale: 170,
          }}
          width={width}
          height={height}
          style={{
            backgroundColor: "var(--map-base-color)",
            userSelect: "none",
            WebkitUserSelect: "none",
          }}
          // projection={projection}
        >
          <ZoomableGroup
            translateExtent={[
              [-40, -100],
              [1320, 745],
            ]}
            center={[11, 44]} // [lon, lat] — center on initial render
            zoom={1.0} // initial zoom level
            minZoom={0.9} // optional: don't let user zoom too far out
            maxZoom={6} // optional: don't let user zoom too far in
          >
            <Geographies geography={worldGeoUrl}>
              {({ geographies }) =>
                geographies
                  .filter(
                    (geo) =>
                      geo.properties.name !== "Antarctica" &&
                      geo.properties.name !== "United States of America"
                  )
                  .map((geo) => (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      style={{
                        default: {
                          fill: "var(--map-land-color)",
                          outline: "none",
                          stroke: "#5884f2",
                          strokeWidth: "0.3",
                        },
                        hover: {
                          fill: "var(--map-land-hover-color)", // land gets lighter
                          stroke: "#5884f2", // border changes #5884f2 #D7F063
                          strokeWidth: "0.5",
                          outline: "none",
                          cursor: "pointer",
                        },
                        pressed: {
                          fill: "none",
                          outline: "none",
                        },
                      }}
                    />
                  ))
              }
            </Geographies>

            <Geographies geography={usGeoUrl}>
              {({ geographies }) =>
                geographies.map((geo) => (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    style={{
                      default: {
                        fill: "var(--map-land-color)", // transparent fill so you see world map underneath
                        stroke: "#5884f2", // state borders
                        strokeWidth: "0.3",
                        outline: "none",
                      },
                      hover: {
                        fill: "var(--map-land-hover-color)",
                        stroke: "#5884f2",
                        strokeWidth: "0.5",
                        outline: "none",
                        cursor: "pointer",
                      },
                    }}
                  />
                ))
              }
            </Geographies>

            {nebiusSites.map((site) => {
              const color = status_colors[site.status];

              return (
                <Marker
                  key={site.city}
                  coordinates={site.coordinates}
                  onMouseEnter={() => setActiveMarker(site.city)}
                  onMouseLeave={() => setActiveMarker(null)}
                >
                 <g className={markerStyles.markerSvg}>
                  <circle className={markerStyles.core} r=".8" fill={color} cx="0" cy="0" />
                  <circle className={markerStyles.pulse} r=".8" fill={color} cx="0" cy="0" />
                  <circle className={markerStyles.pulse} r=".8" fill={color} cx="0" cy="0" />
                  <circle className={markerStyles.pulse} r=".8" fill={color} cx="0" cy="0" />
                  <circle className={markerStyles.pulse} r=".8" fill={color} cx="0" cy="0" />
                </g>
                </Marker>
              );
            })}

            {activeMarker &&
              nebiusSites
                .filter((site) => site.city === activeMarker)
                .map((site) => {
                  const color = status_colors[site.status];
                  return (
                    <Marker
                      key={`popup-${site.city}`}
                      coordinates={site.coordinates}
                    >
                      <g transform="translate(4, -7.5)">
                        <rect
                          x="0"
                          y="0"
                          width="60"
                          height="30"
                          rx="2"
                          fill="#1b263b"
                          stroke={color}
                          strokeWidth="0.75"
                          opacity="0.95"
                        />
                        <text
                          x="30"
                          y="8"
                          textAnchor="middle"
                          fill="#ffffff"
                          fontSize="5"
                          fontWeight="bold"
                          fontFamily="Bruno Ace SC, sans-serif"
                        >
                          {site.country == "USA"
                            ? site.city + ", " + site.state
                            : site.city}
                        </text>
                        <text
                          x="30"
                          y="14"
                          textAnchor="middle"
                          fill="var(--text-secondary-color)"
                          fontSize="4"
                          fontFamily="Arial, sans-serif"
                        >
                          {site.mw} MW
                        </text>
                        <text
                          x="30"
                          y="20"
                          textAnchor="middle"
                          fill={color}
                          fontSize="3.5"
                          fontFamily="Arial, sans-serif"
                        >
                          Status: {site.status}
                        </text>
                        <text
                          x="30"
                          y="26"
                          textAnchor="middle"
                          fill="#aaaaaa"
                          fontSize="3.5"
                          fontFamily="Arial, sans-serif"
                        >
                          {site.country}
                        </text>
                      </g>
                    </Marker>
                  );
                })}
          </ZoomableGroup>
        </ComposableMap>

        {/* Active Power Badge */}
        <div className={styles.activePowerContainer}>
          <div className={styles.statusIndicator}></div>
          <div className={styles.activePowerContent}>
            <span className={styles.activePowerNumber}> {activePower} MW </span>
            <span className={styles.activePowerText}> Active Power </span>
          </div>
          <button
            className={styles.infoButton}
            onClick={() => setActiveInfo((prev) => !prev)}
          >
            ⓘ
          </button>
        </div>

        {/* Legend Dropdown */}
        {activeInfo && (
          <div className={styles.legendContainer}>
            <div className={`${styles.powerIcon} ${styles.activePower}`}> </div>
            <span className={styles.legendText}>Active</span>

            <div className={`${styles.powerIcon} ${styles.constructingPower}`}>
              {" "}
            </div>
            <span className={styles.legendText}>Constructing</span>

            <div className={`${styles.powerIcon} ${styles.potentialPower}`}>
              {" "}
            </div>
            <span className={styles.legendText}>Potential</span>

            <div className={`${styles.powerIcon} ${styles.hq}`}> </div>
            <span className={styles.legendText}>HQ</span>
          </div>
        )}
      </div>
    </div>
  );
}
