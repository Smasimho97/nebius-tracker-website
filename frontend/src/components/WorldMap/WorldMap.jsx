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
    .filter((site) => site.status === "Active")
    .reduce((sum, site) => sum + site.activePower, 0);

  const status_colors = {
    Active: "#00ffddff",
    Construction: "#f9ff4fff",
    Potential: "#ff4f81ff",
    HQ: "#9359ffff",
    Satellite: "#9359ffff",
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
                      {/* Background rectangle */}
                      <rect
                        x="5"
                        y="-10"
                        width="60"
                        height="34"
                        fill="rgba(30, 42, 58, 0.95)"
                        stroke={color}
                        strokeWidth="0.5"
                        rx="2"
                        ry="2"
                      />

                      {/* Status dot and text header */}
                      <g>
                        <circle
                          cx="11"
                          cy="-4.6"
                          r="1.15"
                          fill={color}
                          className={markerStyles.statusDot}
                        />

                        <text
                          x="14"
                          y="-3.5"
                          className={markerStyles.statusText}
                          fill={color}
                          stroke={color}
                          strokeWidth="0.1"
                        >
                          {site.status.toUpperCase()}
                        </text>
                      </g>

                      {/* City name */}
                      <text x="10" y="3.5" className={markerStyles.popupCity}>
                        {site.country === "USA"
                          ? `${site.city}, ${site.state}`
                          : site.city}
                      </text>

                      {/* Info rows */}
                      <g>
                        {/* Power row */}
                        <line
                          x1="10"
                          y1="6"
                          x2="60"
                          y2="6"
                          stroke="rgba(255, 255, 255, 0.1)"
                          strokeWidth="0.3"
                        />
                        <text x="10" y="11" className={markerStyles.popupLabel}>
                          {site.type === "Office" ? "CAMPUS" : "POWER"}{" "}
                        </text>
                        <text
                          x="60"
                          y={site.type === "Office" ? "11" : "11.5"}
                          className={
                            site.type === "Office"
                              ? markerStyles.popupLocationValue
                              : markerStyles.popupValue
                          }
                          textAnchor="end"
                        >
                          {site.activePower === "Pending"
                            ? "Pending"
                            : site.type === "Office"
                            ? site.status
                            : `${site.activePower} MW`}
                        </text>

                        {/* Location row */}
                        <line
                          x1="10"
                          y1="14"
                          x2="60"
                          y2="14"
                          stroke="rgba(255, 255, 255, 0.1)"
                          strokeWidth="0.3"
                        />
                        <text x="10" y="19" className={markerStyles.popupLabel}>
                          LOCATION
                        </text>
                        <text
                          x="60"
                          y="19"
                          className={markerStyles.popupLocationValue}
                          textAnchor="end"
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
