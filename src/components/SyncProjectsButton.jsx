import React, { useState } from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import './SyncProjectsButton.css';

export default function SyncProjectsButton() {
  const [isSyncing, setIsSyncing] = useState(false);
  const [message, setMessage] = useState('');
  const { siteConfig } = useDocusaurusContext();

  const handleSync = async () => {
    setIsSyncing(true);
    setMessage('Syncing projects...');
    
    try {
      // Try to call the sync API endpoint if available
      const response = await fetch('http://localhost:3001/api/sync-projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setMessage('✅ Projects synced successfully! Refreshing...');
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      } else {
        throw new Error('Sync endpoint not available');
      }
    } catch (error) {
      // Fallback: Show instructions and refresh
      setMessage('ℹ️ Auto-discovery runs on page load. Refreshing...');
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
  };

  return (
    <div style={{ margin: '20px 0', padding: '15px', background: 'var(--ifm-color-emphasis-100)', borderRadius: '8px', border: '1px solid var(--ifm-color-emphasis-300)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
        <button
          onClick={handleSync}
          disabled={isSyncing}
          style={{
            padding: '10px 20px',
            backgroundColor: 'var(--ifm-color-primary)',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: isSyncing ? 'not-allowed' : 'pointer',
            fontSize: '14px',
            fontWeight: '600',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            transition: 'opacity 0.2s',
            opacity: isSyncing ? 0.7 : 1,
          }}
          onMouseOver={(e) => {
            if (!isSyncing) {
              e.target.style.opacity = '0.9';
            }
          }}
          onMouseOut={(e) => {
            if (!isSyncing) {
              e.target.style.opacity = '1';
            }
          }}
        >
          {isSyncing ? (
            <>
              <span style={{ display: 'inline-block', animation: 'spin 1s linear infinite' }}>⟳</span>
              Syncing...
            </>
          ) : (
            <>
              <span>🔄</span>
              Sync Projects
            </>
          )}
        </button>
        
        {message && (
          <span style={{ 
            color: message.includes('Error') ? 'var(--ifm-color-danger)' : 'var(--ifm-color-success)',
            fontSize: '14px'
          }}>
            {message}
          </span>
        )}
        
        <span style={{ 
          fontSize: '12px', 
          color: 'var(--ifm-color-emphasis-600)',
          marginLeft: 'auto'
        }}>
          Auto-discovery runs on page load. Click to manually refresh projects.
        </span>
      </div>
    </div>
  );
}

