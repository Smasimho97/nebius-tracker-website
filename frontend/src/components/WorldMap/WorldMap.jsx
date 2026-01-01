import React, { useState } from "react";
import styles from "./WorldMap.module.css";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
  Marker,
} from "react-simple-maps";
import { nebiusSites } from "../../data/nebiusSites.js";

const worldGeoUrl =
  "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-50m.json";
const usGeoUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";

export default function MapChart() {


  const width = 1280;
  const height = 720;

  const status_colors = {
    Active: "var(--status-active)",
    Upgrade: "var(--status-upgrading)",
    Construction: "var(--status-constructing)",
    Potential: "var(--status-potential)",
    HQ: "var(--purple)",
  };

  const [activeMarker, setActiveMarker] = useState(null);

  return (
    <div className="constructorContainer">
      <section className="section" />
      <div className={styles.mapRowHeader}>
        <h2 className={styles.mapHeader}> DATACENTER TRACKER </h2>
      </div>

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
            center={[12, 45]} // [lon, lat] — center on initial render
            zoom={1} // initial zoom level
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
                          stroke: "var(--map-border-color)",
                          strokeWidth: "0.2",
                        },
                        hover: {
                          fill: "var(--map-land-hover-color)", // land gets lighter
                          stroke: "var(--map-border-color)", // border changes #5884f2 #D7F063
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
                        stroke: "var(--map-border-color)", // state borders
                        strokeWidth: "0.2",
                        outline: "none",
                      },
                      hover: {
                        fill: "var(--map-land-hover-color)",
                        stroke: "var(--map-border-color)",
                        strokeWidth: 0.5,
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
              const isActive = activeMarker === site.city;

              return (
                <Marker
                  key={site.city}
                  coordinates={site.coordinates}
                  onClick={() => setActiveMarker(isActive ? null : site.city)}
                >
                  <g transform="translate(-2.75, -2.75)" style={{ color }}>
                    <g fill="currentColor">
                      <rect x="0" y="0" width="2.5" height="2.5" rx="0.5" />
                      <rect x="2.75" y="0" width="2.5" height="2.5" rx="0.5" />
                      <rect x="0" y="2.75" width="2.5" height="2.5" rx="0.5" />
                      <rect
                        x="2.75"
                        y="2.75"
                        width="2.5"
                        height="2.5"
                        rx="0.5"
                      />
                    </g>
                    <circle
                      cx="2.75"
                      cy="2.625"
                      r="2"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="0.5"
                    />
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
                          {site.country == "USA" ? site.city + ", " + site.state :site.city}
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

        {/*Legend Icons*/}
        <div className={styles.legendChart}>
          <div className={`${styles.powerIcon} ${styles.activePower}`} />
          <span className={styles.legendLabel}>Active</span>

          <div className={`${styles.powerIcon} ${styles.phasedPower}`} />
          <span className={styles.legendLabel}>Upgrade</span>

          <div className={`${styles.powerIcon} ${styles.constructingPower}`} />
          <span className={styles.legendLabel}>Construction</span>

          <div className={`${styles.powerIcon} ${styles.potentialPower}`} />
          <span className={styles.legendLabel}>Potential</span>
        </div>

        {/*Connected Power Monitor*/}
        <div className={styles.connectedPowerContainer}>
          <span className={styles.power}>150 MW</span>
          <span className={styles.text}>Connected Power</span>
        </div>
      </div>
    </div>
  );
}
