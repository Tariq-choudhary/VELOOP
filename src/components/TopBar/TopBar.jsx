import { useEffect, useRef, useState } from "react";
import { Bell, Menu, X } from "lucide-react";
import { playClick } from "../../utils/audio.js";
import { NAV_ITEMS } from "../navConfig.js";
import { useAuth } from "../../context/AuthContext.jsx";
import styles from "./TopBar.module.css";

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good Morning";
  if (hour < 18) return "Good Afternoon";
  return "Good Evening";
}

function TopBar({ activity = [], onNavigate }) {
  const { user } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [bellOpen, setBellOpen] = useState(false);
  const wrapRef = useRef(null);

  const recent = activity.filter((a) => a.time === "Just now");
  const unread = recent.length;

  useEffect(() => {
    const onDocClick = (event) => {
      if (wrapRef.current && !wrapRef.current.contains(event.target)) {
        setMenuOpen(false);
        setBellOpen(false);
      }
    };
    const onKey = (event) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        setBellOpen(false);
      }
    };
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  const navigate = (key) => {
    playClick();
    setMenuOpen(false);
    onNavigate?.(key);
  };

  return (
    <header ref={wrapRef} className={styles.wrap}>
      <div className={styles.row}>
        <button
          type="button"
          className={styles.menuBtn}
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={menuOpen}
          onClick={() => {
            playClick();
            setMenuOpen((open) => !open);
            setBellOpen(false);
          }}
        >
          {menuOpen ? <X size={18} /> : <Menu size={18} />}
        </button>

        <div className={styles.greeting}>
          <h1 className={styles.greetingTitle}>
            <span>{getGreeting()},</span>{" "}
            <strong>{user?.name || "VELooper"}!</strong>
          </h1>
          <p className={styles.greetingSub}>
            Level up your journey and unlock epic rewards every day.
          </p>
        </div>

        <div className={styles.bellWrap}>
          <button
            type="button"
            className={styles.iconBtn}
            aria-label={`Notifications${unread ? `, ${unread} new` : ""}`}
            aria-expanded={bellOpen}
            onClick={() => {
              playClick();
              setBellOpen((open) => !open);
              setMenuOpen(false);
            }}
          >
            <Bell size={18} />
            {unread > 0 && <span className={styles.badge}>{unread > 9 ? "9+" : unread}</span>}
          </button>

          {bellOpen && (
            <div className={styles.bellPanel} role="dialog" aria-label="Recent notifications">
              <div className={styles.bellPanelHeader}>Notifications</div>
              {recent.length === 0 ? (
                <p className={styles.bellEmpty}>You&apos;re all caught up.</p>
              ) : (
                <ul className={styles.bellList}>
                  {recent.map((item) => (
                    <li key={item.id}>
                      <span className={styles.bellLabel}>{item.label}</span>
                      <span className={styles.bellMeta}>
                        {item.meta || (item.ves ? `+${item.ves} VEs` : `+${item.xp} XP`)}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
      </div>

      {menuOpen && (
        <nav className={styles.drawer} aria-label="Dashboard navigation">
          {NAV_ITEMS.map(({ key, label, icon: Icon }) => (
            <button key={key} type="button" className={styles.drawerItem} onClick={() => navigate(key)}>
              <Icon size={17} />
              <span>{label}</span>
            </button>
          ))}
        </nav>
      )}
    </header>
  );
}

export default TopBar;
