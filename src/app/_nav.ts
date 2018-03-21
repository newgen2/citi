export const navigation = [
  {
    title: true,
    name: 'Quick Links'
  },
  /*{
    name: 'Dashboard',
    url: '/dashboard',
    icon: 'icon-speedometer',
    
  },*/
  {
    name: 'Dashboard',
    url: '',
    icon: 'icon-pie-chart',
    children: [
      // {
      //   name: 'Settlement Dashboard',
      //   url: '/settlementDashboard',
      //   icon: 'icon-pie-chart'
      // },
      {
        name: 'Onboarding Dashboard',
        url: '/onboardingDashboard',
        icon: 'icon-pie-chart'
      }
    ]
    
  },

  /*{
    name: 'Trade Settlement Report',
    url: '/components',
    icon: 'icon-puzzle',
    children: [
      {
        name: 'DTC',
        url: '/components/forms',
        icon: 'icon-puzzle'
      }]
  },*/
  
  {
    name: 'Maintenance',
    url: '/pages',
    icon: 'icon-star',
    children: [
      // {
      //   name: 'Link Trades',
      //   url: '',
      //   icon: 'icon-star'
      // },
      {
        name: 'User Preferences',
        url: '/userpref',
        icon: 'icon-user'
      }
    ]
  },
  {
    name: 'Snapshots',
    url: '/SnapShots',
    icon: 'icon-chart',
    children: [
      {
        name: 'Report',
        url: '/report',
        icon: 'icon-star'
      },
      {
        name: 'Snapshots',
        url: '/SnapShots',
        icon: 'icon-star'
      }
    ]
  }
];
