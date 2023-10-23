import { Inter } from "next/font/google";
import { useEffect, useState } from "react";
import { data } from "@/courses";

import { Input } from "@/components/ui/input";
import Cards from "@/components/cards";
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
        <Cards input={input}></Cards>
      </div>
    );
  }
  return <div>hehehe</div>;
}
