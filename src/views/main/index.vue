<template>
    <div>
        <div class="heading">
            <h1 class="title">Сводная статистика</h1>
        </div>
        <div class="jumbotron">
            <h3 id="bar">
                Количество ответов на вакансии
            </h3>
            <section v-if="expand.bar">
                <figure>
                    <chart
                            :options="bar"
                            :init-options="initOptions"
                            ref="bar"
                            theme="ovilia-green"
                            auto-resize
                    />
                </figure>
            </section>

            <h3 id="pie">
                Доля пройденных интервью
            </h3>
            <section>
                <figure>
                    <chart
                            :options="pie"
                            :init-options="initOptions"
                            ref="pie"
                            auto-resize
                    />
                </figure>
            </section>
        </div>

    </div>
</template>

<script>
  import qs from 'qs';
  import 'echarts/lib/chart/bar';
  import 'echarts/lib/chart/line';
  import 'echarts/lib/chart/pie';
  import 'echarts/lib/chart/radar';
  import 'echarts/lib/chart/scatter';
  import 'echarts/lib/chart/effectScatter';
  import 'echarts/lib/component/tooltip';
  import 'echarts/lib/component/polar';
  import 'echarts/lib/component/legend';
  import 'echarts/lib/component/title';
  import 'echarts/lib/component/dataset';
  import getBar from './data/bar';
  import pie from './data/pie';
  import polar from './data/polar';
  import scatter from './data/scatter';
  // built-in theme
  import 'echarts/theme/dark';
  import ECharts from 'vue-echarts'
  // custom theme
  import theme from './data/theme.json';
  // registering custom theme
  ECharts.registerTheme('ovilia-green', theme);

  export default {
    data() {
      let options = qs.parse(location.search, {ignoreQueryPrefix: true});
      return {
        options,
        bar: getBar(),
        pie,
        polar,
        scatter,
        expand: {
          bar: true,
          pie: true,
          polar: true,
          scatter: true,
          radar: true
        },
        initOptions: {
          renderer: options.renderer || 'canvas'
        },
        polarTheme: 'dark',
        seconds: -1,
        asyncCount: false,
        connected: true,
        metricIndex: 0,
        open: false,
        img: {}
      };
    },
    methods: {
      refresh() {
        // simulating async data from server
        this.seconds = 3;
        let bar = this.$refs.bar;
        bar.showLoading({
          text: 'Загрузка...',
          color: '#4ea397',
          maskColor: 'rgba(255, 255, 255, 0.4)'
        });
        let timer = setInterval(() => {
          this.seconds--;
          if (this.seconds === 0) {
            clearTimeout(timer);
            bar.hideLoading();
            bar.mergeOptions(getBar());
          }
        }, 1000);
      },
      toggleRenderer() {
        if (this.initOptions.renderer === 'canvas') {
          this.initOptions.renderer = 'svg';
        } else {
          this.initOptions.renderer = 'canvas';
        }
      }
    },
    name: 'dashboard',
    created() {
      this.$title('Dashboard');
    }
  };
</script>

<style scoped>

    .echarts {
        height: 300px;
    }

    .inner {
        height: calc(100% - 2rem);
    }

    .jumbotron {
        justify-content: center;
        height: 90%;
        margin: 1rem 1.5rem;
        background-color: #475669;
        border-radius: .5rem;
        color: #fff;
        text-align: center;
    }

    h2 {
        font-size: 4.5rem;
        font-weight: 300;
        line-height: 1.1;
    }

    p {
        font-size: 1.5rem;
    }
</style>
