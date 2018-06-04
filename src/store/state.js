import { axios, storage } from '../utils';

const state = {
  session: storage.get('wedn_net_session_info') || {},

  header: {
    /**
     * 站点名称
     * @type {String}
     */
    name: 'VI HR',

    /**
     * 顶部菜单
     * @type {Array}
     */
    menus: [
      {
        text: '0',
        icon: 'bubble',
        name: 'responds'
      },
      // Component Pages
      {
        text: 'Components',
        icon: 'lab',
        name: 'components',
        children: [
          {text: 'Icons', name: 'components-icons'},
          {text: 'Button', name: 'components-button'},
          {text: 'Table', name: 'components-table'}
        ]
      },
      // Demo Pages
      {
        text: 'Демо',
        icon: 'magic-wand',
        name: 'demo',
        children: [
          {text: 'Video Interview', name: 'demo-data'}
        ]
      }
    ]
  },

  /**
   * 侧边导航栏
   * @type {Object}
   */
  sidebar: {
    /**
     * 版权所属
     * @type {String}
     */
    copyright: 'vi-hr.com',

    /**
     * 是否收起边栏
     * @type {Boolean}
     */
    collapse: storage.get('wedn_net_sidebar_collapse'),

    /**
     * 侧边菜单
     * @type {Array}
     */
    menus: [
      {
        title: ''
      },
      {
        text: 'Статистика',
        icon: 'meter',
        name: 'dashboard'
      },
      {
        divider: true
      },
      {
        text: 'Вакансии',
        icon: 'pushpin',
        name: 'vacancies',
        params: {type: 'vacancy'}
      },
      {
        divider: true
      },
      {
        text: 'Пользователи',
        icon: 'users',
        name: 'users'
      },
      {
        text: 'Ревью',
        icon: 'bubbles',
        name: 'responds'
      },
      {
        divider: true
      },
      {
        text: 'Настройки',
        icon: 'equalizer',
        name: 'settings',
        params: {type: 'general'}
      }
    ]
  },

  // ==================== DEMO ====================

  /**
   * 计数器
   * @type {Number}
   */
  count: storage.get('wedn_net_demo_count') || 0
};

if (state.session && state.session.token) {
  // init axios headers
  axios.defaults.headers.Authorization = `Bearer ${state.session.token}`;
}

export default state;
