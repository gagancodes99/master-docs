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
      type: 'category',
      label: 'Projects',
      items: [
        'projects/project-template',
        'projects/raichu',
        'projects/bonderud',
        'projects/mediterra',
        'projects/bigsports',
        'projects/reelage',
        'projects/my-life-my-story',
        'projects/banyan',
        'projects/nestingo',
        'projects/event-sphere',
        'projects/portfolio',
        'projects/pheonixprime',
        'projects/atok-planner',
        'projects/permittrak',
        'projects/motorspost',
        'projects/legal-assessment',
        'projects/sample-project',
      ],
    },
  ],
};

module.exports = sidebars;
