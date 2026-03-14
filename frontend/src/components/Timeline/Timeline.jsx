import styles from "./Timeline.module.css";
import MetallicDrift from "./MetallicDrift.jsx";
import legendIcon from "../../assets/icons/tri-color.svg"
import { timelineDate } from "./timelineGenerator.js";
import { nebiusSites } from "../../data/nebiusSites.js";
import currentQuarter from "../../data/currentQuarter.json";
import React from "react"
import {useState} from "react"


export default function Timeline() {

    const [isLegendActive, setLegendActive] = useState(0);

    const [isAmericasActive, setAmericasActive] = useState(() => window.innerHeight >= 480);
    const [isEuropeActive, setEuropeActive] = useState(() => window.innerHeight >= 770);
    const [isMiddleEastActive, setMiddleEastActive] = useState(false);

    const americasSites = nebiusSites.filter((site)=> (site.region === "Americas"));
    const europeSites = nebiusSites.filter((site)=> (site.region === "Europe"));
    const middleEastSites = nebiusSites.filter((site)=> (site.region === "Middle East"));

    const CURRENT_QUARTER = currentQuarter.quarter;
    const CURRENT_YEAR = currentQuarter.year;

    const lastOverallQuarterTotals = new Array(nebiusSites.length).fill(0);

    const lastAmericasQuarterTotals = new Array(americasSites.length).fill(0);
    const lastAmericasQuarterTypes = new Array(americasSites.length).fill("");

    const lastEuropeQuarterTotals = new Array(europeSites.length).fill(0);
    const lastEuropeQuarterTypes = new Array(europeSites.length).fill("");

    const lastMiddleEastQuarterTotals = new Array(middleEastSites.length).fill(0);
    const lastMiddleEastQuarterTypes = new Array(middleEastSites.length).fill("");

    return (
        <>
            <MetallicDrift/>
            <div className={styles.container}>

                <div className={styles.timelineGrid}
                     style={{
                        gridTemplateColumns: `12.125rem repeat(${timelineDate.length}, 4.125rem)`, 
                     }}> 

                    {/* Empty cell for label column */}

                    <div className={styles.legendContainer}>
                    <button className={`${styles.legendBadge}`}
                            onClick={() => {setLegendActive(prev => prev >= 3 ? 0 : prev + 1) }}>

                            {isLegendActive === 0 ? <img src={legendIcon} width="6" height="14" alt="" /> :
                             isLegendActive === 1 ? <div className={styles.swatchAnnounced} /> :
                             isLegendActive === 2 ? <div className={styles.swatchActive} />    :
                             isLegendActive === 3 ? <div className={styles.swatchTarget} />    : null
                            } 
                    </button>
                    <div className={styles.legendText}>
                        { isLegendActive === 0 ? "Legend" :
                         isLegendActive === 1 ? "Announced" :
                         isLegendActive === 2 ? "Active" :
                         isLegendActive === 3 ? "Target" : ""}
                    </div>

                    </div>

                    {/* Quarter labels */}
                    {timelineDate.map((date, colIndex) => {

                        let isCurrent = CURRENT_QUARTER == date.quarter && CURRENT_YEAR == date.year;
                        
                        return (
                        <div className={styles.dateContainer}
                             style={{ animationDelay: `${colIndex * 38}ms` }}>
                            <div className={isCurrent ? styles.dateCurrent : styles.date }>Q{date.quarter}'{date.year}</div>
                            <div className={isCurrent ? styles.dateUnderscoreCurrent : styles.dateUnderscore} />
                        </div>
                        )})}


                        {/* Americas */}
                        <button className={styles.regionContainer}
                                onClick={()=> {setAmericasActive((prev) => !prev)}}
                                style={{ gridColumn: !isAmericasActive ? '1' : '1 / -1' }}> Americas </button>
                        
                        {isAmericasActive && americasSites.map((site, rowIndex) => {
                            let lastEntry = [null, null, null]
                            let isCurrent = false;
                            
                            return (
                                <React.Fragment key={site.datacenter_id}>
                                        <div className={styles.siteLocationIDContainer}
                                             style={{ animationDelay: `${rowIndex * 60}ms` }}>
                                            <div className={styles.siteLocation}> {site.city}, {site.state} </div>
                                            <div className={styles.siteID}> {site.datacenter_id} </div>
                                        </div>

                                    {timelineDate.map((col, colIndex) => {
                                        const entry = site.date.find(d => d.quarter === col.quarter && d.year === col.year)
                                        const hasEntry = !!entry;
                                        

                                        if (hasEntry) {
                                            lastEntry[0] = entry.type;
                                            lastEntry[1] = entry.power;
                                            lastEntry[2] = entry.flag;
                                         }

                                        if (col.quarter === CURRENT_QUARTER && col.year === CURRENT_YEAR) {
                                            isCurrent = true;
                                        } else {
                                            isCurrent = false;
                                        }

                                        return (
                                                <div className={`${styles.dataCell} 
                                                                
                                                                ${lastEntry[0] === "actual" ? styles.active : 
                                                                lastEntry[0] === "target" ? styles.target :
                                                                lastEntry[0] === "announced" ? styles.announced:
                                                                                styles.empty}
                                                                ${isCurrent && lastEntry[0] == "actual" ? styles.currentActive :
                                                                isCurrent && lastEntry[0] == "target" ? styles.currentTarget : 
                                                                isCurrent && lastEntry[0] == "announced" ? styles.currentAnnounced : 
                                                                ""}`   
                                                                
                                                                
                                                            }
                                                            style={{ animationDelay: `${(rowIndex + colIndex) * 38}ms` }}
                                                            >
                                                    {lastEntry[1]}
                                                    <div className={styles.speculativeFlag}>
                                                        {lastEntry[2]}
                                                    </div>
  
                                                </div>
                                        )
                                    })}
                                </React.Fragment>
                            );
                        })}

                
                
                    {/* America Region Level View */}
                    {!isAmericasActive && timelineDate.map((col) => {

                        let isCurrent = col.quarter === CURRENT_QUARTER && col.year === CURRENT_YEAR;
                        let finalColumnType = "";
                        let isAnnounced = 0, isActual = 0, isTarget = 0;
                        
                        americasSites.forEach((site, i) => {
                            const entry = site.date.find(d => d.quarter === col.quarter && d.year === col.year);

                            if (entry && entry.power !== "?") {
                            lastAmericasQuarterTotals[i] = entry.power; //insert all entries for a quarter
                            }

                            if (!entry) {
                                //no change
                            } else {
                                lastAmericasQuarterTypes[i] = entry.type;
                            }
    
                        });

                        for (let i = 0; i < lastAmericasQuarterTypes.length; i++ ){
                            if (lastAmericasQuarterTypes[i] === "announced"){
                                isAnnounced = 1;
                            } else if (lastAmericasQuarterTypes[i] === "actual") {
                                isActual = 1;
                            } else if (lastAmericasQuarterTypes[i] === "target") {
                                isTarget = 1;
                            }
                        } 

                        //if all entries are 0 and no announced, we make it blank...
                        //if all entries are 0 and there is announced, we make it announced...
                        //if entries and there is target, we  make all the rest target 

                        if (isAnnounced === 0 && isActual === 0 && isTarget === 0) {
                            finalColumnType = "";
                        } else if (isAnnounced === 1 && isActual === 0 && isTarget === 0) {
                            finalColumnType = "announced";
                        } else if (isTarget === 1) {
                            finalColumnType = "target";
                        } else if (isActual === 1 ) {
                            finalColumnType ="actual";
                        }


                        const regionTotal = lastAmericasQuarterTotals
                        .filter(val => val !== "—" && val !== "?" && val !== "" && !isNaN(Number(val)))
                        .reduce((sum, val) => sum + Number(val), 0);

                        return (
                            <div key={`${col.quarter}-${col.year}`} className={`${styles.dataCell}
                                ${finalColumnType === "" ? "" : 
                                finalColumnType === "announced"  ? styles.announced : 
                                finalColumnType === "actual" ? styles.active :
                                finalColumnType === "target" ? styles.target : ""}
                                
                                ${finalColumnType === "" ? "" : 
                                finalColumnType === "announced" && isCurrent === true ? styles.currentAnnounced : 
                                finalColumnType === "actual" && isCurrent === true ? styles.currentActive :
                                finalColumnType === "target" && isCurrent === true ? styles.currentTarget : ""}
                                `}
                                
                                >

                            {regionTotal === 0 && isAnnounced == 0 ? "" :
                            regionTotal === 0 && isAnnounced == 1 ? "-" : regionTotal}
                            </div>
                        );
                    })}

                
    
                     {/* Europe */}
                    <button className={styles.regionContainer} 
                            onClick={()=> {setEuropeActive((prev) => !prev)}}
                            style={{ gridColumn: isEuropeActive ? '1 / -1' : '1' }}> Europe </button>
                    
                        {isEuropeActive && europeSites.map((site, rowIndex) => {
                        let lastEntry = [null, null, null, null];
                        let isCurrent = false;
                        
                        return (
                            <React.Fragment key={site.datacenter_id}>
                                <div className={styles.siteLocationIDContainer}
                                     style={{ animationDelay: `${rowIndex * 60}ms` }}>
                                    <div className={styles.siteLocation}> {site.city}, {site.country} </div>
                                    <div className={styles.siteID}> {site.datacenter_id} </div>
                                </div>

                                {timelineDate.map((col, colIndex) => {
                                    const entry = site.date.find(d => d.quarter === col.quarter && d.year === col.year)
                                    const hasEntry = !!entry;
                                    

                                    if (hasEntry) {
                                        lastEntry[0] = entry.type;
                                        lastEntry[1] = entry.power;
                                    }

                                    if (col.quarter === CURRENT_QUARTER && col.year === CURRENT_YEAR) {
                                        isCurrent = true;
                                    } else {
                                        isCurrent = false;
                                    }

                                    return (
                                            <div className={`${styles.dataCell} 
                                                             ${lastEntry[0] === "actual" ? styles.active : 
                                                               lastEntry[0] === "target" ? styles.target :
                                                               lastEntry[0] === "announced" ? styles.announced:
                                                                             styles.empty}
                                                             ${isCurrent && lastEntry[0] == "actual" ? styles.currentActive :
                                                               isCurrent && lastEntry[0] == "target" ? styles.currentTarget : 
                                                               isCurrent && lastEntry[0] == "announced" ? styles.currentAnnounced : 
                                                               ""}` 
                                                                             
                                                        }
                                                        style={{ animationDelay: `${(rowIndex + colIndex) * 38}ms` }}
                                                        >
                                                {lastEntry[1]}
                                            </div>
                                    )
                                })}
                            </React.Fragment>
                        );

                        })}  

                    {/* Europe Region Level View */}
                    {!isEuropeActive && timelineDate.map((col) => {

                        let isCurrent = col.quarter === CURRENT_QUARTER && col.year === CURRENT_YEAR;
                        let finalColumnType = "";
                        let isAnnounced = 0, isActual = 0, isTarget = 0;
                        
                        europeSites.forEach((site, i) => {
                            const entry = site.date.find(d => d.quarter === col.quarter && d.year === col.year);

                            if (entry && entry.power !== "?") {
                            lastEuropeQuarterTotals[i] = entry.power; //insert all entries for a quarter
                            }

                            if (!entry) {
                                //no change
                            } else {
                                lastEuropeQuarterTypes[i] = entry.type;
                            }
    
                        });

                        for (let i = 0; i < lastEuropeQuarterTypes.length; i++ ){
                            if (lastEuropeQuarterTypes[i] === "announced"){
                                isAnnounced = 1;
                            } else if (lastEuropeQuarterTypes[i] === "actual") {
                                isActual = 1;
                            } else if (lastEuropeQuarterTypes[i] === "target") {
                                isTarget = 1;
                            }
                        } 

                        //if all entries are 0 and no announced, we make it blank...
                        //if all entries are 0 and there is announced, we make it announced...
                        //if entries and there is target, we  make all the rest target 

                        if (isAnnounced === 0 && isActual === 0 && isTarget === 0) {
                            finalColumnType = "";
                        } else if (isAnnounced === 1 && isActual === 0 && isTarget === 0) {
                            finalColumnType = "announced";
                        } else if (isTarget === 1) {
                            finalColumnType = "target";
                        } else if (isActual === 1 ) {
                            finalColumnType ="actual";
                        }


                        const regionTotal = lastEuropeQuarterTotals
                        .filter(val => val !== "—" && val !== "?" && val !== "" && !isNaN(Number(val)))
                        .reduce((sum, val) => sum + Number(val), 0);

                        return (
                            <div key={`${col.quarter}-${col.year}`} className={`${styles.dataCell}
                                ${finalColumnType === "" ? "" : 
                                finalColumnType === "announced"  ? styles.announced : 
                                finalColumnType === "actual" ? styles.active :
                                finalColumnType === "target" ? styles.target : ""}
                                
                                ${finalColumnType === "" ? "" : 
                                finalColumnType === "announced" && isCurrent === true ? styles.currentAnnounced : 
                                finalColumnType === "actual" && isCurrent === true ? styles.currentActive :
                                finalColumnType === "target" && isCurrent === true ? styles.currentTarget : ""}
                                
                                `}>

                            {regionTotal === 0 && isAnnounced == 0 ? "" :
                            regionTotal === 0 && isAnnounced == 1 ? "-" : regionTotal}
                            </div>
                        );
                    })}              

                     {/* Middle East */}
                    <button className={styles.regionContainer} 
                            onClick={()=> {setMiddleEastActive((prev) => !prev)}}
                            style={{ gridColumn: isMiddleEastActive ? '1 / -1' : "1"}}> Middle East </button>
                    
                        {isMiddleEastActive && middleEastSites.map((site, rowIndex) => {
                        let lastEntry = [null, null, null, null];
                        let isCurrent = false;
                        
                        return (
                            <React.Fragment key={site.datacenter_id}>
                                <div className={styles.siteLocationIDContainer}
                                     style={{ animationDelay: `${rowIndex * 60}ms` }}>
                                    <div className={styles.siteLocation}> {site.city}, {site.country} </div>
                                    <div className={styles.siteID}> {site.datacenter_id} </div>
                                </div>

                                {timelineDate.map((col, colIndex) => {
                                    const entry = site.date.find(d => d.quarter === col.quarter && d.year === col.year)
                                    const hasEntry = !!entry;
                                    

                                    if (hasEntry) {
                                        lastEntry[0] = entry.type;
                                        lastEntry[1] = entry.power;
                                    }

                                    if (col.quarter === CURRENT_QUARTER && col.year === CURRENT_YEAR) {
                                        isCurrent = true;
                                    } else {
                                        isCurrent = false;
                                    }

                                    return (
                                            <div className={`${styles.dataCell} 
                                                             ${lastEntry[0] === "actual" ? styles.active : 
                                                               lastEntry[0] === "target" ? styles.target :
                                                               lastEntry[0] === "announced" ? styles.announced:
                                                                             styles.empty}
                                                             ${isCurrent && lastEntry[0] == "actual" ? styles.currentActive :
                                                               isCurrent && lastEntry[0] == "target" ? styles.currentTarget : 
                                                               isCurrent && lastEntry[0] == "announced" ? styles.currentAnnounced : 
                                                               ""}`                  
                                                        }
                                                 style={{ animationDelay: `${(rowIndex + colIndex) * 38}ms` }}>
                                                {lastEntry[1]}
                                            </div>
                                    )
                                })}
                            </React.Fragment>
                        );


                        })}   

                    {/* MiddleEast Region Level View */}
                    {!isMiddleEastActive && timelineDate.map((col) => {

                        let isCurrent = col.quarter === CURRENT_QUARTER && col.year === CURRENT_YEAR;
                        let finalColumnType = "";
                        let isAnnounced = 0, isActual = 0, isTarget = 0;
                        
                        middleEastSites.forEach((site, i) => {
                            const entry = site.date.find(d => d.quarter === col.quarter && d.year === col.year);

                            if (entry && entry.power !== "?") {
                            lastMiddleEastQuarterTotals[i] = entry.power; //insert all entries for a quarter
                            }

                            if (!entry) {
                                //no change
                            } else {
                                lastMiddleEastQuarterTypes[i] = entry.type;
                            }
    
                        });

                        for (let i = 0; i < lastMiddleEastQuarterTypes.length; i++ ){
                            if (lastMiddleEastQuarterTypes[i] === "announced"){
                                isAnnounced = 1;
                            } else if (lastMiddleEastQuarterTypes[i] === "actual") {
                                isActual = 1;
                            } else if (lastMiddleEastQuarterTypes[i] === "target") {
                                isTarget = 1;
                            }
                        } 

                        //if all entries are 0 and no announced, we make it blank...
                        //if all entries are 0 and there is announced, we make it announced...
                        //if entries and there is target, we  make all the rest target 

                        if (isAnnounced === 0 && isActual === 0 && isTarget === 0) {
                            finalColumnType = "";
                        } else if (isAnnounced === 1 && isActual === 0 && isTarget === 0) {
                            finalColumnType = "announced";
                        } else if (isTarget === 1) {
                            finalColumnType = "target";
                        } else if (isActual === 1 ) {
                            finalColumnType ="actual";
                        }


                        const regionTotal = lastMiddleEastQuarterTotals
                        .filter(val => val !== "—" && val !== "" && !isNaN(Number(val)))
                        .reduce((sum, val) => sum + Number(val), 0);

                        return (
                            <div key={`${col.quarter}-${col.year}`} className={`${styles.dataCell}
                                ${finalColumnType === "" ? "" : 
                                finalColumnType === "announced"  ? styles.announced : 
                                finalColumnType === "actual" ? styles.active :
                                finalColumnType === "target" ? styles.target : ""}
                                
                                ${finalColumnType === "" ? "" : 
                                finalColumnType === "announced" && isCurrent === true ? styles.currentAnnounced : 
                                finalColumnType === "actual" && isCurrent === true ? styles.currentActive :
                                finalColumnType === "target" && isCurrent === true ? styles.currentTarget : ""}`}>

                                {regionTotal === 0 && isAnnounced == 0 ? "" :
                                regionTotal === 0 && isAnnounced == 1 ? "-" : regionTotal}

                            </div>
                        );
                    })}       

                    <div className={`${styles.axisLabelSpacer} ${styles.totalContainerLabel} `}
                                      style={{ animationDelay: `${38}ms` }}>
                        <div className={styles.totalOverscoreTotal}></div>
                        <div className={styles.totalMWLabel}> Total MW </div>
                        </div>       

                    {timelineDate.map((col, colIndex)=> {
                        let isCurrent = col.quarter === CURRENT_QUARTER && col.year === CURRENT_YEAR;
                        let regionTotal = 0;

                        nebiusSites.forEach((site, i)=> {
                            const entry = site.date.find(d => d.quarter === col.quarter && d.year === col.year);
                            
                            //If we have an active entry or target entry, we add it to the corresponding site index. Otherwise nothing happens and we carry forward
                            if (entry && entry.power != "-") {
                                lastOverallQuarterTotals[i] = entry.power;
                            }  
                        })

                        for (let i = 0; i < lastOverallQuarterTotals.length; i++) {
                            regionTotal += lastOverallQuarterTotals[i];
                        }

                        return (
                            <div className={styles.totalContainer}
                                           style={{ animationDelay: `${colIndex * 38}ms` }}> 
                                <div className={isCurrent ? styles.overscoreCurrent : styles.overscore}> </div>
                                <div className={isCurrent ? styles.totalValueCurrent : styles.totalValue}> {regionTotal} </div>
                            </div>
                        );

                    })}
                </div>

            </div>

        </>
    );

}