import { axios, storage } from '../utils';

const state = {
  session: storage.get('session_info') || {},
  user: null,
  company: null
  //
  // header: {
  //   name: 'VI HR',
  //
  //   menus: [
  //     {
  //       text: '0',
  //       icon: 'bubble',
  //       name: 'responds'
  //     },
  //     // Component Pages
  //     {
  //       text: 'Components',
  //       icon: 'lab',
  //       name: 'components',
  //       children: [
  //         {text: 'Icons', name: '/'},
  //         {text: 'Button', name: '/'},
  //         {text: 'Table', name: 'components-table'}
  //       ]
  //     },
  //     // Demo Pages
  //     {
  //       text: 'Демо',
  //       icon: 'magic-wand',
  //       name: 'demo',
  //       children: [
  //         {text: 'Video Interview', name: 'demo-data'}
  //       ]
  //     }
  //   ]
  // },
  //
  // sidebar: {
  //
  //   collapse: storage.get('sidebar_collapse'),
  //
  //   menus: [
  //     {
  //       title: ''
  //     },
  //     {
  //       text: 'Статистика',
  //       icon: 'meter',
  //       name: 'dashboard'
  //     },
  //     {
  //       divider: true
  //     },
  //     {
  //       text: 'Вакансии',
  //       icon: 'pushpin',
  //       name: 'vacancies',
  //       params: {type: 'vacancy'}
  //     },
  //     {
  //       divider: true
  //     },
  //     {
  //       text: 'Пользователи',
  //       icon: 'users',
  //       name: 'users'
  //     },
  //     {
  //       text: 'Ревью',
  //       icon: 'bubbles',
  //       name: 'responds'
  //     },
  //     {
  //       divider: true
  //     },
  //     {
  //       text: 'Настройки',
  //       icon: 'equalizer',
  //       name: 'settings',
  //       params: {type: 'general'}
  //     }
  //   ]
  // }
};

if (state.session && state.session.token) {
  // init axios headers
  axios.defaults.headers.Authorization = `Bearer ${state.session.token}`;
}

export default state;
