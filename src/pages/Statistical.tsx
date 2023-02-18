import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Chart as ChartJS,
  defaults,
  ArcElement,
  Tooltip,
  Legend,
  PluginChartOptions,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { Layout } from "antd";
import PageHeader from "components/PageHeader";
import { DatePicker, Space } from "antd";
import dayjs from "dayjs";
import { statiscalPost } from "services/post";
const { RangePicker } = DatePicker;
ChartJS.register(ArcElement, Tooltip);
const generateRandomColor = () =>
  Math.floor(Math.random() * 16777215).toString(16);

function getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

interface IStatisticalPost {
  y: string;
  mo: string;
  d: string;
  item_count: string;
}

const Statistical = () => {
  // 1656561508 * 1000
  const [listData, setListData] = useState<Array<IStatisticalPost>>([]);
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(() => {
    var tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow;
    // return new Date(1676561508 * 1000);
  });
  const chartRef = useRef<any>();

  const plugins = useMemo(
    () => [
      {
        beforeDraw: function (chart: any) {
          var width = chart.width,
            height = chart.height,
            ctx = chart.ctx;
          ctx.restore();
          var fontSize = (height / 200).toFixed(2);
          ctx.font = fontSize + "em sans-serif";
          ctx.textBaseline = "top";
          var text = "Total post",
            textX = Math.round((width - ctx.measureText(text).width) / 2),
            textY = height / 2.3;
          ctx.fillText(text, textX, textY);
          ctx.save();

          var text2 = chart.config._config.options.listData.length,
            textX2 = Math.round((width - ctx.measureText(text2).width) / 2),
            textY2 = height / 2 + 30;
          ctx.fillText(text2, textX2, textY2);
          ctx.save();
        },
      },
    ],
    [listData]
  );

  useEffect(() => {
    const handleGetData = async () => {
      if (startDate && endDate) {
        try {
          const [{ data }, err] = await statiscalPost({
            startDate,
            endDate,
          });
          if (err) {
            setListData([]);
            return;
          }
          setListData(data);
        } catch (e) {
          setListData([]);
        }
      }
    };
    handleGetData();
  }, [startDate, endDate]);

  return (
    <Layout>
      <PageHeader>Statistical</PageHeader>
      <Layout
        style={{
          display: "flex",
          justifyContent: "flex-end",
          flexDirection: "row",
        }}
      >
        <div
          style={{
            width: "300px",
          }}
        >
          <RangePicker
            value={[dayjs(startDate), dayjs(endDate)]}
            onChange={(values) => {
              console.log(values);
              if (values) {
                setStartDate(values[0]?.toDate()!);
                setEndDate(values[1]?.toDate()!);
              } else {
              }
            }}
          />
        </div>
      </Layout>
      <Layout
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        {listData.length > 0 ? (
          <Doughnut
            data={{
              labels: listData.map(
                (v) => `${v.d}/${v.mo.padStart(2, "0")}/${v.y}`
              ),
              datasets: [
                {
                  label: "New post this day",
                  data: listData.map((v) => v.item_count),
                  backgroundColor: new Array(6)
                    .fill(0)
                    .map(
                      () =>
                        `rgb(${getRandomInt(0, 255)},${getRandomInt(
                          0,
                          255
                        )},${getRandomInt(0, 255)})`
                    ),
                  borderWidth: 1,
                },
              ],
            }}
            plugins={plugins as any}
            options={
              {
                legend: {
                  display: true,
                },
                listData: listData,
              } as any
            }
            ref={chartRef}
          />
        ) : (
          <p
            style={{
              fontSize: "20px",
            }}
          >
            No data
          </p>
        )}
      </Layout>
    </Layout>
  );
};

export default Statistical;
