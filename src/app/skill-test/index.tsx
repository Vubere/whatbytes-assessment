"use client";
import PageContainer from "@/app/_lib/components/PageContainer";
import Image from "next/image";
import HtmlLogo from "@/assets/icons/html.png";
import { ChangeEvent, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Input from "../_lib/components/Inputs";
import Portal from "../_lib/components/Portal";

export default function SkillTest() {
  const [data, setData] = useState<any>({
    rank: 0,
    percentile: 0,
    currentScore: 0,
  });
  const [openUpdateScore, setOpenUpdateScore] = useState(false);

  return (
    <PageContainer>
      <h2 className="text-gray-400 text-[16px] mb-[40px]">Skill Test</h2>
      <section>
        <div className="flex gap-4">
          <div className="flex flex-col items-center ">
            <span className="block leading-[100%] uppercase font-extrabold text-[12px] mb-[-6px]">
              html
            </span>
            <div className="relative w-[45px] h-[55px]">
              <Image src={HtmlLogo} alt="html" fill objectFit="cover" />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex flex-col">
              <h3 className="font-bold text-[16px]">Hyper Text Markup Language</h3>
              <p className="text-[14px">
                Questions: 08 | Duration: 15 mins | Submitted on 5 June 2021
              </p>
            </div>
            <button className="bg-blue-400 text-white rounded-[8px] border border-black px-4 py-1" onClick={() => setOpenUpdateScore(true)}>Update</button>
          </div>
        </div>
        <div>
          <h3>Quick statistics</h3>
          <div>
            <div>
              <span className="icon"></span>
              <span>{data.rank}</span>
              <p>Your Rank</p>
            </div>
            <div>
              <span className="icon"></span>
              <span>{data.percentile}</span>
              <p>Percentile</p>
            </div>
            <div>
              <span className="icon"></span>
              <span>{data.currentScore}/15</span>
              <p>Correct Answers</p>
            </div>
          </div>
        </div>
        <div>
          <h3>Comparison Graph</h3>
          <div>
            <p>You scored {data.percentile}% percentile which is {data.percentile < 72 ? "lower than " : (
              data.percentile > 72 ? "higher than " : ""
            )}the average percentile 72% of all the engineers who took this assessment</p>
            <span className="icon"></span>
          </div>
          <div className="graph"></div>
        </div>
      </section>
      <section>
        <div>
          <h3>Syllabus Wise Analysis</h3>
          <div>
            <h4>HTML Tools, Forms, History</h4>
            <div>

              <div className="w-[140px] max-w-[80%] h-[10px] min-h-[10px] bg-blue-200 rounded-full flex justify-start">
                <div className="h-full bg-blue-400 rounded-full" style={{ width: `${100 * 0.8}%` }} />
              </div>
              <span>80%</span>
            </div>

          </div>
          <div>
            <h4>Tags & References in HTML</h4>
            <div>

              <div className="w-[140px] max-w-[80%] h-[10px] min-h-[10px] bg-orange-200 rounded-full flex justify-start">
                <div className="h-full bg-orange-400 rounded-full" style={{ width: `${100 * 0.5}%` }} />
              </div>
              <span>50%</span>

            </div>
          </div>
          <div>
            <h4>Tables & References in HTML</h4>
            <div>

              <div className="w-[140px] max-w-[80%] h-[10px] min-h-[10px] bg-red-200 rounded-full flex justify-start">
                <div className="h-full bg-red-400 rounded-full" style={{ width: `${100 * 0.24}%` }} />
              </div>
              <span>24%</span>

            </div>
          </div>
          <div>
            <h4>Tables & CSS Basics</h4>
            <div>

              <div className="w-[140px] max-w-[80%] h-[10px] min-h-[10px] bg-green-200 rounded-full flex justify-start">
                <div className="h-full bg-green-400 rounded-full" style={{ width: `${100 * 0.96}%` }} />
              </div>
              <span>96%</span>

            </div>
          </div>
        </div>
        <div>
          <div>
            <h3>Question Analysis</h3>
            <span>{data.currentScore}/15</span>
          </div>
          <div>You scored {data.currentScore} questions correct out of 15. However it still needs some improvements</div>
          <div className="pie_chart">

          </div>
        </div>
      </section>
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

type Inputs = {
  rank: number | string | null;
  percentile: number | string | null;
  currentScore: number | string | null;
}

const schema = yup.object({
  rank: yup.number().transform((value, originalValue) => (originalValue === "" ? 0 : value)).required("Rank is a required field").min(1, "Rank must be higher than 0").nullable(),
  percentile: yup.number().transform((value, originalValue) => (originalValue === "" ? -1 : value)).required("Percentile is a required field").min(0, "Percentile must be between 0 - 100").max(100, "Percentile must be between 0 - 100").nullable(),
  currentScore: yup.number().transform((value, originalValue) => (originalValue === "" ? -1 : value)).required("Current Score is a required field").min(0, "Current Score must be between 0 - 15").max(15, "Current Score must be between 0 - 15").nullable()
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
      <div className="fixed top-0 left-0 w-screen h-screen inset-0 z-50 flex items-center justify-center overflow-auto bg-black/50 ">
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
              <div key={input.name}>
                <span className="block">{index + 1}</span>
                <label htmlFor={input.name}> Update your {input.label}</label>
                <Input
                  key={input.name}
                  control={control}
                  name={input.name}
                  type={input.type}
                  required={input.required}
                  defaultValue={input.defaultValue}
                  placeholder={input.placeholder}
                />
              </div>
            ))}
            <div className="flex gap-4 justify-end">
              <button type="button" className="bg-white border border-blue-400 text-blue-400 rounded-[8px]  px-4 py-1" onClick={close}>Cancel</button>
              <button type="submit" className="bg-blue-400 text-white rounded-[8px] border border-black px-4 py-1">Update</button>
            </div>
          </form>
        </div>
      </div>
    </Portal>
  )
}
