/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  tutorialSidebar: [
    {
      type: 'doc',
      id: 'index',
      label: 'Dashboard',
    },
    {
      type: 'doc',
      id: 'rules-and-guidelines',
      label: 'Rules & Guidelines',
    },
    {
      type: 'doc',
      id: 'discovery-settings',
      label: 'Discovery Settings',
    },
    {
      type: 'category',
      label: 'Projects',
      items: [
        'projects/project-template',
        'projects/atok-planner',
        'projects/banyan',
        'projects/banyan-wellness-app',
        'projects/big-sports-backend',
        'projects/bigsports',
        'projects/bigsports-nfc-server',
        'projects/bonderud',
        'projects/bounderulaw-api',
        'projects/create-a-project-spec',
        'projects/easteats',
        'projects/event-sphere',
        'projects/event-sphere-solutions',
        'projects/eventsphere-redesign',
        'projects/free-nextjs-admin-dashboard',
        'projects/frontend',
        'projects/legal-assessment',
        'projects/legal-assessment-nextjs',
        'projects/mediterra',
        'projects/motorspost',
        'projects/my-app',
        'projects/my-life-my-story',
        'projects/my-turborepo',
        'projects/mylifemyhappiness',
        'projects/myphotos',
        'projects/n8n-auto-sync',
        'projects/nestingo',
        'projects/permittrak',
        'projects/pg-management',
        'projects/pheonixprime',
        'projects/phoenix-fleet-admin',
        'projects/phoenixprime-driver-app',
        'projects/photonest',
        'projects/portfolio',
        'projects/raichu',
        'projects/raichu-crm',
        'projects/reelage',
        'projects/reelage-api-gateway',
        'projects/reelage-b2b-event-management',
        'projects/reelage-website',
        'projects/s-photonest',
        'projects/shipper-mobile',
        'projects/tenant-frontend',
        'projects/web',
        'projects/sample-project',
],
    },
  ],
};

module.exports = sidebars;
