import {
  Component,
  OnInit,
  AfterViewInit,
  ChangeDetectionStrategy,
  ViewEncapsulation
} from "@angular/core";
import { matxAnimations } from "app/shared/animations/matx-animations";
import { ThemeService } from "app/shared/services/theme.service";
import tinyColor from "tinycolor2";
import PerfectScrollbar from "perfect-scrollbar";

@Component({
  selector: "app-analytics-tablet",
  templateUrl: "./analytics-tablet.component.html",
  styleUrls: ["./analytics-tablet.component.scss"],
  animations: matxAnimations,
  encapsulation: ViewEncapsulation.None
})
export class AnalyticsTabletComponent implements OnInit, AfterViewInit {
  trafficVsSaleOptions: any;
  trafficVsSale: any;
  trafficData: any;
  saleData: any;
  topNudgesDashboard: boolean = false;
  allNudgesDashboard: boolean = true;
  topNudgesLimit: number = 50;
  sessionOptions: any;
  sessions: any;
  sessionsData: any;

  trafficGrowthChart: any;
  bounceRateGrowthChart: any;
  height: any
  dailyTrafficChartBar: any;
  trafficSourcesChart: any;
  countryTrafficStats: any[];
  doughNutPieOptions: any;
  title = 'lumin-sdk-angular';
  subRegionList = ['EU', 'APAC', 'LATAM', 'US', 'EMEA', 'Africa', 'Canada'];
  isExternalFiltersEnabled: any = false;
  spellCheckRequired: boolean = true;
  publishedStoriesRequired: boolean = true;
  sharedWithMeStoriesRequred: boolean = true;
  viewSingleStory: boolean = false;
  ModuleValue: string = 'workspace';
  distValue: any = 'ytd completed month';
  subRegion: any;
  externalFiltersValue: { dimensions: { type: string; data: any; }[]; time: { type: string; data: any; }[]; };

  statCardList = [
    {
      icon: "people",
      title: "New Leads",
      amount: "3,050",
      color: "primary"
    },
    {
      icon: "attach_money",
      title: "This week Sales",
      amount: "$80,500",
      color: "primary"
    },
  ];

  productList = [
    {
      imgUrl: "assets/images/products/headphone-2.jpg",
      name: "earphone",
      price: 100,
      available: 15
    },
    {
      imgUrl: "assets/images/products/headphone-3.jpg",
      name: "earphone",
      price: 1500,
      available: 30
    },
    {
      imgUrl: "assets/images/products/iphone-2.jpg",
      name: "iPhone x",
      price: 1900,
      available: 35
    },
    {
      imgUrl: "assets/images/products/iphone-1.jpg",
      name: "iPhone x",
      price: 100,
      available: 0
    },
    {
      imgUrl: "assets/images/products/headphone-3.jpg",
      name: "Head phone",
      price: 1190,
      available: 5
    }
  ];

  onGoingProjectList = [
    {
      icon: "start_border",
      color: "warn",
      title: "project 1"
    },
    {
      icon: "date_range",
      color: "primary",
      title: "project 2"
    },
    {
      icon: "start_border",
      color: "warn",
      title: "project 3"
    },
    {
      icon: "date_range",
      color: "accent",
      title: "project 4"
    }
  ];

  displayedColumns: string[] = ["name", "price", "available", "action"];

  constructor(private themeService: ThemeService) { }

  ngAfterViewInit() { }
  ngOnInit() {
    this.themeService.onThemeChange.subscribe(activeTheme => {
      this.initDoughNutPieOptions(activeTheme);
      this.initDailyTrafficChartBar(activeTheme);
    });
    this.initDailyTrafficChartBar(this.themeService.activatedTheme);
    this.initDoughNutPieOptions(this.themeService.activatedTheme);
  }
  handleModuleChange(event: any) {
    this.ModuleValue = event.value;
  }

  initDoughNutPieOptions(theme) {
    this.doughNutPieOptions = {
      backgroundColor: "transparent",
      color: [
        "#f44336",
        "#ff9e43",
        "rgba(116, 103, 239, 1)"
      ],
      legend: {
        show: true,
        itemGap: 20,
        icon: "circle",
        bottom: 0,
        textStyle: {
          fontSize: 13,
          fontFamily: "roboto"
        }
      },
      tooltip: {
        show: false,
        trigger: "item",
        formatter: "{a} <br/>{b}: {c} ({d}%)"
      },
      xAxis: [
        {
          axisLine: {
            show: false
          },
          splitLine: {
            show: false
          }
        }
      ],
      yAxis: [
        {
          axisLine: {
            show: false
          },
          splitLine: {
            show: false
          }
        }
      ],

      series: [
        {
          name: "Traffic Rate",
          type: "pie",
          radius: ["45%", "72.55%"],
          center: ["50%", "50%"],
          avoidLabelOverlap: false,
          hoverOffset: 5,
          stillShowZeroSum: false,

          label: {
            normal: {
              show: false,
              position: "center",
              textStyle: {
                fontSize: "13",
                fontWeight: "normal"
              },
              formatter: "{a}"
            },
            emphasis: {
              show: true,
              textStyle: {
                fontSize: "15",
                fontWeight: "normal",
                color: "rgba(116, 103, 239, 1)"
              },
              formatter: "{b} \n{c} ({d}%)"
            }
          },
          labelLine: {
            normal: {
              show: false
            }
          },
          data: [
            {
              value: 65,
              name: "Google"
            },
            {
              value: 20,
              name: "Facebook"
            },
            { value: 15, name: "Others" }
          ],

          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)"
            }
          }
        }
      ]
    };
  }

  initDailyTrafficChartBar(theme) {
    this.dailyTrafficChartBar = {
      grid: {
        top: 16,
        left: 36,
        right: 16,
        bottom: 32
      },
      legend: {},
      tooltip: {
        show: true,
        trigger: "axis",

        axisPointer: {
          type: "cross",
          lineStyle: {
            opacity: 0
          }
        },
        crossStyle: {
          color: "#000"
        }
      },
      series: [
        {
          data: [34, 45, 31, 45, 31, 43, 26, 43, 31, 45, 33, 40],
          type: "line",
          areaStyle: {},
          smooth: true,
          lineStyle: {
            width: 2,
            color: "#fff"
          }
        }
      ],
      xAxis: {
        show: true,
        type: "category",
        showGrid: false,
        boundaryGap: false,
        data: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec"
        ],
        axisLabel: {
          color: "#ccc",
          margin: 20
        },
        axisLine: {
          show: false
        },
        axisTick: {
          show: false
        }
      },
      yAxis: {
        type: "value",
        min: 10,
        max: 60,
        axisLabel: {
          color: "#ccc",
          margin: 20,
          fontSize: 13,
          fontFamily: "roboto"
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: "rgba(255, 255, 255, .1)"
          }
        },

        axisLine: {
          show: false
        },
        axisTick: {
          show: false
        }
      },
      color: [
        {
          type: "linear",
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0,
              color: "rgba(255,255,255,0.3)" // color at 0% position
            },
            {
              offset: 1,
              color: "rgba(255,255,255,0)" // color at 100% position
            }
          ],
          global: false // false by default
        }
      ]
    };
  }

  getProductStatus(value) {
    if (value) {
      if (value < 20) {
        return {
          color: "accent",
          status: `${value} available`
        };
      } else
        return {
          color: "primary",
          status: `in stock`
        };
    } else
      return {
        color: "warn",
        status: `out of stcok`
      };
  }
  externalFilters(event: any) {
    if (event.checked) {
      this.isExternalFiltersEnabled = true;
      this.setExternalFilters();
    } else {
      this.isExternalFiltersEnabled = false;
    }
  }

  handleDistributionChange(event: any) {
    this.distValue = event.value;
    this.setExternalFilters();
  }

  handleRegionChange(event: any) {
    this.subRegion = event.value;
    this.setExternalFilters();
  }

  setExternalFilters() {
    let timeFilter = [];
    timeFilter.push({ type: 'custom', data: this.distValue });
    let dimensionFilter = [];
    dimensionFilter.push({ type: 'market', data: this.subRegion });
    this.externalFiltersValue = {
      dimensions: dimensionFilter,
      time: timeFilter
    }
    // console.log(this.externalFiltersValue);
  }
}
