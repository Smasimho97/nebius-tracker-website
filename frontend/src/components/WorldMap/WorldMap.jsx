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

  const targetPower = nebiusSites
    .filter((site) => site.targetPower != null)
    .reduce((sum, site) => sum + site.targetPower, 0);

  const activeSites = nebiusSites.reduce(
    (count, site) => (site.status === "Active" ? count + 1 : count),
    0
  );

  const constructingSites = nebiusSites.reduce(
    (count, site) => (site.status === "Constructing" ? count + 1 : count),
    0
  );

  const potentialSites = nebiusSites.reduce(
    (count, site) => (site.status === "Potential" ? count + 1 : count),
    0
  );


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
                          {site.type === "Office"
                            ? site.type.toUpperCase()
                            : site.status.toUpperCase()}
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
        {activeInfo === null && (
        <div className={styles.activePowerContainer}>
          <div
            className={`${styles.statusIndicator} ${styles.activePowerIcon}`}
          ></div>
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
        )}

        {/* Conditional Legend Overlay */}

        {activeInfo && (
          <div className={styles.statusOverlay}>
            <div className={styles.legendContainer}>
              <div className={styles.legendItemContainer}>
                <div
                  className={`${styles.statusIndicator} ${styles.activePowerIcon}`}
                ></div>
                <div className={styles.legendItemContent}>
                  <div className={styles.legendItemKey}> Active </div>
                  <div className={styles.legendItemAttributes}>
                    {" "}
                    {activeSites} Sites • {activePower} MW
                  </div>
                </div>

                <div className={styles.legendItemContainer}>
                  <div
                    className={`${styles.statusIndicator} ${styles.constructingPowerIcon}`}
                  ></div>
                  <div className={styles.legendItemContent}>
                    <div className={styles.legendItemKey}> Construction </div>
                    <div className={styles.legendItemAttributes}>
                      {" "}
                      {constructingSites} sites{" "}
                    </div>
                  </div>
                </div>

                <div className={styles.legendItemContainer}>
                  <div
                    className={`${styles.statusIndicator} ${styles.potentialPowerIcon}`}
                  ></div>
                  <div className={styles.legendItemContent}>
                    <div className={styles.legendItemKey}> Potential </div>
                    <div className={styles.legendItemAttributes}>
                      {" "}
                      {potentialSites} sites{" "}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.totalPipelineContainer}>
              <div className={styles.totalPipelineKey}> {targetPower} MW </div>
              <div className={styles.totalPipelineAttributes}>
                Total Pipeline
              </div>
            </div>

           <button 
  className={styles.exitButton}
  onClick={() => setActiveInfo(null)}
  aria-label="Close legend"
>
  ×
</button>
          </div>
        )}
      </div>
    </div>
  );
}
