import React, { useState } from "react";
import styles from "./WorldMap.module.css";
import WaveBackground from "./WaveBackground.jsx";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
  Marker,
} from "react-simple-maps";
import { Graticule, Line } from "react-simple-maps";
import markerStyles from "./Marker.module.css";
import MapHeader from "../Header/MapHeader/MapHeader.jsx";
import { nebiusSites } from "../../data/nebiusSites.js";

const isMobileDevice = window.matchMedia ('(pointer:coarse)').matches;

const worldGeoUrl =
  "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-50m.json";
const usGeoUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";

export default function MapChart() {
  const activeMW = nebiusSites
    .filter((site) => site.status === "Active")
    .reduce((sum, site) => sum + site.activeMW, 0);

  const activeSites = nebiusSites.reduce(
    (count, site) => (site.status === "Active" ? count + 1 : count),
    0,
  );

  const constructingSites = nebiusSites.reduce(
    (count, site) => (site.status === "Constructing" ? count + 1 : count),
    0,
  );

  const potentialSites = nebiusSites.reduce(
    (count, site) => (site.status === "Announced" ? count + 1 : count),
    0,
  );

  const builtSites = nebiusSites.reduce(
    (count, site) => (site.type === "Built" ? count + 1 : count),
    0,
  );

  const colocationSites = nebiusSites.reduce(
    (count, site) => (site.type === "Colocation" ? count + 1 : count),
    0,
  );

  const ownedSites = nebiusSites.reduce(
    (count, site) => (site.type === "Owned" ? count + 1 : count),
    0,
  );

  const status_colors = {
    Announced: "#76c1fe" /*ff4f81ff*/ /*#6b9eff*/,
    Construction: "rgba(250, 204, 21, 1)", /*#fb7185*/
    Active: "rgb(0, 255, 221)",
  };

  const type_colors = {
    Owned: "#34d399",
    Colocation: "#ff6179",
    Built: "#e0ff4f",
  };

  const [activeMarker, setActiveMarker] = useState(null);
  const [activeInfo, setActiveInfo] = useState(true);
  const [activeStatus, setActiveStatus] = useState(true);

  return (
    <>
      <div className={styles.mapWindow}>
        <WaveBackground/>
        <MapHeader />
        <div style={{ position: "absolute", inset: 0, zIndex: 1 }}>
        <ComposableMap
          projection="geoMercator"
          projectionConfig={{
            rotate: [-12, 0],
            center: [0, 30],
            // parallels: [0, 0],
            scale: 170,
          }}
          style={{
            width: "100%",
            height: "100%",
            display: "block",
            userSelect: "none",
            WebkitUserSelect: "none",
          }}
          // projection={projection}
        >
          <ZoomableGroup
            center={[11, 45]}
            zoom={0.75} /* Start with .6 */
            minZoom={0.7}
            maxZoom={15}
            translateExtent={[
              [-250, -250],
              [1050, 700],
            ]}
          >
            <Graticule
              stroke="rgba(88, 132, 242, 0.08)"
              strokeWidth={0.3}
              globe={false}
            />
            /* left, top, right, bottom */
            <Geographies geography={worldGeoUrl}>
              {({ geographies }) =>
                geographies
                  .filter(
                    (geo) =>
                      geo.properties.name !== "Antarctica" &&
                      geo.properties.name !== "United States of America",
                  )
                  .map((geo) => (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      style={{
                        default: {
                          fill: "rgba(145, 173, 208, 0.6)" /*#102e4a"*/,
                          outline: "none",
                          stroke: "var(--map-stroke-color)",
                          strokeWidth: "0.25",
                        },
                        hover: {
                          fill: "var(--map-land-hover-color)", // land gets lighter
                          stroke: "var(--map-stroke-color)", // border changes #5884f2 #D7F063
                          strokeWidth: "0.25",
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
                        fill: "rgba(145, 173, 208, 0.6)", // transparent fill so you see world map underneath
                        stroke: "var(--map-stroke-color)", // state borders
                        strokeWidth: "0.25",
                        outline: "none",
                      },
                      hover: {
                        fill: "var(--map-land-hover-color)",
                        stroke: "var(--map-stroke-color)",
                        strokeWidth: "0.25",
                        outline: "none",
                        cursor: "pointer",
                      },
                    }}
                  />
                ))
              }
            </Geographies>
            {/* Marker Logic */}
            {nebiusSites.map((site) => {
              const color =
                activeStatus === true
                  ? status_colors[site.status]
                  : type_colors[site.type];

              return (
                <Marker
                  key={site.datacenter_id}
                  coordinates={
                    site.markerCoordinates
                      ? site.markerCoordinates
                      : site.coordinates
                  }
                  onMouseEnter={() => setActiveMarker(site.datacenter_id)}
                  onMouseLeave={() => setActiveMarker(null)}
                  onClick={isMobileDevice ? () => setActiveMarker(prev => prev === site.datacenter_id ? null : site.datacenter_id)
                                          : undefined}>
                  <g className={markerStyles.markerSvg}>
                    {/* Cylinder body - scaled to 60% */}
                    <path
                      d="M -1.8 0 L -1.8 1.2 Q -1.8 1.8 0 1.8 Q 1.8 1.8 1.8 1.2 L 1.8 0"
                      fill={color}
                      opacity="0.8"
                    />

                    {/* Cylinder top */}
                    <ellipse
                      cx="0"
                      cy="0"
                      rx="1.8"
                      ry="0.6"
                      fill={color}
                      stroke="rgba(255, 255, 255, 0.3)"
                      strokeWidth="0.1"
                    />

                    {/* Highlight on top */}
                    <ellipse
                      cx="0"
                      cy="0"
                      rx="1.2"
                      ry="0.36"
                      fill="rgba(255, 255, 255, 0.2)"
                    />
                  </g>
                </Marker>
              );
            })}
            {activeMarker &&
              nebiusSites
                .filter((site) => site.datacenter_id === activeMarker)
                .map((site) => {
                  const color = (activeStatus === true ? status_colors[site.status] : type_colors[site.type]);
                  if (site.type === "Built") site = { ...site, type: "Build-to-Suit" };
                  return (
                    <Marker
                      key={`popup-${site.city}`}
                      coordinates={site.coordinates}
                    >
                      {/* Background rectangle */}
                      <defs>
                        <linearGradient id="bgGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#1e2e42"/>
                          <stop offset="100%" stopColor="#162030"/>
                        </linearGradient>
                      </defs>

                      <rect
                        x="5"
                        y="-10"
                        width="60"
                        height="38.5"
                        fill="url(#bgGrad)"
                        stroke={color}
                        strokeWidth="0.25"
                        rx="2"
                        ry="2"
                      />

                      {/* Status dot and text header */}
                      <g>
                        <circle cx="11" cy="-4.3" r=".8" fill={color} className={markerStyles.statusDot}/>
                        <text x="14" y="-3.7" className={markerStyles.statusText} fill={color} stroke={color} strokeWidth="0.1">
                          {activeStatus 
                            ? site.status.toUpperCase() 
                            :  site.type.toUpperCase()}
                        </text>
                      </g>

                      {/* City name */}
                      <text x="10" y="3" className={markerStyles.popupCity}>
                        {site.country === "USA"
                          ? `${site.city}, ${site.state}`
                          : site.city}
                      </text>

                      {/* Info rows */}
                      <g>
                        {/* Power row */}
                        <line x1="10" y1="6.25" x2="60" y2="6.25" stroke={color} strokeWidth="0.2" opacity="0.2"/>
                        
                        
                        {/* Power Bar */}
                        <text x="10" y="10.75" className={markerStyles.popupLabel}>
                          {"POWER"}{" "}
                        </text>

                        <text x="60" y="11.00" className={markerStyles.popupValueBig} textAnchor="end" style={{ fill: color }}>
                          {site.activeMW === ""
                            ? " 0 MW"
                            : `${site.activeMW} MW`}
                        </text>

                        <text x="60" y="13.00" font-family="'DM Mono','Courier New',monospace" font-size="1.3" fill="rgb(255, 255, 255)" textAnchor="end" letterSpacing="0.08em">
                          {site.capacityMW === "" 
                            ? "UNKNOWN CAPACITY" 
                            : site.activeMW === site.capacityMW 
                            ? "100% CAPACITY" 
                            : `${site.capacityMW} MW CAPACITY`}
                        </text>



                        <rect x="10" y="14.0" width="50" height=".5" fill="rgba(255,255,255,0.06)" rx=".25"/>
                        <rect x="10" y="14.0" width={site.activeMW === "" ? 0 : (site.activeMW / site.capacityMW) * 50} height=".5" fill={color} rx=".25"/>
                        
                        {/* Type OR Status */}
                        <text x="10" y="19.0" className={markerStyles.popupLabel}>
                          {activeStatus 
                            ? "TYPE" 
                            : "STATUS" }
                        </text>

                        <text x="60" y="19.0" className={markerStyles.popupValue} textAnchor="end">
                          {activeStatus 
                            ? site.type
                            : site.status }
                        </text>


                        {/* Location row */}
                        <text x="10" y="23.5" className={markerStyles.popupLabel}>
                          LOCATION
                        </text>
                        <text x="60" y="23.5" className={markerStyles.popupValue} textAnchor="end">
                          {site.country}
                        </text>

                        
                      </g>
                    </Marker>
                  );
                })}
          </ZoomableGroup>
        </ComposableMap>
        </div>

        {/* Map Overlay */}
        {activeInfo === false && (
          <div className={styles.mapOverlay}>
            <button
              className={styles.exitButton}
              onClick={() => setActiveInfo((prev) => !prev)}
            >
              {" "}
              ×{" "}
            </button>

            <div className={styles.legendContainer}>
              {activeStatus && (
                <>
                  <div className={styles.legendItemContainer}>
                    <div
                      className={`${styles.statusIndicator} ${styles.activePowerIcon}`}
                    ></div>
                    <div className={styles.legendItemContent}>
                      <div className={styles.legendItemKey}> Active </div>
                      <div className={styles.legendItemAttributes}>
                        {" "}
                        {activeSites} Sites • {activeMW} MW
                      </div>
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
                      className={`${styles.statusIndicator} ${styles.announcedPowerIcon}`}
                    ></div>
                    <div className={styles.legendItemContent}>
                      <div className={styles.legendItemKey}> Announced </div>
                      <div className={styles.legendItemAttributes}>
                        {" "}
                        {potentialSites} sites{" "}
                      </div>
                    </div>
                  </div>
                </>
              )}

              {activeStatus === false && (
                <>

                 <div className={styles.legendItemContainer}>
                    <div
                      className={`${styles.statusIndicator} ${styles.ownedPowerIcon}`}
                    ></div>
                    <div className={styles.legendItemContent}>
                      <div className={styles.legendItemKey}> Owned </div>
                      <div className={styles.legendItemAttributes}>
                        {" "}
                        {ownedSites} sites{" "}
                      </div>
                    </div>
                  </div>

                  <div className={styles.legendItemContainer}>
                    <div
                      className={`${styles.statusIndicator} ${styles.builtPowerIcon}`}
                    ></div>
                    <div className={styles.legendItemContent}>
                      <div className={styles.legendItemKey}>
                        {" "}
                        Build-to-Suit{" "}
                      </div>
                      <div className={styles.legendItemAttributes}>
                        {" "}
                        {builtSites} Sites
                      </div>
                    </div>
                  </div>

                  <div className={styles.legendItemContainer}>
                    <div
                      className={`${styles.statusIndicator} ${styles.colocationPowerIcon}`}
                    ></div>
                    <div className={styles.legendItemContent}>
                      <div className={styles.legendItemKey}> Colocation </div>
                      <div className={styles.legendItemAttributes}>
                        {" "}
                        {colocationSites} sites{" "}
                      </div>
                    </div>
                  </div>

                 
                </>
              )}
            </div>

            <div className={styles.divider}></div>

            <div className={styles.toggleSlash}>
              <span
                className={`${styles.toggleSlashOpt} ${activeStatus ? styles.active : ""}`}
                onClick={() => !activeStatus && setActiveStatus(true)}
              >
                {" "}
                Status{" "}
              </span>
              <span className={styles.toggleSlashOpt}> / </span>
              <span
                className={`${styles.toggleSlashOpt} ${activeStatus === false ? styles.active : ""}`}
                onClick={() => activeStatus && setActiveStatus(false)}
              >
                {" "}
                Type{" "}
              </span>
            </div>
          </div>
        )}

        {/* Active Power Badge */}
        {activeInfo === true && (
          <div className={styles.activePowerContainer}>
            <div
              className={`${styles.statusIndicator} ${styles.activePowerIcon}`}
            ></div>
            <div className={styles.activePowerContent}>
              <span className={styles.activePowerNumber}> {activeMW} MW </span>
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
      </div>
    </>
  );
}
