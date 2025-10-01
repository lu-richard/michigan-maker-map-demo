import type { IssueReportCardData } from "../types/types";
import styles from '../styles/issueReportCard.module.css';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ScheduleIcon from '@mui/icons-material/Schedule';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

function IssueReportCard({ issueReportCard }: { issueReportCard: IssueReportCardData }) {
    return (
        <div className={styles["report-card"]}>
            <div className={styles["top-info"]}>
                <p className={styles["issue-type"]}>{issueReportCard["issue_type"]}</p>
                <div className={styles["is-resolved"]}>
                    <p className={styles["is-resolved-text"]}>{issueReportCard["is_resolved"] ? "Resolved" : "Unresolved"}</p>
                    {issueReportCard["is_resolved"] ? <CheckIcon /> : <CloseIcon />}
                </div>
            </div>
            <h1 className={styles.title}>{issueReportCard.title}</h1>
            <p>{issueReportCard.description}</p>
            <div className={styles["bottom-info"]}>
                <div className={styles["bottom-info-blurb"]}>
                    <PermIdentityIcon />
                    <p>Submitted by {issueReportCard["reporter_first_name"]} {issueReportCard["reporter_last_name"]}</p>
                </div>
                <div className={styles["bottom-info-blurb"]}>
                    <ScheduleIcon />
                    <p>{issueReportCard["created_at"]}</p>
                </div>
                <div className={styles["bottom-info-blurb"]}>
                    <p className={styles["view-request"]}>View Request</p>
                    <ArrowForwardIcon />
                </div>
            </div>
        </div>
    );
}

export default IssueReportCard;