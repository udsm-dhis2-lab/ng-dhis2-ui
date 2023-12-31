import { Card } from '@dhis2-ui/card';
import { InputField } from '@dhis2-ui/input';
import { useConfig } from '@dhis2/app-runtime';
import { colors, spacers, theme } from '@dhis2/ui-constants';
import { IconApps24, IconSettings24 } from '@dhis2/ui-icons';
import PropTypes from 'prop-types';
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { joinPath } from './join-path';
import i18n from '@dhis2/d2-i18n';
declare module 'react' {
  interface StyleHTMLAttributes<T> extends React.HTMLAttributes<T> {
    jsx?: boolean;
    global?: boolean;
  }
}

/**
 * Copied from here:
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions#Escaping
 */
function escapeRegExpCharacters(text: string) {
  return text.replace(/[/.*+?^${}()|[\]\\]/g, '\\$&');
}

function Search({ value, onChange, baseUrl }: any) {
  return (
    <div className="headerbar-apps-search">
      <span className="headerbar-apps-search-input">
        <InputField
          value={value}
          name="filter"
          placeholder={i18n.t('Search apps')}
          onChange={onChange}
          initialFocus
        />
      </span>

      <span className="headerbar-apps-search-icon">
        <a href={joinPath(baseUrl, 'dhis-web-menu-management')}>
          <IconSettings24 color={colors.grey700} />
        </a>
      </span>

      <style jsx>{`
        .headerbar-apps-search {
          display: flex;
          flex-direction: row;
          flex-wrap: nowrap;
          height: 52px;
          margin: 8px;
        }

        .headerbar-apps-search-input {
          flex: 1 100%;
        }

        .headerbar-apps-search-icon {
          flex: 1 auto;
          margin: 8px;
        }
      `}</style>
    </div>
  );
}

Search.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  baseUrl: PropTypes.string,
};

function Item({ name, path, img }: any) {
  return (
    <a className="headerbar-app-item" href={path}>
      <img className="headerbar-app-item-logo" src={img} alt="app logo" />

      <div className="headerbar-app-item-title">{name}</div>

      <style jsx>{`
        .headerbar-app-item {
          display: flex;
          flex-direction: column;
          -webkit-box-align: center;
          align-items: center;
          -webkit-box-pack: center;
          justify-content: center;
          width: 96px;
          margin: 8px;
          border-radius: 12px;
          text-decoration: none;
          cursor: pointer;
        }
        .headerbar-app-item-logo {
          display: inline-block;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          width: 96px;
          margin: 8px;
          border-radius: 12px;
          text-decoration: none;
          cursor: pointer;
        }

        .headerbar-app-item-logo:hover,
        .headerbar-app-item-logo:focus {
          background-color: ${theme.primary050};
          cursor: pointer;
        }

        .headerbar-app-item-logo:hover > div {
          font-weight: 500;
          cursor: pointer;
        }

        .headerbar-app-item-logo {
          width: 48px;
          height: 48px;
          margin: 8px;
          cursor: pointer;
        }

        .headerbar-app-item-title {
          overflow-wrap: anywhere;
          margin-top: 14px;
          color: rgba(0, 0, 0, 0.87);
          font-size: 12px;
          letter-spacing: 0.01em;
          line-height: 14px;
          text-align: center;
          cursor: pointer;
        }
      `}</style>
    </a>
  );
}

Item.propTypes = {
  img: PropTypes.string,
  name: PropTypes.string,
  path: PropTypes.string,
};

function List({ apps, filter }: any) {
  return (
    <div
      className="headerbar-apps-menu-list"
      data-test="headerbar-apps-menu-list"
    >
      {apps
        .filter(({ displayName, name }: any) => {
          const appName = displayName || name;
          const formattedAppName = appName.toLowerCase();
          const formattedFilter = escapeRegExpCharacters(filter).toLowerCase();

          return filter.length > 0
            ? formattedAppName.match(formattedFilter)
            : true;
        })
        .map(({ displayName, name, defaultAction, icon }: any, idx: string) => (
          <Item
            key={`app-${name}-${idx}`}
            name={displayName || name}
            path={defaultAction}
            img={icon}
          />
        ))}

      <style jsx>{`
        .headerbar-apps-menu-list {
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          align-content: flex-start;
          align-items: flex-start;
          justify-content: flex-start;
          width: 30vw;
          min-width: 300px;
          max-width: 560px;

          min-height: 200px;
          max-height: 465px;
          margin: 0 8px 8px 8px;

          overflow: auto;
          overflow-x: hidden;
        }
      `}</style>
    </div>
  );
}
List.propTypes = {
  apps: PropTypes.array,
  filter: PropTypes.string,
};

const AppMenu = ({ apps, filter, onFilterChange, baseUrl }: any) => (
  <div className="headerbar-apps-menu" data-test="headerbar-apps-menu">
    <Card>
      <Search value={filter} onChange={onFilterChange} baseUrl={baseUrl} />
      <List apps={apps} filter={filter} />
    </Card>

    <style jsx>{`
      .headerbar-apps-menu {
        z-index: 10000;
        position: absolute;
        right: -4px;
      }
    `}</style>
  </div>
);

AppMenu.propTypes = {
  apps: PropTypes.array.isRequired,
  onFilterChange: PropTypes.func.isRequired,
  filter: PropTypes.string,
  baseUrl: PropTypes.string,
};

const Apps = ({ apps, baseUrl }: any) => {
  const [show, setShow] = useState(false);
  const [filter, setFilter] = useState('');

  const handleVisibilityToggle = useCallback(() => setShow(!show), [show]);
  const handleFilterChange = useCallback(
    ({ value }: any) => setFilter(value),
    []
  );

  const containerEl = useRef(null);
  const onDocClick = useCallback((evt: any) => {
    if (
      containerEl.current &&
      !(containerEl.current as any).contains(evt.target)
    ) {
      setShow(false);
    }
  }, []);
  useEffect(() => {
    document.addEventListener('click', onDocClick);
    return () => document.removeEventListener('click', onDocClick);
  }, [onDocClick]);

  return (
    <div
      className="headerbar-apps"
      ref={containerEl}
      data-test="headerbar-apps"
    >
      <button onClick={handleVisibilityToggle} data-test="headerbar-apps-icon">
        <IconApps24 color={colors.white} />
      </button>

      {show ? (
        <AppMenu
          apps={apps}
          filter={filter}
          baseUrl={baseUrl}
          onFilterChange={handleFilterChange}
        />
      ) : null}

      <style jsx>{`
        .headerbar-apps button {
          display: block;
          background: transparent;
          padding: ${spacers.dp4} ${spacers.dp12} 0;
          border: 0;
          cursor: pointer;
          height: 100%;
        }
        .headerbar-apps button:focus {
          outline: 2px solid white;
          outline-offset: -2px;
        }
        .headerbar-apps button:focus:not(:focus-visible) {
          outline: none;
        }
        .headerbar-apps button:hover {
          background: #1a557f;
        }
        .headerbar-apps button:active {
          background: #104067;
        }

        .headerbar-apps {
          position: relative;
          height: 100%;
        }
      `}</style>
    </div>
  );
};

Apps.propTypes = {
  apps: PropTypes.array.isRequired,
  baseUrl: PropTypes.string,
};

export default Apps;
