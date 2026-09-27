'use client';

import { useEffect } from 'react';
import { initTramRide } from '@/lib/tram-engine';

export default function TramRide() {
  useEffect(() => {
    let cleanup: (() => void) | undefined;
    try {
      cleanup = initTramRide();
    } catch (err) {
      console.error('Error starting Linha 31 tram:', err);
    }
    return () => {
      if (cleanup) {
        cleanup();
      }
    };
  }, []);

  return (
    <div className="relative w-full h-full overflow-hidden select-none">
      <canvas
        id="scene"
        aria-label="A yellow tram drives an endless hillside street of tiled houses, cobbles and trees"
      />
      <div className="paper" aria-hidden="true" />
      <div className="grain" id="grain" aria-hidden="true" />

      <header className="hud">
        <div className="rollsign" aria-label="Route 31">
          <span className="dest" id="dest">
            Miradouro
          </span>
          <span className="num">31</span>
        </div>
        <section className="plaque stop" aria-label="Next stop">
          <p className="lbl" id="stopLabel">
            Next stop
          </p>
          <p className="name" id="stopName">
            Largo das Laranjeiras
          </p>
          <p className="meta">
            <span id="stopDist">0 m ahead</span>
            <span id="grade">Level</span>
            <span id="odo">0.00 km</span>
            <span id="served">0 stops</span>
          </p>
        </section>
      </header>

      <aside className="status" aria-label="Conditions">
        <div className="chips">
          <span className="chip" id="chipSeason">
            <span id="icSeason" />
            <span id="seasonTxt">Autumn</span>
          </span>
          <span className="chip" id="chipTime">
            <span id="icTime" />
            <span id="timeTxt">Afternoon</span>
          </span>
          <span className="chip" id="chipWeather">
            <span id="icWeather" />
            <span id="weatherTxt">Clear</span>
          </span>
          <span className="chip" id="chipPlace" hidden>
            <span id="placeTxt" />
          </span>
          <span className="chip hot" id="chipAuto" hidden>
            Autopilot
          </span>
          <div className="info-wrap">
            <button
              className="info"
              id="infoBtn"
              aria-label="Show controls"
              aria-expanded="false"
              aria-controls="help"
            >
              i
            </button>
            <div className="plaque help" id="help" role="tooltip">
              <h2>Driving Linha 31</h2>
              <dl>
                <dt>
                  <kbd>W</kbd> <kbd>&uarr;</kbd>
                </dt>
                <dd>Power</dd>
                <dt>
                  <kbd>S</kbd> <kbd>&darr;</kbd>
                </dt>
                <dd>Brake, keep holding when stopped to reverse</dd>
                <dt>
                  <kbd>A</kbd> <kbd>D</kbd>
                </dt>
                <dd>Look left and right</dd>
                <dt>
                  <kbd>Q</kbd> <kbd>E</kbd>
                </dt>
                <dd>Pick the left or right branch at a junction</dd>
                <dt>
                  <kbd>Space</kbd>
                </dt>
                <dd>Ring the bell</dd>
                <dt>
                  <kbd>V</kbd>
                </dt>
                <dd>Change the view</dd>
                <dt>
                  <kbd>C</kbd>
                </dt>
                <dd>Autopilot</dd>
                <dt>
                  <kbd>N</kbd> <kbd>T</kbd> <kbd>F</kbd>
                </dt>
                <dd>Season, time of day, weather</dd>
                <dt>
                  <kbd>M</kbd>
                </dt>
                <dd>Sound</dd>
              </dl>
              <p>
                Stop within 4 m of a yellow curb to open the doors. Seasons, time and
                weather change on their own as you travel.
              </p>
            </div>
          </div>
        </div>
        <ol className="notices" id="notices" aria-live="polite" />
      </aside>

      <div className="plaque jn" id="jn" hidden>
        <p id="jnTitle">Junction ahead</p>
        <div className="opts">
          <button id="jnLeft" aria-pressed="true">
            <kbd>Q</kbd> &larr; <span id="jnL">Castelo</span>
          </button>
          <button id="jnRight" aria-pressed="false">
            <span id="jnR">Graça</span> &rarr; <kbd>E</kbd>
          </button>
        </div>
      </div>

      <nav className="deck" aria-label="Tram controls">
        <div className="drive">
          <button
            className="pedal"
            id="brake"
            aria-label="Brake. Hold to slow down, keep holding when stopped to reverse"
          >
            Brake<kbd>S</kbd>
          </button>
          <div className="dialbox">
            <div className="dial">
              <svg id="dialSvg" viewBox="0 0 200 200" aria-hidden="true" />
              <div className="read">
                <output id="speed" aria-live="off">
                  0
                </output>
                <span className="unit">km/h</span>
              </div>
            </div>
            <span className="state" id="driveState">
              Parked
            </span>
          </div>
          <button className="pedal go" id="go" aria-label="Go. Hold to accelerate">
            Go<kbd>W</kbd>
          </button>
        </div>
        <span className="sep" aria-hidden="true" />
        <div className="keys">
          <button
            className="key"
            id="kBell"
            data-tip="Ring bell (Space)"
            aria-label="Ring bell (Space)"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M6 16V11a6 6 0 0 1 12 0v5l1.5 2h-15z" />
              <path d="M10 20a2 2 0 0 0 4 0" />
            </svg>
            <span className="kv" id="vBell">
              bell
            </span>
          </button>
          <button
            className="key"
            id="kView"
            data-tip="Change view (V)"
            aria-label="Change view (V)"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 8h3l2-3h6l2 3h3v11H4z" />
              <circle cx="12" cy="13" r="3.5" />
            </svg>
            <span className="kv" id="vView">
              ahead
            </span>
          </button>
          <button
            className="key"
            id="kAuto"
            data-tip="Autopilot (C)"
            aria-label="Autopilot (C)"
            aria-pressed="false"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="8" />
              <path d="M12 12l4-3M12 4v2M20 12h-2M12 20v-2M4 12h2" />
            </svg>
            <span className="kv" id="vAuto">
              off
            </span>
          </button>
          <button
            className="key"
            id="kSeason"
            data-tip="Season (N)"
            aria-label="Season (N)"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 19C5 10 11 5 20 4c-1 9-6 15-15 15z" />
              <path d="M5 19l8-8" />
            </svg>
            <span className="kv" id="vSeason">
              auto
            </span>
          </button>
          <button
            className="key"
            id="kTime"
            data-tip="Time of day (T)"
            aria-label="Time of day (T)"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="8" />
              <path d="M12 7v5l3 2" />
            </svg>
            <span className="kv" id="vTime">
              auto
            </span>
          </button>
          <button
            className="key"
            id="kWeather"
            data-tip="Weather (F)"
            aria-label="Weather (F)"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M7 17h10a4 4 0 0 0 0-8 6 6 0 0 0-11.5 1.5A3.5 3.5 0 0 0 7 17z" />
            </svg>
            <span className="kv" id="vWeather">
              auto
            </span>
          </button>
          <button
            className="key"
            id="kSound"
            data-tip="Sound (M)"
            aria-label="Sound (M)"
            aria-pressed="false"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 10h4l5-4v12l-5-4H4z" />
              <path d="M16 9a4 4 0 0 1 0 6M18.5 6.5a8 8 0 0 1 0 11" />
            </svg>
            <span className="kv" id="vSound">
              off
            </span>
          </button>
          <button
            className="key"
            id="kInfo"
            data-tip="All controls"
            aria-label="All controls"
            aria-controls="help"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="8" />
              <path d="M12 11v5M12 8h.01" />
            </svg>
            <span className="kv" id="vInfo">
              help
            </span>
          </button>
        </div>
      </nav>
    </div>
  );
}
