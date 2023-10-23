import React from "react";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { data } from "@/courses";
import { Button } from "@/components/ui/button";
interface CardsProps {
  input: string;
}
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

const Cards: React.FC<CardsProps> = (props) => {
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

  return (
    <div>
      {" "}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4">
        {FindMatch(props.input, data).map((res, id) => {
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
};

export default Cards;
