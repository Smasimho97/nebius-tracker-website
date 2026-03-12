import styles from "./DatacenterTimeline.module.css";
import SiteHeader from "../components/Header/TimelineHeader/TimelineHeader.jsx";
import Timeline from "../components/Timeline/Timeline.jsx";

export default function DatacenterTimeline() {
  return (
    <>
      <SiteHeader />
      <div className={styles.timelineContainer}>
        <Timeline />
      </div>
    </>
  );
}
