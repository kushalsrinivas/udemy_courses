import { Inter } from "next/font/google";
import { useEffect, useState } from "react";
import { data } from "@/courses";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/button";

import { ModeToggle } from "@/components/toogle-button";
interface dataType {
  course_name: string;
  id: number;
  platform: string;
  free_course: string;

  link: string;
  difficulty: string;
  module_number: number;
  certification: string;
}

export default function Home() {
  const [input, setInput] = useState("");

  const FindMatch = (input: string, data: dataType[]): dataType[] => {
    const re = new RegExp(escapeRegExp(input), "i");

    const isMatch = (result: dataType) => re.test(result.course_name);
    const res = data.filter(isMatch);

    if (res.length > 0) {
      return res;
    } else {
      return data;
    }
  };

  function escapeRegExp(string: string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }

  if (data) {
    return (
      <div>
        <div className="flex flex-row p-2 m-2 gap-2">
          <Input
            placeholder="search courses .... "
            value={input}
            className="outline-none"
            onChange={(e) => {
              setInput(e.target.value);
            }}
          ></Input>
          <ModeToggle></ModeToggle>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4">
          {FindMatch(input, data).map((res, id) => {
            return (
              <div className="p-2 " key={id}>
                <Card>
                  <CardHeader>
                    <CardTitle>{res.course_name}</CardTitle>
                    <CardDescription>
                      {`${res.difficulty} | ${res.platform}`}
                    </CardDescription>
                  </CardHeader>

                  <CardFooter
                    className={`flex flex-row justify-between ${
                      res.certification === "paid"
                        ? "text-red-300"
                        : "text-green-300"
                    }`}
                  >
                    <p>{res.certification}</p>
                    <Button>
                      <a href={res.link}>open</a>
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
  return <div>hehehe</div>;
}
