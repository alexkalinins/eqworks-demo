import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

/**
 * A nav bar for the website.
 * @returns react component
 */
export default function NavBar() {
  const router = useRouter();

  return (
    <div className="navbar">
      <Link href="/">
        <h3 className="welcome">Welcome to EQ Works 😎</h3>
      </Link>
      <div>
        <Link href="/stats">
          <span className={router.pathname == "/stats" ? "active" : ""}>
            Stats
          </span>
        </Link>
        <Link href="/events">
          <span className={router.pathname == "/events" ? "active" : ""}>
            Events
          </span>
        </Link>
        <Link href="/map">
          <span className={router.pathname == "/map" ? "active" : ""}>Map</span>
        </Link>
      </div>
    </div>
  );
}
