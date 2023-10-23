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
import _ from "lodash";
import { Button } from "@/components/ui/button";
import { BsSearchHeartFill } from "react-icons/bs";

const inter = Inter({ subsets: ["latin"] });
interface dataType {
  course_name: string;
}
export default function Home() {
  const [input, setInput] = useState("");
  const FindMatch = (input: string, data: dataType[]): dataType[] => {
    const re = new RegExp(_.escapeRegExp(input), "i");

    const isMatch = (result: dataType) => re.test(result.course_name);
    const res = _.filter(data, isMatch);

    if (res.length > 0) {
      return res;
    } else {
      return data;
    }
  };

  if (data) {
    return (
      <div>
        <div className="flex flex-row p-2 m-2">
          <Input
            placeholder="search courses .... "
            value={input}
            className="outline-none"
            onChange={(e) => {
              setInput(e.target.value);
            }}
          ></Input>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4">
          {FindMatch(input, data).map((res, id) => {
            return (
              <div className="p-2 " key={id}>
                <Card className="">
                  <CardHeader>
                    <CardTitle>{res.course_name}</CardTitle>
                    <CardDescription>
                      {`${res.difficulty} | ${res.platform}`}
                    </CardDescription>
                  </CardHeader>

                  <CardFooter className="flex flex-row justify-between">
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
