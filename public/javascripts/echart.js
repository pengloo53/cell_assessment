/**
 * Created by 118663 on 2017/2/15.
 */
// 根据data直接渲染chart
function refreshChart(data1,data2){
  var myChart = echarts.init(document.getElementById('echarts_main'));
  myChart.setOption({
    title: {
      text: '减分占比图表',
      // subtext: subtext,
      x: 'center'
    },
    tooltip: {
      trigger: 'item',
      formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
      orient: 'vertical',
      left: 'left',
      data: data1
    },
    series: [
      {
        name: '减分类型占比',
        type: 'pie',
        radius: '50%',
        center: ['50%', '50%'],
        data: data2,
        itemStyle: {
          emphasis: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  });
}