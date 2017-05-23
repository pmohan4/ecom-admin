export const PAGES_MENU = [
  {
    path: 'pages',
    children: [
      {
        path: 'dashboard',
        data: {
          menu: {
            title: 'general.menu.dashboard',
            icon: 'ion-android-home',
            selected: false,
            expanded: false,
            order: 0
          }
        }
      },{
        path: 'pages',
        data: {
          menu: {
            title: 'Catalog',
            icon: 'ion-document',
            selected: false,
            expanded: false,
            order: 650,
          }
        },
        children: [
          {
            path: ['categoryList'],
            data: {
              menu: {
                title: 'Category',
                selected: false,
                expanded: false,
              }
            }
          },
          {
            path: ['products'],
            data: {
              menu: {
                title: 'Product'
              }
            }
          },
          {
            path: ['productOptionsTable'],
            data: {
              menu: {
                title: 'Product Options',
                selected: false,
                expanded: false,
              }
            }
          }
        ]
      }
    ]
  }
];
