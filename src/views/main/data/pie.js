export default {
  title: {
    text: 'Доля успешных интервью',
    x: 'center'
  },
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b} : {c} ({d}%)'
  },
  legend: {
    orient: 'vertical',
    left: 'left',
    data: ['СЕО', 'секретарь', 'программист']
  },
  series: [
    {
      name: 'Доля отвеченных интервью',
      type: 'pie',
      radius: '55%',
      center: ['50%', '60%'],
      data: [
        {value: 335, name: 'СЕО'},
        {value: 310, name: 'секретарь'},
        {value: 234, name: 'программист'}
      ],
      itemStyle: {
        emphasis: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }
  ]
}
