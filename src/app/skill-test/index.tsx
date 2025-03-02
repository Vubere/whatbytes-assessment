"use client";
import PageContainer from "@/app/_lib/components/PageContainer";
import Image from "next/image";
import HtmlLogo from "@/assets/icons/html.png";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Input from "../_lib/components/Inputs";
import Portal from "../_lib/components/Portal";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  registerables
} from "chart.js";
import annotationPlugin from "chartjs-plugin-annotation";
import { Doughnut, Line } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title
);

ChartJS.register(...registerables, annotationPlugin);

const verticalLinePlugin = {
  id: "verticalLineOnHover",
  afterDatasetsDraw(chart: any) {
    const { ctx, tooltip, chartArea } = chart;
    if (tooltip?.opacity === 0) return;

    const tooltipModel = tooltip.dataPoints?.[0];
    if (!tooltipModel) return;

    const xPos = tooltipModel.element.x;

    ctx.save();
    ctx.beginPath();
    ctx.moveTo(xPos, chartArea.top);
    ctx.lineTo(xPos, chartArea.bottom);
    ctx.lineWidth = 1;
    ctx.strokeStyle = "rgba(4, 4, 4, 0.1)";
    ctx.stroke();
    ctx.restore();
  },
};

const userLinePluginFunc = (userScore: number, scores: number[]) => ({
  id: "userLinePlugin",
  afterDatasetsDraw(chart: any) {
    const { ctx, chartArea, scales } = chart;
    const xAxis = scales.x;
    const yAxis = scales.y;

    // Get pixel position of user"s score
    const userIndex = scores.indexOf(userScore);
    if (userIndex === -1) return;

    const xPos = xAxis.getPixelForValue(userScore);

    ctx.save();

    ctx.beginPath();
    ctx.moveTo(xPos, chartArea.top);
    ctx.lineTo(xPos, chartArea.bottom);
    ctx.lineWidth = 1;
    ctx.strokeStyle = "#00000044";
    ctx.stroke();

    ctx.fillStyle = "#00000044";
    ctx.font = "12px Arial";
    ctx.textAlign = "center";
    ctx.fillText(`your percentile`, xPos, chartArea.top + 100);

    ctx.restore();
  },
});

const external = (context: any) => {
  const tooltipModel = context.tooltip;
  if (!tooltipModel || tooltipModel.opacity === 0) {
    const existingTooltip = document.getElementById("custom-tooltip");
    if (existingTooltip) existingTooltip.style.opacity = "0";
    return;
  }

  const tooltipData = tooltipModel.dataPoints[0];
  const score = tooltipData.label;
  const data = tooltipData.raw;

  let tooltipEl = document.getElementById("custom-tooltip");
  if (!tooltipEl) {
    tooltipEl = document.createElement("div");
    tooltipEl.id = "custom-tooltip";
    tooltipEl.style.position = "absolute";
    tooltipEl.style.background = "#fff";
    tooltipEl.style.color = "black";
    tooltipEl.style.padding = "8px 12px";
    tooltipEl.style.borderRadius = "5px";
    tooltipEl.style.border = "1px solid #0005";
    tooltipEl.style.pointerEvents = "none";
    tooltipEl.style.transition = "opacity 0.2s";
    tooltipEl.style.opacity = "0";
    tooltipEl.style.display = "flex";
    tooltipEl.style.flexDirection = "column";
    tooltipEl.style.gap = "4px";
    document.body.appendChild(tooltipEl);
  }

  tooltipEl.innerHTML = `
          <span style="font-size:12px;line-height:100%;">${score}<span><br/>
          <span style="font-size:12px;line-height:100%;">numberOfStudents : ${data?.y}</span>
        `;

  //make sure tooltip don't go out of the chart

  const chartCanvas = context.chart.canvas;
  const rect = chartCanvas.getBoundingClientRect();
  tooltipEl.style.left = `${rect.left + tooltipModel.caretX}px`;
  tooltipEl.style.top = `${rect.top + tooltipModel.caretY}px`;

  tooltipEl.style.opacity = "1";
}


export default function SkillTest() {
  const [data, setData] = useState<any>({
    rank: 1,
    percentile: 30,
    currentScore: 10,
  });
  const [openUpdateScore, setOpenUpdateScore] = useState(false);

  const higher = data.percentile > 72 ? "higher than " : "";

  const fakeData = useMemo(() => generateData(data), [data]);


  return (
    <PageContainer>
      <h2 className="text-gray-400 text-[16px] mb-[40px]">Skill Test</h2>
      <div className="grid grid-cols-1 lg:grid-cols-[60%_40%] gap-4">

        <section>
          <div className="flex flex-col sm:flex-row mb gap-4 border border-gray-100 p-4 rounded-[6px] mb-8">
            <div className="flex flex-col items-center ">
              <span className="block leading-[100%] uppercase font-extrabold text-[12px] mb-[-6px]">
                html
              </span>
              <div className="relative w-[45px] h-[55px]">
                <Image src={HtmlLogo} alt="html" fill objectFit="cover" />
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <div className="flex flex-col justify-center sm:justify-normal">
                <h3 className="font-bold text-[16px] text-center sm:text-start">Hyper Text Markup Language</h3>
                <p className="text-[14px] text-center sm:text-start">
                  Questions: 08 | Duration: 15 mins | Submitted on 5 June 2021
                </p>
              </div>
              <button className="cursor-pointer bg-blue-400 text-white rounded-[8px] border border-black px-4 py-1" onClick={() => setOpenUpdateScore(true)}>Update</button>
            </div>
          </div>
          <div className="flex flex-col gap-1 border border-gray-100 rounded-[6px] shadow-y-sm p-4 mb-8">
            <h3 className="font-bold text-[16px] mb-0 leading-[100%]">Quick statistics</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3">
              <div className="flex items-center gap-2 sm:mr-[-4px] py-4 border-b-2 sm:border-b-0 border-gray-100">
                <span className="flex rounded-full bg-gray-100 h-[40px] min-h-[40px] w-[40px] min-w-[40px]"></span>
                <div className="flex flex-col gap-1">
                  <span className="font-bold leading-[100%]">{data.rank}</span>
                  <p className="uppercase font-light leading-[100%] text-[14px] ">Your Rank</p>
                </div>
              </div>
              <div className="flex items-center gap-2 border-b-2 sm:border-b-0 sm:border-l-2 border-gray-100 sm:pl-2 py-4">
                <span className="flex rounded-full bg-gray-100 h-[40px] min-h-[40px] w-[40px] min-w-[40px]"></span>
                <div className="flex flex-col gap-1">
                  <span className="font-bold leading-[100%]">{data.percentile}%</span>
                  <p className="uppercase font-light leading-[100%] text-[14px] ">Percentile</p>
                </div>
              </div>
              <div className="flex gap-2 sm:border-l-2 border-gray-100 sm:pl-2 py-4">
                <span className="flex rounded-full bg-gray-100 h-[40px] min-h-[40px] w-[40px] min-w-[40px]"></span>
                <div className="flex flex-col gap-1">
                  <span className="font-bold leading-[100%]">{data.currentScore}&nbsp;/&nbsp;15</span>
                  <p className="uppercase font-light leading-[100%] text-[14px] ">Correct Answers</p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-1 border border-gray-100 p-4 rounded-[6px] mb-8">
            <h3 className="font-bold text-[16px] leading-[100%] mb-4">Comparison Graph</h3>
            <div className="flex flex-col-reverse sm:grid sm:grid-cols-[1fr_100px]">
              <p className="font-[400] text-black tracking-tight text-left">
                <span className="font-[500]">
                  You scored {data.percentile}% percentile
                </span> which is {data.percentile < 72 ? "lower than " : higher}the average percentile 72% of all the engineers who took this assessment
              </p>
              <div className="w-full flex justify-start sm:justify-end">
                <span className="flex rounded-full bg-gray-100 h-[40px] min-h-[40px] w-[40px] min-w-[40px]"></span>
              </div>
            </div>
            <div className="graph w-full h-[200px] sm:h-[250px] md:h-[300px]  min-w-full">
              <Line
                data={{
                  datasets: [{
                    data: fakeData,
                    backgroundColor: "#fff",
                    borderWidth: 1.4,
                    tension: 0.4,
                    pointRadius: 4,
                    pointHoverBackgroundColor: "blue",
                    borderDash: [0, 0]
                  }],
                }}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      display: false,
                    },
                    tooltip: {
                      callbacks: {
                        label: function (context) {
                          return "numberOfStudents : " + context.parsed.y;
                        },
                      },
                      displayColors: false,
                      enabled: false,
                      external
                    },
                    annotation: {
                      annotations: {
                        userLine: {
                          type: "line",
                          xMax: data.percentile,
                          xMin: data.percentile,
                          borderColor: "#00000033",
                          borderWidth: 1,
                          label: {
                            display: true,
                            content: "your percentile",
                            backgroundColor: "transparent",
                            borderColor: "transparent",
                            borderWidth: 0,
                            color: "#00000044",
                            position: "center",
                            textAlign: "center",
                            textStrokeColor: "black",
                            font: {
                              size: 12,
                              family: "Arial",
                              style: "normal",
                              lineHeight: 1.2,
                            },
                          }
                        }
                      }
                    }
                  },
                  scales: {
                    y: {
                      beginAtZero: true,
                      display: false,
                      stacked: true,
                      grid: {
                        display: false,
                      }

                    },
                    x: {
                      type: "linear",
                      ticks: {
                        stepSize: 25,
                      },
                      grid: {
                        display: false,
                      }
                    }
                  }
                }}
                plugins={[verticalLinePlugin]}
              />
            </div>
          </div>
        </section>
        <section>
          <div className="flex flex-col gap-1 border border-gray-100 p-4 sm:p-8 pb-12 rounded-[6px] mb-8">
            <h3 className="font-bold text-[16px] leading-[100%] mb-8">Syllabus Wise Analysis</h3>
            <div className="flex flex-col gap-4">
              <div>
                <h4 className="mb-3">HTML Tools, Forms, History</h4>
                <div className="grid gap-[20px] sm:gap-[50px] grid-cols-[1fr_40px] place-content-center">
                  <div className="w-full h-[10px] my-auto min-h-[10px] bg-blue-200 rounded-full flex justify-start">
                    <div className="h-full bg-blue-400 rounded-full" style={{ width: `${100 * 0.8}%` }} />
                  </div>
                  <span className="text-blue-400">80%</span>
                </div>

              </div>
              <div>
                <h4 className="mb-3">Tags & References in HTML</h4>
                <div className="grid gap-[20px] sm:gap-[50px] grid-cols-[1fr_40px] place-content-center">

                  <div className="w-full h-[10px] my-auto min-h-[10px] bg-orange-200 rounded-full flex justify-start">
                    <div className="h-full bg-orange-400 rounded-full" style={{ width: `${100 * 0.5}%` }} />
                  </div>
                  <span className="text-orange-400">50%</span>

                </div>
              </div>
              <div>
                <h4 className="mb-3">Tables & References in HTML</h4>
                <div className="grid gap-[20px] sm:gap-[50px] grid-cols-[1fr_40px] place-content-center">

                  <div className="w-full h-[10px] my-auto min-h-[10px] bg-red-200 rounded-full flex justify-start">
                    <div className="h-full bg-red-400 rounded-full" style={{ width: `${100 * 0.24}%` }} />
                  </div>
                  <span className="text-red-400">24%</span>

                </div>
              </div>
              <div>
                <h4 className="mb-3">Tables & CSS Basics</h4>
                <div className="grid gap-[20px] sm:gap-[50px] grid-cols-[1fr_40px] place-content-center">

                  <div className="w-full h-[10px] my-auto min-h-[10px] bg-green-200 rounded-full flex justify-start">
                    <div className="h-full bg-green-400 rounded-full" style={{ width: `${100 * 0.96}%` }} />
                  </div>
                  <span className="text-green-400">96%</span>

                </div>
              </div>
            </div>

          </div>
          <div className="flex flex-col gap-1 border border-gray-100 p-4 sm:p-8 pb-12 rounded-[6px] mb-8">
            <div className="flex justify-between mb-3">
              <h3 className="font-bold text-[16px] leading-[100%] ">Question Analysis</h3>
              <span className="text-blue-300">{data.currentScore}/15</span>
            </div>
            <p className="mb-4">
              <span className="font-medium">
                You scored {data.currentScore} questions correct out of 15.
              </span> However it still needs some improvements</p>
            <div className="flex items-center justify-center">

              <div className="w-[120px] !max-w-[120px] h-[120px] !max-h-[120px] relative">
                <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gray-100 w-[40px] h-[40px] min-w-[40px] min-h-[40px]"></span>
                <Doughnut
                  data={{
                    labels: ["Score"],
                    datasets: [{
                      data: [15 - data.currentScore, data.currentScore],
                      backgroundColor: [
                        "#fff0",
                        "#36A2EB",
                      ],
                      borderWidth: 1.4,
                      rotation: 90,
                    }],

                  }}
                  options={{
                    plugins: {
                      tooltip: {
                        enabled: false,
                      },
                      legend: {
                        display: false,
                      }
                    },
                    cutout: "65%"
                  }}
                />
              </div>
            </div>
          </div>
        </section>
      </div>


      <UpdateScoresModal
        isOpen={openUpdateScore}
        close={() => setOpenUpdateScore(false)}
        onSubmit={(data: any) => {
          setData(data);
          setOpenUpdateScore(false);
        }}
        data={data}
      />
    </PageContainer>
  );
}

type UpdateScoresModalProps = {
  isOpen: boolean;
  close: () => void;
  onSubmit: (data: any) => void;
  data: any;
}

const schema = yup.object({
  rank: yup.number().transform((value, originalValue) => (originalValue === "" ? undefined : value)).required("Required | should be number").min(1, "Rank must be higher than 0").nullable(),
  percentile: yup.number().transform((value, originalValue) => (originalValue === "" ? undefined : value)).required("Required | percentile 0-100").min(0, "Required | percentile 0-100").max(100, "Required | percentile 0-100").nullable(),
  currentScore: yup.number().transform((value, originalValue) => (originalValue === "" ? undefined : value)).required("Required | score 0-15").min(0, "Required | score 0-15").max(15, "Required | score 0-15").nullable()
})

const UpdateScoresModal = ({ isOpen, close, onSubmit, data }: UpdateScoresModalProps) => {

  const {
    control,
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange"
  });

  const FORM = [
    {
      name: "rank",
      label: "Rank",
      type: "number",
      placeholder: "Rank",
      defaultValue: data.rank,
      required: true,
    },
    {
      name: "percentile",
      label: "Percentile",
      type: "number",
      placeholder: "Percentile",
      defaultValue: data.percentile,
      required: true,
    },
    {
      name: "currentScore",
      label: "Current Score (out of 15)",
      type: "number",
      placeholder: "Current Score (out of 15)",
      defaultValue: data.currentScore,
      required: true,
    },
  ]

  return (
    <Portal open={isOpen}>
      <div className="fixed top-0 left-0 w-screen h-screen inset-0 z-[106] flex items-center justify-center overflow-auto bg-black/50 ">
        <div className="relative w-[500px] max-w-[90%] bg-white rounded-[8px] p-4">
          <div className="flex justify-between mb-4">
            <h4 className="font-extrabold text-[16px]">Update Scores</h4>
            <div className="flex flex-col items-center ">
              <span className="block leading-[100%] uppercase font-extrabold text-[8px] mb-[-3px]">
                html
              </span>
              <div className="relative w-[25px] h-[30px]">
                <Image src={HtmlLogo} alt="html" fill objectFit="cover" />
              </div>
            </div>
          </div>
          <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
            {FORM.map((input, index) => (
              <div key={input.name} className="flex flex-col sm:flex-row sm:items-center gap-2">
                <span className="flex items-center justify-center bg-blue-400 text-white rounded-full h-[20px] text-[12px] w-[20px]">{index + 1}</span>
                <label htmlFor={input.name}> Update your {input.label}</label>
                <div className="ml-auto">
                  <Input
                    key={input.name}
                    control={control}
                    name={input.name}
                    className="w-[100px] !max-w-[100px] block border-blue-200"
                    type={input.type}
                    required={input.required}
                    defaultValue={input.defaultValue}
                    placeholder={input.placeholder}
                  />
                </div>
              </div>
            ))}
            <div className="flex gap-4 justify-end">
              <button type="button" className="cursor-pointer bg-white border border-blue-400 text-blue-400 rounded-[8px]  px-4 py-1" onClick={close}>Cancel</button>
              <button type="submit" className="cursor-pointer bg-blue-400 text-white rounded-[8px] border border-black px-4 py-1">Save</button>
            </div>
          </form>
        </div>
      </div>
    </Portal>
  )
}

const generateData = (userData: any) => {
  const dummy = [
    { x: 0, y: 1 },
    { x: 10, y: 2 },
    { x: 20, y: 3 },
    { x: 30, y: 10 },
    { x: 30, y: 6 },
    { x: 30, y: 2 },
    { x: 30, y: 10 },
    { x: 40, y: 18 },
    { x: 45, y: 20 },
    { x: 50, y: 28 },
    { x: 56, y: 24 },
    { x: 60, y: 11 },
    { x: 70, y: 3 },
    { x: 85, y: 2 },
    { x: 90, y: 4 },
    { x: 100, y: 1 },
  ]

  for (let i = 0; i < dummy.length; i++) {
    let bool = userData.percentile === dummy[i].x;
    if (bool) {
      dummy[i].y++;
      break;
    }
    if (userData.percentile > dummy[i].x && i + 1 != dummy.length && userData.percentile < dummy[i + 1].x) {
      // fix userData inbetween the two indexes
      dummy.splice(i + 1, 0, { x: userData.percentile, y: 1 });
      break;
    }
    if (i + 1 == dummy.length) {
      dummy.push({ x: userData.percentile, y: 1 });
      break;
    }
  }
  return dummy;
}
