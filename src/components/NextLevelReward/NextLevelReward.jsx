import { useState } from "react";
import { Gift, LockKeyhole, Sparkles } from "lucide-react";
import LevelRewardCard from "../LevelRewardCard/LevelRewardCard.jsx";
import LevelInfo from "../LevelInfo/LevelInfo.jsx";
import ClosedChest from "./ClosedChest.jsx";
import OpenChest from "./OpenChest.jsx";
import CoinRain from "./CoinRain.jsx";
import styles from "./NextLevelReward.module.css";

function NextLevelReward({ nextLevel, reward, progressPct }) {
  // Reveal on first hover/focus/tap and keep the preview open for the session.
  const [revealed, setRevealed] = useState(false);
  const safeProgress = Math.max(0, Math.min(100, Number(progressPct) || 0));
  const levelLabel = String(nextLevel).padStart(2, "0");

  return (
    <div
      className={`${styles.card} premiumCard ${revealed ? styles.isRevealed : ""}`}
      onMouseEnter={() => setRevealed(true)}
      onFocus={() => setRevealed(true)}
      onClick={() => setRevealed(true)}
    >
      <span className={styles.glowOne} aria-hidden="true" />
      <span className={styles.glowTwo} aria-hidden="true" />
      <span className={styles.gridGlow} aria-hidden="true" />

      <div className={styles.header}>
        <div className={styles.headingGroup}>
          <span className={styles.iconBadge} aria-hidden="true">
            <Gift size={15} strokeWidth={2.3} />
          </span>
          <div>
            <div className={styles.kicker}>MYSTERY REWARD</div>
            <div className={styles.titleRow}>
              <h2 className={styles.title}>Level {levelLabel} Drop</h2>
              <LevelInfo text="The displayed reward is associated with the next level according to the current reward configuration." />
            </div>
          </div>
        </div>

        <span className={styles.lockPill}>
          <LockKeyhole size={12} />
          LOCKED
        </span>
      </div>

      <div className={styles.rewardStrip}>
        <div className={styles.rewardLabel}>
          <Sparkles size={14} />
          <span>Potential reward</span>
        </div>
        <LevelRewardCard reward={reward} size="lg" locked />
      </div>

      <p className={styles.unlockText}>
        Reach <strong>Level {levelLabel}</strong> to reveal your reward.
      </p>

      <div className={`${styles.preview} ${revealed ? styles.revealed : ""}`}>
        <span className={styles.spotlightBeam} aria-hidden="true" />
        <span className={styles.previewRing} aria-hidden="true" />
        <span className={styles.previewRingInner} aria-hidden="true" />
        <span className={styles.pedestal} aria-hidden="true" />
        <span className={styles.chestGround} aria-hidden="true" />
        <span className={`${styles.spark} ${styles.sparkA}`} aria-hidden="true" />
        <span className={`${styles.spark} ${styles.sparkB}`} aria-hidden="true" />
        <span className={`${styles.spark} ${styles.sparkC}`} aria-hidden="true" />
        <span className={`${styles.spark} ${styles.sparkD}`} aria-hidden="true" />
        <ClosedChest className={`${styles.chestArt} ${styles.chestClosed}`} />
        <OpenChest className={`${styles.chestArt} ${styles.chestOpen}`} />
        <span className={styles.chestShimmer} aria-hidden="true" />
        <CoinRain />
        <div className={styles.revealHint}>
          <Sparkles size={13} />
          <span>{revealed ? "Reward preview revealed" : "Hover or tap to preview"}</span>
        </div>
      </div>

      <div className={styles.progressHeader}>
        <div>
          <span className={styles.progressKicker}>LEVEL PROGRESS</span>
          <span className={styles.miniLabel}>Progress to Level {levelLabel}</span>
        </div>
        <span className={styles.miniPct}>{safeProgress}%</span>
      </div>

      <div
        className={`${styles.miniTrack} ${safeProgress >= 75 ? styles.nearComplete : ""}`}
        aria-label={`Progress to level ${nextLevel}: ${safeProgress}%`}
      >
        <div className={styles.miniFill} style={{ width: `${safeProgress}%` }} />
      </div>
    </div>
  );
}

export default NextLevelReward;
